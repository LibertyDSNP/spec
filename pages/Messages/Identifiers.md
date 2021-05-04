---
name: Identifiers
route: /Messages/Identifiers
menu: Messages
---

# Messages Identifiers

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Describe a means of uniquely identifying DSNP content messages
1. Describe potential extensions of identifiers for the future

## Assumptions

* All assumptions from [DSNP Messages](/Messages/Overview)

## Identifiers

DSNP message identifiers at minimum consist of a string with three parts, a protocol, a user identifier and a content hash, like so:

```
dsnp://0123456789abcdef/0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef
```

In this example, `dsnp://` is the protocol indicating that the latest version of this specification should be used.
`0123456789abcdef` is the identifier representing a user as described in the [Identity Registry](/Identity/Registry) specification.
`0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef` is the hash of the content as described in the [Messages Serialization](/Messages/Serialization) specification.

### Protocol

As of this specification version, the protocol string should always be the string `dsnp://`.
In future specification versions, this string may change to indicate non-backward-compatible changes.

### User Identifier

The user identifier section of the identifier string should adhere to the relevant version of the [Identity Registry](/Identity/Registry) specification.
This MUST be a hexadecimal representation of the user's 64 bit registry identifier number.
For example, `0123456789abcdef` would indicate user number 81,985,529,216,486,895.

### Content Hash

The content hash section of the identifier string should be a [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the content of the message as stored at the URI provided in the DSNP announcement.
This string should be identical to the `contentHash` field as described in the [Message Overview](/Messages/Overview).
