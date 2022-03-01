---
name: "Type: Tombstone"
route: /DSNP/Types/Tombstone
menu: DSNP
---

# Tombstone Announcement

A Tombstone Announcement is a way to note that a previous announcement signature is invalid and the related Announcement should be considered reverted.
It is NOT possible to revert a tombstone.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`0`) | enum | [decimal](/DSNP/Serializations#decimal) | `INT32` | no |
| createdAt | milliseconds since Unix epoch | 64 bit unsigned integer | [decimal](/DSNP/Serializations#decimal) | `UINT_64` | no
| fromId | id of the user creating the announcement and tombstoned announcement | 64 bit unsigned integer | [decimal](/DSNP/Serializations#decimal) | `UINT_64` | YES
| targetAnnouncementType | target tombstoned announcement type | enum | [decimal](/DSNP/Serializations#decimal) | `INT32` | no |
| targetSignature | target announcement signature to tombstone | 65 bytes | [hexadecimal](/DSNP/Serializations#hexadecimal) | `BYTE_ARRAY` | YES
| signature | creator signature | 65 bytes | [hexadecimal](/DSNP/Serializations#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `0`

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### fromId

- MUST be a [DSNP User Id](/DSNP/Identifiers#dsnp-user-id)
- MUST be the [signer](/DSNP/Signatures) of the target announcement

### targetAnnouncementType

- MUST be the [Announcement Type](/DSNP/Announcements#announcement-types) of the target announcement
- MUST ONLY be a Tombstone Allowed Announcement Type

#### Tombstone Allowed Announcement Types

| Value | Name |
|------ | ---- |
| 2 | [Broadcast](/Announcement/Types/Broadcast) |
| 3 | [Reply](/Announcement/Types/Reply) |
| 4 | [Reaction](/Announcement/Types/Reaction) |

### targetSignature

- MUST be an [Announcement Signature](/DSNP/Signatures) that the `fromId` has announced

### signature

- MUST be an [Announcement Signature](/DSNP/Signatures) over the all fields except this signature field
- MUST be the signature of the `fromId` user