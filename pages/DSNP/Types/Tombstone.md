# Tombstone Announcement

A Tombstone Announcement is a way to note that a previously announced content is invalid and the related Announcement should be considered reverted.
It is NOT possible to revert a tombstone.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`0`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| createdAt | milliseconds since Unix epoch | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | no
| fromId | id of the user creating the Announcement and the Tombstoned Announcement | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| targetAnnouncementType | target tombstoned Announcement type | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| targetContentHash | target `contentHash` of the original Announcement to tombstone | 32 bytes | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES

## Field Requirements

### announcementType

- MUST be fixed to `0`

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST directly or via a chain of delegation have authorized the creation of the Announcement

### targetAnnouncementType

- MUST be the [Announcement Type](../Announcements.md#announcement-types) of the target Announcement
- MUST ONLY be a Tombstone allowed Announcement Type

#### Tombstone Allowed Announcement Types

| Value | Name |
|------ | ---- |
| 2 | [Broadcast](../Types/Broadcast.md) |
| 3 | [Reply](../Types/Reply.md) |

### targetContentHash

- MUST match a `contentHash` of previous Announcement with the same `fromId` as the Tombstone Announcement
