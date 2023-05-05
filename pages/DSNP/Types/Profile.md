# Profile Announcement

A Profile Announcement is a constrained version of a [Broadcast Announcement](../Types/Broadcast.md).
The reference content *MUST be of profile type*.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`5`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| contentHash | multihash-encoded hash of content stored at URL | variable length byte array | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES
| fromId | id of the user creating the Announcement | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| url | profile content URL | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no

## Field Requirements

### announcementType

- MUST be fixed to `5`

### contentHash

- MUST be a [DSNP Content Hash](../Identifiers.md#dsnp-content-hash)

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST be a valid [Profile Activity Content](../../ActivityContent/Types/Profile.md) Type
- MUST use one of the supported URL Schemes

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |

## Non-Normative

### Most Recent Profile

When displaying a DSNP user's profile, the most recent profile should be considered the complete and correct version.
Previous Profile Announcements from the same `fromId` may be disregarded.
