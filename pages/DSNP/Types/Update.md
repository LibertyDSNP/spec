# Update Announcement

An Update Announcement is a way to note intent to update previously
announced content. If the original Broadcast/Reply is Tombstoned, subsequent
Updates should be ignored.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`6`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| contentHash | multihash-encoded hash of content stored at URL | variable length byte array | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES
| url | updated content URL | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no
| targetAnnouncementType | target updated Announcement type | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| targetContentHash | multihash-encoded hash of target content | variable length byte array | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES

## Field Requirements

### announcementType

- MUST be fixed to `6`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

### contentHash

- MUST be a valid [multihash](https://github.com/multiformats/multihash) encoding of the hash output for the bytes of the content at the URL, generated with a [Supported Hashing Algorithm](../Announcements.md#supported-hashing-algorithms).

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST be one of the supported [Activity Content](../../ActivityContent/Overview.md) Types
- MUST use one of the supported URL Schemes

### targetAnnouncementType

- MUST be the [Announcement Type](../Announcements.md#announcement-types) of the target Announcement
- MUST ONLY be an Update allowed Announcement Type

#### Update Allowed Announcement Types

| Value | Name |
|------ | ---- |
| 2 | [Broadcast](../Types/Broadcast.md) |
| 3 | [Reply](../Types/Reply.md) |

### targetContentHash

- MUST be the `contentHash` of an allowed Announcement type with the same `fromId` as the Update Announcement
