# Graph

This specification describes the social network graph and how it is represented in the protocol.

In this context a [social graph](https://en.wikipedia.org/wiki/Social_graph) means a graph that represents social relationships between entities.

## Nodes

Users are represented in the DSNP graph by nodes uniquely identified by their [DSNP User Ids](Identifiers.md#dsnp-user-id).
Relationships between users are the graph edges.

## Edges

Graph edges that originate from a user are stored as DSNP [User Data](UserData.md) associated with a given user.

Each graph edge consists of the following data:
* DSNP User Id (64-bit unsigned integer)
  * To allow for optimal compression, User Ids are stored using the `long` type in Avro schema, which is a 64-bit _signed_ integer.
    Care should be taken to ensure that User Id values greater than or equal to 2<sup>63</sup>, where used by an implementation, are converted correctly between signed and unsigned representations.
* Timestamp when relationship was created, in seconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time))

GraphEdge objects MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp.userdata",
    "name": "GraphEdge",
    "type": "record",
    "doc": "A relationship to another DSNP user",
    "fields": [
        {
            "name": "userId",
            "type": "long",
            "doc": "DSNP User Id of object of relationship"
        },
        {
            "name": "since",
            "type": "long",
            "doc": "Timestamp in Unix epoch seconds when this relationship was originally established"
        }
    ]
}
```

## User Data Sets

DSNP user data structures capture three distinct sets of relationships, as described below.

### Public Follows

Each public follow records a unidirectional relationship where one user (the controller of the graph) is interested in following the public speech of another user.
When follows are public, they are visible to any other user or system, including the user being followed.

The `publicFollows` user data type is composed of a set of GraphEdge objects, which is then compressed.

### Private Follows

A private follow also records an interest in following the public speech of another user, but the data is stored in encrypted form, meaning the relationship is not visible to the followed user, or any other user, without access to the decryption key.

The `privateFollows` user data type is composed of a set of GraphEdge objects, which is then compressed and encrypted.

### Private Connections

Private connections represent one half of a bidirectional relationship between two DSNP Users.
An encrypted data set controlled by a DSNP user records which users they recognize as connections.
A second, public, data set enables users to signal their connection to one another via Pseudonymous Relationship Identifiers.

The `privateConnections` user data type is composed of a set of GraphEdge objects, which is then compressed and encrypted.
The `privateConnectionPRIds` user data type is composed of a set of PRId objects as defined below, without compression or encryption.

### Pseudonymous Relationship Identifiers

Private connections are complemented by publishing private connection Pseudonymous Relationship Identifiers (PRIds), which provide a means of making the connection relationship visible to the other user while maintaining privacy with respect to any third parties.
Applications are encouraged to verify connection relationships by checking to see that they are reciprocated, with the appropriate identifier present in both users' data.

Serialized PRId objects MUST comply with the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp.userdata",
    "name": "PRId",
    "type": "fixed",
    "size": 8,
    "doc": "Pseudonymous Relationship Identifier"
}
```

More generally, a PRId is a means of allowing for private interactions between two DSNP users in a specific context, based on cryptographic primitives that enable two users to independently generate a shared secret.
For each pair of users Alice and Bob, and a specified PRId [context](#contexts), a pair of PRIds can be generated from Alice and Bob's shared secret, with one representing a simplex channel from Alice to Bob, and the other representing the corresponding simplex channel from Bob to Alice.

PRIds have the following properties:
* If Alice has generated a PRId from Alice to Bob, only Bob can generate the same PRId. This allows Bob to check if he is listed in Alice's published connections.
* Bob can prove to a third party that a given PRId in Alice's published connections is his, without allowing the third party to discover Alice or Bob's relationships with any other user.

#### Contexts

The following context values are currently defined for PRIds. All other values are reserved for future use.

| Context Id | Description | Context string |
| --- | --- | --- |
| 0 | Connection | `PRIdCtx0` |

The following section describes how these values are used in the PRId generation process.

#### Algorithm

In the following section, the Alice to Bob identifier for context C is called PRId<sub>A→B,C</sub>, and the corresponding Bob to Alice identifier is called PRId<sub>B→A,C</sub>.

A PRId is derived from Alice and Bob's `keyAgreement` key pairs, using a key exchange protocol as follows. To illustrate the cryptographic operations required, the relevant functions from [libsodium](https://libsodium.org) are noted. Sodium is a stable, fast, free, and cross-platform cryptography library, and supports all encryption algorithms used in the DSNP specification out of the box.

1. Both Alice and Bob generate an asymmetric key pair, and each publishes a Public Key Announcement with their generated X25519 public key and a `keyType` value of `keyAgreement`.
1. When Alice wants to interact with Bob, she looks up Bob's public key and performs an X25519 key exchange operation using her private key and Bob's public key, generating a shared secret `k` as in the libsodium function <code>crypto_box_beforenm(k, Bob<sub>public</sub>, Alice<sub>private</sub>)</code>.
1. Alice derives a context-specific subkey <code>k<sub>Bob</sub></code> from the shared secret `k` as the master key, using the Blake2b hash function as in the libsodium function `crypto_kdf_derive_from_key`, using Bob's DSNP User Id as the 64-bit key identifier and the ASCII encoding of the [PRId Context](#contexts) string (`"PRIdCtx0"` for connections) as the 8-byte human-readable identifier.
1. Alice uses Bob's DSNP User Id to form a 8-byte message.
1. Alice encrypts the message using the PRId key <code>k<sub>Bob</sub></code> and a nonce of her own User Id (padded with zero bytes), as in the libsodium function `crypto_secretbox_easy`.
1. Alice removes the message authentication code (MAC), leaving the 8-byte value <code>PRId<sub>A→B,C</sub></code>.
  (Because Alice will publish the PRId, it can be authenticated without a MAC.)
1. Alice adds the generated PRId to her set of `privateConnectionPRIds` and publishes an updated copy via the [Replace User Data](UserData.md#replace-user-data-operation) Operation.

Similarly, Bob can calculate the same shared secret `k` using <code>Alice<sub>public</sub></code> and <code>Bob<sub>private</sub></code>, derive the PRId subkey for his own DSNP User Id, and then calculate the Alice-to-Bob PRId in order to check if it is in Alice's published PRIds.
Bob can also derive the PRId subkey for Alice's DSNP User Id and encrypt Alice's User Id, using his own as the nonce, to generate the Bob-to-Alice PRId, and then publish it to his own list, if desired.

If Alice or Bob wants to prove to a third party that their PRIds are in each other's `privateConnectionPRIds` list, they can provide the third party with their own subkey <code>k<sub>Alice</sub></code> or <code>k<sub>Bob</sub></code>. The third party can repeat the encryption step using Alice and Bob's User Ids, and check that the output is present in the published set of PRIds. The shared secret `k` (used as a master key in this algorithm) should _not_ be divulged.

In more formal terms:
* <code>PRId<sub>A→B,C</sub></code> = <code>XSalsa20(HKDF(SharedSecret<sub>AB</sub>, _DSNP User Id of B_, "PRIdCtx<i>C</i>"), _DSNP User Id of B_, _DSNP User Id of A_)</code>
* <code>PRId<sub>B→A,C</sub></code> = <code>XSalsa20(HKDF(SharedSecret<sub>AB</sub>),_DSNP User Id of A_, "PRIdCtx<i>C</i>"), _DSNP User Id of A_, _DSNP User Id of B_)</code>
