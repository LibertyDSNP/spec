# Reaction Announcement

A Reaction Announcement is for publishing emoji reactions to anything with a [DSNP Content URI](../Identifiers.md#dsnp-content-uri).

## Fields

| Field            | Description                                                   | Data Type               | Serialization | Parquet Type | Bloom Filter |
|------------------|---------------------------------------------------------------|-------------------------| ------------- |--------------|--------------|
| announcementType | Announcement Type Enum (`4`)                                  | enum                    | [decimal](../Serializations.md#decimal) | `INT32`      | no           |
| emoji            | the encoded reaction                                          | UTF-8                   | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8`       | YES          |
| apply            | how to apply the reaction                                     | 8-bit unsigned integer  | [decimal](../Serializations.md#decimal)  | `UINT_8`     | no           |
| fromId           | id of the user creating the relationship                      | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64`    | YES          |
| inReplyTo        | Target [DSNP Content URI](../Identifiers.md#dsnp-content-uri) | UTF-8                   | [UTF-8](https://datatracker.ietf.org/doc/html/rfc3629) | `UTF8`       | YES          |

## Field Requirements

### announcementType

- MUST be fixed to `4`

### emoji

- Emoji fields must not be empty
- Emoji fields must consist only of [Unicode points](https://unicode.org/standard/standard.html) from `U+2000` to `U+2BFF`, from `U+E000` to `U+FFFF`, or from `U+1F000` to `U+10FFFF`

#### Examples

All of the following should be considered valid emojis:

```
"😀", "🤌🏼", "👩🏻‍🎤", "🧑🏿‍🏫", "🏳️‍🌈", "🏳️‍⚧️", "⚛︎", "🃑", "♻︎"
```

None of the following should be considered valid:

```
"F", ":custom-emoji:", "<custom-emoji>", "ᚱ", "ᘐ", "״"
```
### apply
- MUST be an UINT_8
- Indicates whether the emoji should be applied and if so, at what "strength".

Potential uses:
- a single reaction
- ratings
- a range of responses, e.g. "strongly disagree" --> "strongly agree" = 1 --> 5 stars.
- recommendation engines

#### Apply Enums

| Value | Name    | Description                        |
|-------|---------|------------------------------------|
| 0     | retract | Remove the referenced emoji        |
| n     | apply   | Apply the referenced emoji N times |

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### inReplyTo

- MUST be a [DSNP Content URI](../Identifiers.md#dsnp-content-uri)

## Non-Normative

### Likes

Generic "likes" should default to the `"❤️"` or Unicode `U+FE0F` as the emoji in the reaction.
