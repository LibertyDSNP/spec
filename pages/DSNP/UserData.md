# User Data

DSNP stores user-related data of well defined formats associated with a user's DSNP Identifier.
DSNP User Data is designed for data with the following characteristics:
* The data is intended to be accessible across the network with the strongest possible durability guarantees
* The data may change frequently.
* The data does not need to be widely announced and instead can be read just-in-time for a particular user.

Data may be public or stored in encrypted form.
The [Avro](https://avro.apache.org) schema specification is used to define the binary representation of relevant data types.

## User Data Types

DSNP implementations MUST support the following User Data Types:

| System Name | Version | Encryption Algorithm | Compression Codec | Avro Object Type |
| --- | --- | --- | --- | --- |
| <a name="public-follows">`publicFollows`</a> | 1.2 | NONE | <a href="https://en.wikipedia.org/wiki/Deflate" title="" target="_blank">`DEFLATE`</a> | [GraphEdge](Types/GraphEdge.md) |
| <a name="private-follows">`privateFollows`</a> | 1.2 | `curve25519xsalsa20poly1305` | <a href="https://en.wikipedia.org/wiki/Deflate" title="" target="_blank">`DEFLATE`</a> | [GraphEdge](Types/GraphEdge.md) |
| <a name="private-connections">`privateConnections`</a> | 1.2 | `curve25519xsalsa20poly1305` | <a href="https://en.wikipedia.org/wiki/Deflate" title="" target="_blank">`DEFLATE`</a> | [GraphEdge](Types/GraphEdge.md) |
| <a name="private-connection-prids">`privateConnectionPRIds`</a> | 1.2 | NONE | NONE | [PRId](Types/PRId.md) |
| <a name="key-agreement-public-keys">`keyAgreementPublicKeys`</a> | 1.3 | NONE | NONE | [PublicKey](Types/PublicKeyUserData.md) |
| <a name="assertion-method-public-keys">`assertionMethodPublicKeys`</a> | 1.3 | NONE | NONE | [PublicKey](Types/PublicKeyUserData.md) |
| <a name="profile-resources">`profileResources`</a> | 1.3 | NONE | NONE | [ProfileResource](Types/ProfileResource.md) |

Data for each data type is initially formatted as a stream of Avro objects that should conform to the schema specified.
A DSNP system MAY limit the number of objects allowed for a given user data type; if so, this MUST be documented.
Avro file- and block-level information (including in-stream schema) is omitted.
The Avro stream is then compressed and/or encrypted as specified.

`curve25519xsalsa20poly1305` (that is, X25519 key exchange, XSalsa20 encryption, and Poly1305 message authentication) is the default authenticated encryption algorithm used in the [NaCl](https://nacl.cr.yp.to) ("Salt") library, and its successor [libsodium](https://libsodium.org).
In the specification of cryptographic operations below, relevant methods from these libraries are noted. While these specific libraries are not required for DSNP compatibility, they are highly recommended.

## Data Chunks

Because consensus systems often have specific limits to the amount of data that can be included in a given transaction, operations on user data deal with the data in discrete chunks.
As implementation strategies may vary, implementations MUST define their own maximum chunk size in bytes to be used in the operations described below.

## Entity Tags

To allow for application-layer caching and prevent race conditions between different applications attempting to update the same data, an implementation MUST provide a non-empty `etag` (entity tag) value with each chunk fetched, and update this for each chunk replaced.

An `etag` is any ASCII-encoded string with a minimum length of one byte and a maximum length of 255 bytes.

An implementation MUST fail the Replace User Data Operation if the `etag` values supplied do not match the current `etag` values for all chunks of the specified data type.

## Replace User Data Operation

The Replace User Data Operation takes the following parameters:

* A DSNP User Id
  * Implementations MUST ensure that the principal invoking this Operation is this user, or a transparent chain of delegation from the user to the principal exists.
* The index of the `keyAgreementPublicKeys` key pair used to encrypt any private data in the operation.
  (If only unencrypted user data types are included, the key index may be omitted.)
* A map containing the set of data types to update as the keys, and tuples consisting of (1) the schema version used to encode the data type, and (2) a list where each element includes a data chunk and its associated entity tag, as the values.

If the Operation is successful, any previous data associated with the user for each data type included in the input MUST be removed and replaced by the new data.

Data chunks should be generated for each included data type using the following sequence of operations:
1. Serialize the data records, in Avro binary format, according to the versioned schema.
1. Divide the data records into one or more chunks, with each chunk containing a maximum byte count specified by the implementation.
* Note that the combined chunks constitute a different, and smaller, binary than a complete Avro file, as they exclude the header information, schema, and any block-level metadata.
  Each chunk should start and end with a complete Avro object; in other words, chunk boundaries MUST NOT occur mid-record.
    Applications SHOULD try to include as many records as possible within the byte length limit, but because compression and encryption may alter the byte size versus the raw Avro binary records, they may wish to use a heuristic approach that sometimes produces non-optimal chunks.
3. For each chunk generated, the application should then:
    1. If the data type requires compression, apply the compression codec noted.
    1. If the data type requires encryption,
        1. Retrieve the user's active `keyAgreementPublicKey` key, U<sub>public</sub>, and note its index.
  If no key exists, one should be created and published as User Data before invoking the Operation.
  By convention, the key with the highest index (the last object in the Avro stream) is the active key.
        1. Create a sealed box (a payload encrypted with a symmetric key derived from an ephemeral key pair, and accompanied by the ephemeral public key), as in the [libsodium](https://doc.libsodium.org/public-key_cryptography/sealed_boxes) function `crypto_box_seal`, using U<sub>public</sub>.
        1. Include the previous `etag` value for the chunk. If the chunk is new, `etag` should be set to `null`.
  If any chunks are to be deleted, they should be included in the input identified with the existing `etag` and a `null` value for the data.

If the Operation is invoked successfully the implementation MUST synchronously return a new set of `etag` values for each data type replaced, corresponding to the updated state of the data (with new chunks added and deleted chunks removed).
Applications should not interpret this response as an indication that the operation was completed and a state change record emitted, as this typically occurs asynchronously.
However, this strategy allows applications to make the optimistic assumption that, in due course, the DSNP system will reflect the intended changes, without needing to wait for asynchronous confirmation.

If, on the other hand, an invocation of Replace User Data is rejected due to entity tag discrepancies, this indicates that the relevant data on the network has changed since the entity tags were acquired by the application, and the application should fetch the most current version with the [Get User Data Operation](#get-user-data-operation), reapply any intended changes, and retry the operation.

The Replace User Data Operation MUST generate a [User Data Replaced Record](Records.md#user-data-replaced) containing the DSNP User Id and the set of updated User Data Types (but not the data itself).
If the implementation detects that no change has occurred, it SHOULD omit the relevant unchanged data types from the state change record.

### Examples

_The following section is non-normative._
_The JSON schema and encoding used is provided for illustration only and implementations are free to define their own encoding._

The following example illustrates the input to the Replace User Data Operation corresponding to the following scenario (utilizing [social graph](Graph.md) data types):
* The user's previously stored data consists of one chunk for public follows, two chunks for private connections, and one chunk for private connection declarations.
* The user adds several follows to their public list, causing it to exceed the maximum capacity for a single chunk and require a new chunk.
* The user adds a relationship to their private connections, but it still fits in two chunks.
The private connection's PRId is added to the private connection PRId list, but it remains a single chunk.

```
{
  "publicFollows": {
    "version": "1.2",
    "chunks": [
      {
        "etag": string                             // unchanged chunk
      },
      {
        "data": base64(compress(chunk2)),
        "etag": null,                              // new chunk
      }
    ]
  },
  "privateFollows": {
    "version": "1.2",
    "chunks": [
      {
        "etag": string                             // unchanged chunk
      },
      {
        "data": base64(encrypt(compress(chunk2))), // updated chunk
        "etag": string
      }
    ]
  },
  "privateConnectionPRIds": {
    "version": "1.2",
    "chunks": [
      {
        "data": base64(compress(chunk1)),
        "etag": string
      }
    ]
  }
}
```

Deletion of records may cause situations where the number of chunks decreases.
To ensure that the deleted chunk was up to date, the deleted chunk should still be included in the array with the relevant entity tag value, using an explicit `null` value for the data field to indicate deletion, as in the following snippet:

```
  "publicFollows": {
    "version": "1.2",
    "chunks": [
      {
        "etag": string                     // unchanged chunk
      },
      {
        "data": null,                      // deleted chunk
        "etag": string,
      }
    ]
  }
```

## Get User Data Operation

The Get User Data Operation takes the following parameters:
* The DSNP User Id of the user who controls the data
  * Note: While _writing_ user data is reserved for the user and any delegates, anyone on the network can read any user's data (though it may be encrypted).
* The User Data Types (by system name) that should be retrieved.

The operation returns a mapping of User Data Type to data chunks, with each data chunk annotated with an entity tag and (optionally) a key index. (Note that this is the same general structure as the input data for [Replace User Data](#replace-user-data-operation), for each requested data type.
If no chunks for a requested data type exist, an implementation MAY omit that data type from the response.

To transform the data from the output to Avro binary records, a consumer should apply the following algorithm to each data type included:
1. Determine the relevant encryption algorithm, compression codec, and object schema from the User Data Type and version noted.
1. For each chunk,
    1. If encryption is indicated, decrypt the chunk data using the user's secret key (identified using the key index) as in the [libsodium](https://doc.libsodium.org/public-key_cryptography/sealed_boxes) function `crypto_box_seal_open`.
    1. If compression is required, uncompress the chunk data using the specified codec.
    1. Deserialize the uncompressed data to logical records according to the Avro object schema.
    1. Retain the chunk's `etag` value if needed for any updates.

### Examples

_The following section is non-normative._
_The JSON schema and encoding used is provided for illustration only and implementations are free to define their own encoding._

The following example illustrates the output of a Get User Data Operation invocation requesting data for `publicFollows`, `privateConnections`, and `privateConnectionPRIds`:

```
{
  "publicFollows": {
    "version": "1.2",
    "chunks": [
      {
        "data": base64_string,
        "etag": string
      },
      {
        "data": base64_string,
        "etag": string
      }
    ]
  },
  "privateConnections": {
    "version": "1.2",
    "chunks": [
      {
        "data": base64_string,
        "etag": string,
        "keyId": integer
      },
      {
        "data": base64_string,
        "etag": string,
        "keyId": integer
      }
    ]
  },
  "privateConnectionPRIds": {
    "version": "1.2",
    "chunks": [
      {
        "data": base64_string,
        "etag": string
      }
    ]
  }
}
```
