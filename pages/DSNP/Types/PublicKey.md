# Public Key Announcement

A Public Key Announcement is a way to note a new or updated cryptographic key that can be used in DSNP to secure and verify the authenticity of communications.

A Public Key Announcement should be treated as updating an existing key if the `fromId`, `keyType`, `keyId` and `publicKey` fields of the new  announcement match those of a previous announcement.
This may be used to announce that a particular key has been revoked or is no longer in use.

The most recently published unrevoked key (if one exists) for a given key type should be treated as the active key of that key type.

A public key that has been revoked MUST NOT be used for any new cryptographic operations.
The `revokedAsOf` timestamp may be backdated to a time in the past (for example, if a key is known to have been compromised at or after a given date).
Any data previously generated through use of the key that is after such a backdated `revokedAsOf` timestamp should be considered invalid.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`7`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| fromId | id of the user creating the announcement | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES |
| keyType | Key Type Enum | enum | [decimal](../Serializations.md#decimal)  |`INT32` | YES |
| keyId | user-assigned identifier | 64 bit unsigned integer | [decimal](../Serializations.md#decimal)  |`UINT_64` | no |
| publicKey | public key in multikey format | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | no
| revokedAsOf | revocation time in Unix epoch milliseconds, or `null` if not revoked  | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | no |

## Field Requirements

### announcementType

- MUST be fixed to `7`

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

### keyType

- MUST be an allowed Key Type value

#### Allowed Key Types

| Value | Name | Allowed Algorithms ([multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv)) | Purpose |
| --- | --- | --- | --- |
| 1 | `keyAgreement` | `x25519-pub` | A Curve25519 public key that can be used in key exchange protocols to generate a shared secret |

### keyId

- A user-assigned 64-bit identifier for the key.

The user may assign a new `keyId` each time they announce a new key of a given `keyType`.
A `keyId` value is useful when invoking certain DSNP Operations in order to indicate which key was used to encrypt data.
It may also provide a hint to the user if they ever need to regenerate their private key (for example, many key derivation functions enable the use of a subkey identifier).

### publicKey

- MUST be a public key of an allowed algorithm for `keyType`, in multikey format

The "multikey" encoding of public keys is described in section 3.1.3 of the draft [did:key Method](https://w3c-ccg.github.io/did-method-key/#decode-public-key-algorithm) specification.
The encoded string consists of a [multibase](https://github.com/multiformats/multibase) identifier, a [multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv) key identifier (as a varint), and the public key's binary data in the codec's format.
`base58btc` encoding is recommended.
For example, the string `z6LStiZsmxiK4odS4Sb6JmdRFuJ6e1SYP157gtiCyJKfrYha` decodes as a Base58 string using the `x25519-pub` multicodec value with a 32-byte raw key of `0xfd3384e132ad02a56c78f45547ee40038dc79002b90d29ed90e08eee762ae715`.

### revokedAsOf

- MUST be one of the following:
  - the `null` value, indicating that the key has not been revoked, or
  - a timestamp in milliseconds since the Unix epoch, i.e. `'1970-01-01T00:00:00Z'`.
