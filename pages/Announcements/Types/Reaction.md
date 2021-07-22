---
name: "Type: Reaction"
route: /Announcements/Types/Reaction
menu: Announcements
---

# Reaction Announcement

A Reaction Announcement is for publishing emoji reactions to anything with a [DSNP Announcement URI](/Identifiers#dsnp-announcement-uri).

## Fields

| Field | Description | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`4`) | [hexadecimal](/Announcements/Overview#hexadecimal) | `INT32` | no |
| createdAt | milliseconds since Unix epoch | [hexadecimal](/Announcements/Overview#hexadecimal) | `INT64` | no
| emoji | the encoded reaction | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `BYTE_ARRAY` | YES
| fromId | id of the user creating the relationship | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | YES
| inReplyTo | Target [DSNP Announcement URI](/Identifiers#dsnp-announcement-uri) | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `BYTE_ARRAY` | YES
| signature | creator signature | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `4`

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing

### emoji

- Emoji fields must not be empty.
- Emoji fields must only consist of [Unicode points](https://unicode.org/standard/standard.html) from `U+2000` to `U+2BFF`, from `U+E000` to `U+FFFF`, or from `U+1F000` to `U+10FFFF`.

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

- MUST be a [DSNP User Id](/Identifiers#dsnp-user-id)
- MUST be the [signer](/Announcements/Signatures) of the announcement

### inReplyTo

- MUST be a [DSNP Announcement URI](/Identifiers#dsnp-announcement-uri)

### signature

- MUST be an [Announcement Signature](/Announcements/Signatures) over the all fields except the signature field.

## Non-Normative

### Likes

Generic "likes" should default use the `"❤️"` or unicode `U+FE0F` as the emoji in the reaction.
