# Announcements Overview

Announcements are content or references to content that communicate new user activity to the rest of the network.
Announcements are associated with an [Identifier](Identifiers.md) that can be validated as the creator of the Announcement.
Depending on the implementation, Announcements may be published directly to the network, included in [Batch Publication Files](BatchPublications.md), or some combination of those two.

## Announcement Validation

There is no guarantee that, at time of creation, a given Announcement will be from the `fromId` claimed in the Announcement.
The reader MUST perform a validation of the Announcement at read time to ensure authenticity.
Implementations MUST provide a way to validate that the [identifier](Identifiers.md) associated with a given [Announcement](Announcements.md) is authentic.

## Announcement Types

Each Announcement has an enumerated type for use when separating out a stream of Announcements.

| Value | Name | Description | DSNP Content URI | Tombstone Allowed |
|------ | ---- | ----------- | --------------------- | ----------------- |
| 0 | [Tombstone](Types/Tombstone.md) | an invalidation of previously announced content | no | no |
| 1 | [Graph Change](Types/GraphChange.md) | social graph changes | no | no |
| 2 | [Broadcast](Types/Broadcast.md) | a public post | YES | YES |
| 3 | [Reply](Types/Reply.md) | a public response to a Broadcast | YES | YES |
| 4 | [Reaction](Types/Reaction.md) | a public visual reply to a Broadcast | no | no |
| 5 | [Profile](Types/Profile.md) | a profile | YES | no |
| 6 | [Update](Types/Update.md) | an update to content| YES | no |

## Duplicate Handling

Due to the nature of asynchronous communication, duplicate Announcements may occur.
In the case of duplicates, the first Announcement should be considered the ONLY valid Announcement.
Additional duplicate Announcements MUST be rejected or ignored.

## Ordering Announcements

1. Order Batch Publications by implementation order.
2. Order Announcements in a Batch Publication File by row appearance order.

## Reverting an Announcement

Announcements may not be deleted, but may be marked invalid by using a [Tombstone Announcement](Types/Tombstone.md), or updated by using an [Update Announcement](Types/Update.md).
For example, if a user creates a [Reaction Announcement](Types/Reaction.md), they may remove that reaction by creating a Tombstone Announcement.

## Related Operations

* [Publish Announcement](Operations.md#PublishAnnouncement)
* [Publish Batch](Operations.md#PublishBatch)

## Non-Normative

### Duplicate Announcements

Due to the distributed nature of DSNP, duplicate Announcements are possible from time to time.
These should be discarded and ignored.

### Replay Attacks

Implementations typically restrict replay attacks by testing that the chain transaction sender is authorized (often via delegation) to publish an Announcement.

### Announcement Ordering and Activity Content Published Timestamp

Activity Content has a published field that contains a user-generated timestamp.
User-generated timestamps cannot be validated, but may be used to indicate ordering other than the network order for Announcements (which are *not* time dependent.)

### Announcement Reference Ordering

Some Announcements contain references to other Announcements via the `inReplyTo` field.
Due to the distributed nature of DSNP, the canonical order can have an Announcement that refers to another announcement appearing later in the network order.
For display purposes, these messages should be considered to have occurred after the reference.

### DSNP v1.0 Announcement Signatures

In DSNP v1.0, Announcements had individual signatures, producing Batch Publications that were generic and disconnected from the user.
Announcements could be submitted to the chain via anyone—not just delegates or users.

In DSNP v1.1, Announcement signatures were removed in favor of the implementation being responsible for the connection between the on-chain signature and the user.
Implementations require that the transaction that produces a Batch be performed by the user or delegate directly.
This creates batches that are delegate specific, but allows for faster testing of the validity of individual Announcements in a Batch.

For more information see [DIP-145](https://github.com/LibertyDSNP/spec/issues/145).
