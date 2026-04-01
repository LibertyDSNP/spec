# Social Networking Specification

The Social Networking specification is a subspecification of
[DSNP Core](../Core/Overview.md).
It defines how Core primitives are used to build social networking applications, including
the social graph, public social media content types, and associated user data types.

## Relationship to Core

All operations, identity management, delegation, announcement mechanics, and user data
framework are defined in the [Core specification](../Core/Overview.md).
This specification defines the specific announcement types and user data types used for
social networking, and provides guidance on their use.

## Social Graph

The DSNP [social graph](Graph.md) represents relationships between users.
Graph edges are stored as [User Data](../Core/UserData.md) using the social graph data types
defined in this specification.

## Announcement Types

The following announcement types are defined for social networking use.
The announcement framework (validation, deduplication, ordering, batch publications) is defined
in [Core Announcements](../Core/Announcements.md).

| Value | Name | Description | DSNP Content URI | Tombstone Allowed |
| --- | --- | --- | --- | --- |
| 0 | [Tombstone](Types/Tombstone.md) | An invalidation of previously announced content | no | no |
| 2 | [Broadcast](Types/Broadcast.md) | A public post | YES | YES |
| 3 | [Reply](Types/Reply.md) | A public response to a Broadcast | YES | YES |
| 4 | [Reaction](Types/Reaction.md) | A public visual reply to a Broadcast | no | no |
| 6 | [Update](Types/Update.md) | An update to previously announced content | YES | no |
| 8 | [User Attribute Set](Types/UserAttributeSet.md) | An attribute set for a DSNP user | YES | YES |
| 9 | [DSNP Content Attribute Set](Types/DSNPContentAttributeSet.md) | An attribute set for a DSNP content item | YES | YES |
| 10 | [External Content Attribute Set](Types/ExternalContentAttributeSet.md) | An attribute set for non-DSNP content | YES | YES |

Type values not listed here are reserved or deprecated.

## User Data Types

The following user data types are defined for social networking use.
The user data framework (chunks, entity tags, Replace/Get operations) is defined in
[Core User Data](../Core/UserData.md).

| System Name | Version | Encryption | Compression | Description |
| --- | --- | --- | --- | --- |
| `publicFollows` | 1.2 | NONE | `DEFLATE` | Public social graph follows (see [Graph](Graph.md)) |
| `privateFollows` | 1.2 | `curve25519xsalsa20poly1305` | `DEFLATE` | Encrypted private follows (see [Graph](Graph.md)) |
| `privateConnections` | 1.2 | `curve25519xsalsa20poly1305` | `DEFLATE` | Encrypted bidirectional connections (see [Graph](Graph.md)) |
| `privateConnectionPRIds` | 1.2 | NONE | NONE | Pseudonymous relationship identifiers (see [Graph](Graph.md)) |
| `profileResources` | 1.3 | NONE | NONE | Profile-linked resources (see [Profile Resource](Types/ProfileResource.md)) |

## Batch File Format

Announcement data is batched and published using Apache Parquet files.
The normative batch publication requirements (discoverability, validity, delegation chain,
bloom filter spec) are defined in [Core Batch Publications](../Core/BatchPublications.md).
