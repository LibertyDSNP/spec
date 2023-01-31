# Public Key Announcement

A Public Key Announcement is a way to note a new or updated cryptographic key that can be used in DSNP to secure and verify the authenticity of communications.

A Public Key Announcement should be treated as updating an existing key if the `fromId`, `keyType`, and `publicKeyMultibase` fields of the new  announcement match those of a previous announcement.
This may be used to announce that a particular key has been revoked or is no longer in use.

The most recently published unrevoked key (if one exists) for a given key type should be treated as the active key of that key type.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`7`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| keyType | Key Type Enum | enum | [decimal](../Serializations.md#decimal)  |`INT32` | YES
| publicKeyMultibase | public key | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no
| revokedAsOf | revocation time in Unix epoch milliseconds, or `null` if not revoked  | 64 bit signed integer | [decimal](../Serializations.md#decimal) | `INT64` | no |

## Field Requirements

### announcementType

- MUST be fixed to `7`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

### keyType

- MUST be an allowed Key Type value

#### Allowed Key Types

| Value | Name | Purpose |
| --- | --- | --- |
| 1 | `keyAgreement` | A public key that can be used in key exchange protocols to generate a shared secret |

### publicKeyMultibase

- MUST be a public key of an allowed algorithm in multibase format

#### Allowed Algorithms

| [multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv) name | Description |
| --- | --- |
| `x25519-pub` | Curve25519 public key |

### revokedAsOf

- MUST be one of the following:
  - the `null` value, indicating that the key has not been revoked, or
  - a timestamp in milliseconds since the Unix epoch, i.e. `'1970-01-01T00:00:00Z'`.
