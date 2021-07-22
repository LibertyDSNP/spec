---
name: "Type: Profile"
route: /Announcements/Types/Profile
menu: Announcements
---

# Profile Announcement

A Profile Announcement is a constrained version of a [Broadcast Announcement](/Announcements/Types/Broadcast).
The reference content *MUST be of profile type*.

## Fields

| Field | Description | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`5`) | [hexadecimal](/Announcements/Overview#hexadecimal) | `INT32` | no |
| contentHash | keccak-256 hash of content stored at URL | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | YES
| createdAt | milliseconds since Unix epoch | [hexadecimal](/Announcements/Overview#hexadecimal) | `INT64` | no
| fromId | id of the user creating the announcement | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | YES
| url | Profile content URL | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `BYTE_ARRAY` | no
| signature | creator signature | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `5`

### contentHash

- MUST be 32 bytes in length
- MUST be the [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the reference at the url.

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### fromId

- MUST be a [DSNP User Id](/Identifiers#dsnp-user-id)
- MUST be the [signer](/Announcements/Signatures) of the announcement

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890).
- Resource MUST be a valid [Profile Activity Content](/ActivityContent/Overview) Type
- MUST use one of the supported URL Schemes

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |

### signature

- MUST be an [Announcement Signature](/Announcements/Signatures) over the all fields except the signature field.

## Non-Normative

### Most Recent Profile

When displaying a DSNP user's profile, the most recent profile should be considered the complete and correct version.
Previous Profile Announcements from the same `fromId` may be disregarded.
