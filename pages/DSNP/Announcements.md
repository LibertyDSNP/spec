# Announcements Overview

Announcements are content or reference to content that communicate new user activity to the rest of the network.
Announcements are associated with an [Identifier](/DSNP/Identifiers) which can be validated as creator of the announcement.
Depending on the implementation Announcements may be published directly to the network, included in [Batch Publication Files](/DSNP/BatchPublications), or some combination of those two.

## Announcement Validation

There is no guarantee that, at time of creation, a given announcement will be from the `fromId` claimed in the announcement.
The reader MUST perform a validation of the announcement at read time to ensure authenticity.
Implementations MUST provide a way to validate what [signatures](/DSNP/Signatures) are associated with a given [identifier](/DSNP/Identifiers).

## Announcement Types

Each Announcement has a enumerated type for use when separating out a stream of Announcements.

| Value | Name | Description | DSNP Announcement URI | Tombstone Allowed |
|------ | ---- | ----------- | --------------------- | ----------------- |
| 0 | [Tombstone](/DSNP/Types/Tombstone) | an invalidation of another announcement | no | no |
| 1 | [Graph Change](/DSNP/Types/GraphChange) | social graph changes | no | no |
| 2 | [Broadcast](/DSNP/Types/Broadcast) | a public post | YES | YES |
| 3 | [Reply](/DSNP/Types/Reply) | a public response to a Broadcast | YES | YES |
| 4 | [Reaction](/DSNP/Types/Reaction) | a public visual reply to a Broadcast | no | YES |
| 5 | [Profile](/DSNP/Types/Profile) | a profile | YES | no |


## Duplicate Handling

Duplicate Announcements may occur due to the nature of asynchronous communication.
In the case of duplicates, the first Announcement should be considered the only valid Announcement.
Additional duplicate Announcements MUST be rejected or ignored.

## Ordering Announcements

1. Order Batch Publications by implementation order.
2. Order Announcements in a Batch Publication File by row appearance order.

## Reverting an Announcement

Announcements may not be deleted, but some may be marked as invalid by using a [Tombstone Announcement](/DSNP/Types/Tombstone).
For example, if a user creates a reaction announcement, they may remove that reaction by creating a tombstone announcement.


## Non-Normative

### Announcement Ordering and Activity Content Published Timestamp

Activity Content has a published field that contains a user generated timestamp.
User generated timestamps cannot be validated,
but may be used to indicate ordering other than the network order for Announcements which are *not* time dependent.

### Announcement Reference Ordering

Some Announcements contain references to other announcements via the `inReplyTo` field.
Due to the distributed nature, the canonical order can have an announcement that refers to another later in the order.
For display purposes, these messages should be considered to have occurred after the reference.
