# Verification Announcement

A Verification Announcement verifies or rejects an Attribute Set Announcement.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`11`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the Announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES |
| verificationOf | DSNP Content URI of the announcement being verified | [DSNP Content URI](../Identifiers.md#dsnp-content-uri) | `UTF-8` | `UTF8` | no |
| targetAnnouncementType | target updated Announcement type | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| result | Bitwise OR of rejection reasons, or `0`, indicating successful verification | 32 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_32` | no |

## Field Requirements

### announcementType

- MUST be fixed to `11`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### verificationOf

- MUST be a [DSNP Content URI](../Identifiers.md#dsnp-content-uri)

### targetAnnouncementType

- MUST be the [Announcement Type](../Announcements.md#announcement-types) of the target Announcement
- MUST ONLY be a Verification allowed Announcement Type

#### Verification Allowed Announcement Types

| Value | Name |
|------ | ---- |
| 8 | [User Attribute Set](UserAttributeSet.md) |
| 9 | [DSNP Content Attribute Set](DSNPContentAttributeSet.md) |
| 10 | [External Content Attribute Set](ExternalContentAttributeSet.md)

### result

- MUST be 0 (zero) if the attribute set announcement was successfully verified. Otherwise, a bitwise OR (decimal sum) of the following rejection reasons:

| Bit Number | Hexadecimal Value | Rejection Reason |
| --- | --- | --- |
| 0 | `0x00000001` | contentHash could not be authenticated |
| 1 | `0x00000002` | subject or subjectContentHash could not be authenticated |
| 2 | `0x00000004` | attributeSetType could not be authenticated |
| 3 | `0x00000008` | claim could not be validated against schema |
| 4 | `0x00000010` | issuer proof failed verification |
| 5 | `0x00000020` | schema authorship could not be authenticated |
| 6 | `0x00000040` | credential has expired |
| 7-23 | `0x00000080`-`0x00800000` | Reserved for future expansion. |
| 24-31 | `0x01000000`-`0x80000000` | Verifier-specific reason. Consult verifier for details. |
