# Tombstone Announcement

A Tombstone Announcement is a way to note that a previously announced content is invalid and the related Announcement should be considered reverted.
It is NOT possible to revert a tombstone.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`0`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | Id of the user creating the Announcement and the Tombstoned Announcement | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| targetAnnouncementType | target tombstoned Announcement type | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| targetContentHash | target `contentHash` of the original Announcement to tombstone | UTF-8 | [base32 multibase](../Serializations.md#base32-multibase) | `UTF8` | YES

## Field Requirements

### announcementType

- MUST be fixed to `0`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### targetAnnouncementType

- MUST be the [Announcement Type](../Announcements.md#announcement-types) of the target Announcement
- MUST ONLY be a Tombstone allowed Announcement Type

#### Tombstone Allowed Announcement Types

| Value | Name |
|------ | ---- |
| 2 | [Broadcast](../Types/Broadcast.md) |
| 3 | [Reply](../Types/Reply.md) |

### targetContentHash

- MUST be the `contentHash` of a previous Announcement of an Allowed Announcement Type with the same `fromId` as the Tombstone Announcement
