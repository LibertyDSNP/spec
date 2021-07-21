---
name: Overview
route: /Announcements/Overview
menu: Announcements
---

# Announcements Overview

Announcements are content or reference to content that are included in [Batch Publication Files](/BatchPublications/Overview)
to communicate new user activity to the rest of the network.
All Announcements have a [signature](/Announcements/Signatures) to validate the creators authority to publish content.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Announcement Types

Each Announcement has a enumerated type for use when separating out a stream of Announcements.

| Value | Name | Description | DSNP Announcement Id |
|------ | ---- | ----------- | -------------------- |
| 0 | Reserved | reserved for future use | - |
| 1 | [Graph Change](/Announcements/Types/GraphChange) | social graph changes | no |
| 2 | [Broadcast](/Announcement/Types/Broadcast) | a public post | YES |
| 3 | [Reply](/Announcement/Types/Reply) | a public response to a Broadcast | YES |
| 4 | [Reaction](/Announcement/Types/Reaction) | a public visual reply to a Broadcast | no |
| 5 | [Profile](/Announcement/Types/Profile) | a profile | YES |

## Value Serialization

Serialization is how the value should be stringified for signing and for transfer between systems.
Most serializations use outside standards, but some require additional clarifications, provided here.

### hexadecimal

- MUST use 0-9,a-f representation
- MUST be lowercase
- MUST be prefixed with a `0x`
- MUST NOT have spaces

## Duplicate Handling

Duplicate Announcements may occur.
Duplicates may be identified as any Announcements that match a previous Announcement's `signature` field
(per the [Announcement Order](/Announcements/Overview#ordering)).
Duplicate Announcements MUST be rejected or ignored.

## Ordering Announcements

Announcements are ordered on the network to provide for time dependent resolutions.

Announcements in [Batch Publication Files](/BatchPublications/Overview) have an eventually consistent canonical ordering.
The `DSNPBatchPublication` Ethereum events are ordered by information provided in the transaction.
Announcements in a Batch Publication File are then ordered by row index.


1. `DSNPBatchPublication` Block number ascending
2. `DSNPBatchPublication` Transaction index ascending
3. `DSNPBatchPublication` Log index ascending
4. Batch Publication File Announcement row appearance order


## Non-Normative

### Announcement Ordering and Activity Content Published Timestamp

Activity Content has a published field that contains a user generated timestamp.
User generated timestamps cannot be validated,
but may be used to indicate ordering other than the network order for Announcements which are *not* time dependent.

### Announcement Reference Ordering

Some Announcements contain references to other announcements via the `inReplyTo` field.
Due to the distributed nature, the canonical order can have an announcement that refers to another later in the order.
For display purposes, these messages should be considered to have occurred after the reference.
