# Profile Announcement

A Profile Announcement is a constrained version of a [Broadcast Announcement](/DSNP/Types/Broadcast).
The reference content *MUST be of profile type*.

## Fields

| Field | Description | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`5`) | [decimal](/DSNP/Serializations#decimal) | `INT32` | no |
| contentHash | keccak-256 hash of content stored at URL | [hexadecimal](/DSNP/Serializations#hexadecimal) | `BYTE_ARRAY` | YES
| createdAt | milliseconds since Unix epoch | [decimal](/DSNP/Serializations#decimal) | `UINT_64` | no
| fromId | id of the user creating the announcement | [decimal](/DSNP/Serializations#decimal) | `UINT_64` | YES
| url | Profile content URL | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no
| signature | creator signature | [hexadecimal](/DSNP/Serializations#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `5`

### contentHash

- MUST be 32 bytes in length
- MUST be the [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the reference at the url

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### fromId

- MUST be a [DSNP User Id](/DSNP/Identifiers#dsnp-user-id)
- MUST be the [signer](/DSNP/Signatures) of the announcement

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST be a valid [Profile Activity Content](/ActivityContent/Overview) Type
- MUST use one of the supported URL Schemes

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |

### signature

- MUST be an [Announcement Signature](/DSNP/Signatures) over the all fields except the signature field

## Non-Normative

### Most Recent Profile

When displaying a DSNP user's profile, the most recent profile should be considered the complete and correct version.
Previous Profile Announcements from the same `fromId` may be disregarded.
