---
name: Identifiers
route: /DSNP/Identifiers
menu: DSNP
---

# DSNP Identifiers

## DSNP User Id

- 64 bit Unsigned Integer
- MUST be registered in the [Identity Registry](/Ethereum/IdentityRegistry)
- MUST be serialized as [decimal](/DSNP/Serializations#decimal)

## DSNP Content Hash

- MUST be 32 bytes in size
- MUST be a [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the content
- MUST be serialized as [hexadecimal](/DSNP/Serializations#hexadecimal)

### DSNP Protocol Scheme

- MUST always be the string `dsnp://`

## DSNP User URI

DSNP User URI consists of two parts, the scheme and the user id.
It is used to identify a user via a URI.

### Example
```
dsnp://1311768467294899700
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `1311768467294899700` |

## DSNP Announcement URI

DSNP Announcement URI consists of three parts, the scheme, the user id, and the content hash.
It is used to uniquely identify an announcements from a given user with content.

Any [Announcement Types](/Announcements/Overview#announcement-types) with a `fromId` and `contentHash` have a DSNP Announcement URI.

### Example
```
dsnp://78187493520/0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `78187493520` |
| Content Hash | `0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |
