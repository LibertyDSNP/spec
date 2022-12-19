# Identifiers

The DSNP Identifiers form the basis for pseudo-anonymous streams of content.
Graph connections are formed through the DSNP User Id.

## DSNP User ID

- 64-bit Unsigned Integer
- MUST be serialized as [decimal](Serializations.md#decimal)
- MUST be unique per implementation

## DSNP Content Hash

- MUST be 32 bytes in size
- MUST be a [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the content
- MUST be serialized as [hexadecimal](Serializations.md#hexadecimal)

### DSNP Protocol Scheme

- MUST always be the string `dsnp://`

## DSNP User URI

The DSNP User URI consists of two parts: the scheme and the user id.
It is used to identify a user via a URI.

### Example
```
dsnp://1311768467294899700
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `1311768467294899700` |

## DSNP Content URI

The DSNP Content URI consists of three parts: the scheme, the user id, and the content hash.
It is used to uniquely identify an announcement from a given user with content.

Any [Announcement Types](Announcements.md#announcement-types) with a `fromId` and `contentHash` have a DSNP Content URI.

### Example
```
dsnp://78187493520/0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `78187493520` |
| Content Hash | `0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |
