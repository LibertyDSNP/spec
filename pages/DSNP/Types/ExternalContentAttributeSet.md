# External Content Attribute Set Announcement

An External Content Attribute Set Announcement is a way to create an authenticated (and, optionally, attested) attribute set for content external to the DSNP system.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`10`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the Announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES |
| subject | URL of the external content | URL | `UTF-8` | `UTF8` | no |
| subjectContentHash | multihash-encoded hash of subject document | variable length byte array | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES |
| url | URL for the Verifiable Credential document | `UTF-8` | `UTF-8` | `UTF8` | YES |
| contentHash | multihash-encoded hash of content stored at URL | variable length byte array | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | YES |
| attributeSetType | Canonical name of attribute set type | `UTF-8` | `UTF-8` | `UTF8` | YES |
| issuer | URI of issuer | `UTF-8` | `UTF-8` | `UTF8` | YES |

## Field Requirements

### announcementType

- MUST be fixed to `10`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### subject

Optional. If present,

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- MUST use one of the supported URL Schemes

### subjectContentHash

- MUST be a [DSNP Content Hash](../Identifiers.md#dsnp-content-hash)

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- Resource MUST be a Verifiable Credential Document
- MUST use one of the supported URL Schemes

### contentHash

- MUST be a [DSNP Content Hash](../Identifiers.md#dsnp-content-hash)

### attributeSetType

- MUST be a valid [Attribute Set Type canonical name](../Identifiers.md#attribute-set-type-canonical-name)

### issuer

- MUST be a valid URI
- MUST match the `issuer` value from the credential document retrieved from `url`

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.3 |
