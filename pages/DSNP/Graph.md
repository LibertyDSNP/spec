# Graph

This specification describes the social network graph and how it is represented in the protocol.

In this context a [social graph](https://en.wikipedia.org/wiki/Social_graph) means a graph that represents social relationships between entities.

## Nodes

Users are represented in the DSNP graph by nodes uniquely identified by their [DSNP User Ids](Identifiers.md#dsnp-user-id).
Relationships between users are the graph edges.

## Edges

Graph edges that originate from a user are stored as DSNP [User Data](UserData.md) associated with a given user.
DSNP user data structures capture three distinct sets of relationships, as described below.

### Public Follows

Each [public follow](UserData.md#public-follows) records a unidirectional relationship where one user (the controller of the graph) is interested in following the public speech of another user.
When follows are public, they are visible to any other user or system, including the user being followed.

### Private Follows

A [private follow](UserData.md#private-follows)  records an interest in following the public speech of another user, but the data is stored in encrypted form.
The relationship is not visible to the followed user or any other user that does not have the decryption key.

### Private Connections

[Private connections](UserData.md#private-connections) represent one half of a bidirectional relationship between two DSNP Users.
Private connections are stored on both sides of the bidirectional relationship between two DSNP Users.
Each user can then update the status of the relationship without loss of privacy.
Each DSNP user maintains and controls two sets of data:
1. An encrypted data set that records which users are recognized as connections.
2. A public data set that is used to signal connection status via Pseudonymous Relationship Identifiers.

### Pseudonymous Relationship Identifiers

Private connections are complemented by publishing [private connection Pseudonymous Relationship Identifiers](UserData.md#private-connection-prids) (PRIds), which provide a means of making the connection relationship visible to the other user while maintaining privacy with respect to any third parties.
Applications are encouraged to verify connection relationships by checking to see that they are reciprocated, with the appropriate identifier present in both users' data.

For each pair of users Alice and Bob, and a specified PRId [context](#contexts), a pair of PRIds can be generated from Alice and Bob's shared secret, with one representing a simplex channel from Alice to Bob, and the other representing the corresponding simplex channel from Bob to Alice.

PRIds have the following properties:
* If Alice has generated a PRId from Alice to Bob, only Bob can generate the same PRId. This allows Bob to check if he is listed in Alice's published connections.
* Bob can prove to a third party that a given PRId in Alice's published connections is his, without allowing the third party to discover Alice or Bob's relationships with any other user.

A detailed discussion of the cryptography for PRIds can be found in the [PRId object definition](Types/PRId.md).
