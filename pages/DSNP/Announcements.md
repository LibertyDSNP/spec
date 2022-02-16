---
menu: DSNP
name: Announcements
route: /DSNP/Announcements
---

TODO: Why announcements and what they do in general and the requirements for implementations

# Announcements Overview

Announcements are content or reference to content that are included in [Batch Publication Files](/DSNP/BatchPublications)
to communicate new user activity to the rest of the network.
All Announcements have a [signature](/DSNP/Signatures) to validate the creators authority to publish content.

## Duplicate Handling

Duplicate Announcements may occur.
Duplicates may be identified as any Announcements that match a previous Announcement's `signature` field
(per the [Announcement Order](#ordering-announcements)).
Duplicate Announcements MUST be rejected or ignored.

## Ordering Announcements

Announcements are ordered on the network to provide for time dependent resolutions.

Announcements in [Batch Publication Files](/DSNP/BatchPublications) have an eventually consistent canonical ordering.
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
