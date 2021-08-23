---
name: Overview
route: /Announcements/Overview
menu: Announcements
---

# Announcements Overview

Announcements are content or reference to content that are included in [Batch Publication Files](/BatchPublications/Overview)
to communicate new user activity to the rest of the network.
All Announcements have a [signature](/Announcements/Signatures) to validate the creators authority to publish content.

## Announcement Types

Each Announcement has a enumerated type for use when separating out a stream of Announcements.

| Value | Name | Description | DSNP Announcement URI | Tombstone Allowed |
|------ | ---- | ----------- | --------------------- | ----------------- |
| 0 | [Tombstone](/Announcements/Types/Tombstone) | an invalidation of another announcement | no | no |
| 1 | [Graph Change](/Announcements/Types/GraphChange) | social graph changes | no | no |
| 2 | [Broadcast](/Announcements/Types/Broadcast) | a public post | YES | YES |
| 3 | [Reply](/Announcements/Types/Reply) | a public response to a Broadcast | YES | YES |
| 4 | [Reaction](/Announcements/Types/Reaction) | a public visual reply to a Broadcast | no | YES |
| 5 | [Profile](/Announcements/Types/Profile) | a profile | YES | no |

## Value Serialization

Serialization is how the value should be stringified for signing and for transfer between systems.
Most serializations use outside standards, but some require additional clarifications, provided here.

### hexadecimal

Used to represent bytes.

- MUST use 0-9,a-f representation
- MUST be lowercase
- MUST be prefixed with a `0x`
- MUST NOT have spaces or separators
- MUST have two characters per byte in addition to the `0x` characters

| Bytes | Invalid | Valid |
| --- | --- | --- |
| 2 | `0x123` | `0x0123` |
| 2 | `123h` | `0x0123` |
| 2 | `0x0ABC` | `0x0abc` |
| 8 | `0xabc` | `0x0000000000000abc` |
| 32 | `0x3e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e` | `0x00003e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e` |

### decimal

Used to represent integers.
Strings are used to avoid issues with different implementations of numbers.

- MUST use 0-9 representation
- MUST NOT have spaces or separators
- MUST be a string

| Invalid | Why | Valid |
| --- | --- | --- |
| `0x123` | Must be decimal | `"291"` |
| 291 | Must be a string | `"291"` |
| `291n` | `BigInt(291)` serialization appends an `n`  | `"291"` |

## Duplicate Handling

Duplicate Announcements may occur.
Duplicates may be identified as any Announcements that match a previous Announcement's `signature` field
(per the [Announcement Order](#ordering-announcements)).
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

## Reverting an Announcement

Announcements may not be deleted, but some may be marked as invalid by using a [Tombstone Announcement](/Announcements/Types/Tombstone).
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
