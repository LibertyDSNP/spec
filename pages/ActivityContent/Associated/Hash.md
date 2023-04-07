# Associated Type: Hash

*NOT* part of the Activity Streams 2.0 Vocabulary.

Activity objects linking to external content such as audio, image or video files must include a `"hash"` field for users to validate linked content.
The value of this `"hash"` field must be an array of strings, each representing a hash output using a specific algorithm.
AT LEAST ONE hash in the array MUST be one of the [supported algorithms](#supported-algorithms), although others may also be used.

Hashes MUST be encoded using the [multihash](https://github.com/multiformats/multihash) specification, and serialized as a [multibase](https://github.com/multiformats/multibase) string.

### Supported Algorithms

| Algorithm | Multihash Name | Leading bytes (as [varint](https://github.com/multiformats/unsigned-varint)) | Reference | DSNP Version Added |
| --- | --- | --- | --- | --- |
| SHA-256 | `sha2-256` | `0x1220` | [RFC 6234](https://tools.ietf.org/html/rfc6234) | 1.2.0 |
| BLAKE2b | `blake2b-256` | `0xa0e40220` | [RFC 7693](https://tools.ietf.org/html/rfc7693) | 1.2.0 |

### Example

This example gives SHA-256 and BLAKE2b hashes for the [PDF version of the DSNP whitepaper](https://github.com/LibertyDSNP/papers/raw/main/whitepaper/dsnp_whitepaper.pdf).

```json
{
  "hash": [
    "QmQNHNfHnbgJJ6nK4UPx2VtTUCafAKCbqZJ6ZRYUGjoeFj",
    "2DrjgbGgSsXRhTiBWckoVwBFC6H4qiBWWNumSsRwdUt82YnTdN"
  ]
}
```
