# Reaction Announcement

A Reaction Announcement is for publishing emoji reactions to anything with a [DSNP Content URI](../Identifiers.md#dsnp-content-uri).

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`4`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| createdAt | milliseconds since Unix epoch | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | no
| emoji | the encoded reaction | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | YES
| fromId | id of the user creating the relationship | 64 bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| inReplyTo | Target [DSNP Content URI](../Identifiers.md#dsnp-content-uri) | UTF-8 | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8` | YES
| signature | creator signature | 65 bytes | [hexadecimal](../Serializations.md#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `4`

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### emoji

- Emoji fields must not be empty
- Emoji fields must only consist of [Unicode points](https://unicode.org/standard/standard.html) from `U+2000` to `U+2BFF`, from `U+E000` to `U+FFFF`, or from `U+1F000` to `U+10FFFF`

#### Examples

All of the following should be considered valid emoji:

```
"😀", "🤌🏼", "👩🏻‍🎤", "🧑🏿‍🏫", "🏳️‍🌈", "🏳️‍⚧️", "⚛︎", "🃑", "♻︎"
```

None of the following should be considered valid:

```
"F", ":custom-emoji:", "<custom-emoji>", "ᚱ", "ᘐ", "״"
```

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST be the [signer](../Signatures.md) of the announcement

### inReplyTo

- MUST be a [DSNP Content URI](../Identifiers.md#dsnp-content-uri)

### signature

- MUST be an [Announcement Signature](../Signatures.md) over the all fields except the signature field

## Non-Normative

### Likes

Generic "likes" should default use the `"❤️"` or unicode `U+FE0F` as the emoji in the reaction.
