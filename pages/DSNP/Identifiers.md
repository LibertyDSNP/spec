# Identifiers

The DSNP Identifiers form the basis for pseudo-anonymous streams of content.
Graph connections are formed through the DSNP User Id.

## DSNP User Id

- 64-bit Unsigned Integer
- MUST be serialized as [decimal](Serializations.md#decimal)
- MUST be unique per implementation

## DSNP Content Hash

- Variable length byte array (fixed length for a given hashing algorithm)
- MUST be a valid [multihash](https://github.com/multiformats/multihash) encoding of the hash output for the bytes of the content, generated with a [Supported Hashing Algorithm](Announcements.md#supported-hashing-algorithms)

### Supported Hashing Algorithms

| Algorithm | Multihash Name | Leading bytes (as [varint](https://github.com/multiformats/unsigned-varint)) | Reference | DSNP Version Added |
| --- | --- | --- | --- | --- |
| SHA-256 | `sha2-256` | `0x1220` | [RFC 6234](https://tools.ietf.org/html/rfc6234) | 1.2.0 |
| BLAKE2b | `blake2b-256` | `0xa0e40220` | [RFC 7693](https://tools.ietf.org/html/rfc7693) | 1.2.0 |

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

### Example
```
dsnp://78187493520/QmQNHNfHnbgJJ6nK4UPx2VtTUCafAKCbqZJ6ZRYUGjoeFj
```

| part | value |
| ---- | ----- |
| Scheme | `dsnp://` |
| User Id | `78187493520` |
| Content Hash | `QmQNHNfHnbgJJ6nK4UPx2VtTUCafAKCbqZJ6ZRYUGjoeFj` |

## DSNP CID

A DSNP CID is a valid  [Content IDentifier](https://github.com/multiformats/cid) generated using the following parameters.

### Supported CID Parameters

The CID specification allows CIDs to be generated with a wide and ever-growing range of possible hashing algorithms, string encodings, and blocks.
In order for DSNP applications to interoperate, the required functionality is limited as follows:

- CID version: MUST be version 1, in order to distinguish CIDs from simple multihash values in situations where either may be used
- Hash algorithm: MUST be `sha2-256` or `blake2b-256`
- Encoding: MUST be `base58btc` or `base32`
- Codec: MUST be `dag-cbor` for data 256 KB or more; `raw` for data less than 256 KB
- Chunking: Non-leaf nodes MUST be 256 KB

The rationale for these options is to allow consuming applications to attempt to generate a matching CID from a byte stream for validation purposes without the need to reprocess the stream.
These options are intentionally aligned to interoperate with the default output of the Kubo IPFS command line utility when invoked with option `--cid-version=1`.
