# Update Announcement

An Update Announcement is a way to note intent to update previously
announced content. If the original Broadcast/Reply is Tombstoned, subsequent
Updates should be ignored.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`6`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| contentHash | keccak-256 hash of updated content | 32 bytes | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES
| url | updated content URL | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no
| targetContentHash | keccak-256 hash of target content | 32 bytes | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES

## Field Requirements

### announcementType

- MUST be fixed to `6`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

### contentHash

- MUST be the [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the reference at the url

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST one of the supported [Activity Content](../../ActivityContent/Overview.md) Types
- MUST use one of the supported URL Schemes

### targetContentHash

- MUST be the [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the reference at the url
