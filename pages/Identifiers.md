---
name: Identifiers
route: /Identifiers
---

# DSNP Identifiers

## DSNP User Id

- Is 8 bytes in size
- MUST be registered in the [Identity Registry](/Identity/Registry)
- MUST be serialized as [hexadecimal](/Announcements/Overview#hexadecimal)

## DSNP Content Hash

- Is 32 bytes in size
- MUST be a [keccak-256 hash](https://keccak.team/files/Keccak-submission-3.pdf) of the bytes of the content
- MUST be serialized as [hexadecimal](/Announcements/Overview#hexadecimal)

### DSNP Protocol Scheme

- MUST always be the string `dsnp://`

## DSNP User URI

DSNP User URI consists of two parts, the scheme and the user id.
It is used to identify a user via a URI.

### Example
```
dsnp://0x1234567890abcdef
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `0x1234567890abcdef` |

## DSNP Announcement URI

DSNP Announcement URI consists of three parts, the scheme, the user id, and the content hash.
It is used to uniquely identify an announcements from a given user with content.

Any [Announcement Types](/Announcements/Overview#announcement-types) with a `fromId` and `contentHash` have a DSNP Announcement URI.

### Example
```
dsnp://0x1234567890/0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `0x1234567890` |
| Content Hash | `0x1234567890abcdef0123456789abcdef0123456789abcdef0123456789abcdef` |
