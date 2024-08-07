# Broadcast Announcement

A Broadcast Announcement is a way to send a public message to everyone.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`2`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| contentHash | [DSNP Content Hash](../Identifiers.md#dsnp-content-hash) of content | UTF-8 | multihash as base32 string | `UTF8` | YES
| fromId | id of the user creating the Announcement | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| url | content URL | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no

## Field Requirements

### announcementType

- MUST be fixed to `2`

### contentHash

- MUST be a valid [DSNP Content Hash](../Identifiers.md#dsnp-content-hash)

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST be one of the supported [Activity Content](../../ActivityContent/Overview.md) Types
- MUST use one of the supported URL Schemes

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |
