# Identifiers

The DSNP Identifiers form the basis for pseudo-anonymous streams of content.
Graph connections are formed through the DSNP User Id.

## DSNP User Id

- 64-bit Unsigned Integer
- MUST be serialized as [decimal](Serializations.md#decimal)
- MUST be unique per implementation

## DSNP Content Hash

- MUST be a multibase string using the `base32` encoding
- MUST represent a valid [multihash](https://github.com/multiformats/multihash) encoding of the hashing algorithm output for the bytes of the content
- MUST use a [Supported Hashing Algorithm](Announcements.md#supported-hashing-algorithms)

### Serialization Steps

1. Apply the Supported Hashing Algorithm to create a digest of the content.
2. Prepend the leading bytes from the table below indicating the hashing algorithm in the multicodec table and the length of the hash output.
3. Encode to UTF-8 using the `base32` alphabet.
4. Prepend the `'b'` character indicating `base32` encoding.

### Example

1. Applying the BLAKE3 algorithm to the [DSNP Whitepaper](https://dsnp.org/dsnp_whitepaper.pdf) yields the following 32 bytes: `0x3a0393e3ee6c6fec1b13885763225fd0927884b2d431ed262899523ade281cb4`.
2. Prepending the multihash indicator (`0x1e` for `blake3`) and hash length (`0x20` for 32 bytes) gives `0x1e203a0393e3ee6c6fec1b13885763225fd0927884b2d431ed262899523ade281cb4`
3. Encoding this to the `base32` alphabet outputs the string `dyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna`.
4. Prepending the `b` character to indicate `base32` gives us the final DSNP Content Hash of `bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna`.

### Supported Hashing Algorithms

| Algorithm | Multihash Name | Leading bytes | Reference | DSNP Version Added |
| --- | --- | --- | --- | --- |
| SHA-256 | `sha2-256` | `0x1220` | [RFC 6234](https://tools.ietf.org/html/rfc6234) | 1.2 |
| BLAKE3 | `blake3` | `0x1e20` | [blake3.io](https://blake3.io) | 1.3 |

## DSNP Protocol Scheme

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
It is used to uniquely identify an Announcement from a given user with content.

Any [Announcement Types](Announcements.md#announcement-types) with a `fromId` and `contentHash` have a DSNP Content URI.
When encoding a DSNP Content URI, the `contentHash` field MUST be serialized exactly as it appears in the Announcement (that is, as a base32 multihash string).

### Example
```
dsnp://78187493520/bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `78187493520` |
| Content Hash | `bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna` |
