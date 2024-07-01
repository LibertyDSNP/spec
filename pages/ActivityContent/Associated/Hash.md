# Associated Type: Hash

*NOT* part of the Activity Streams 2.0 Vocabulary.

Activity objects linking to external content such as audio, image or video files must include a `"hash"` field for users to validate linked content.
The value of this `"hash"` field must be an array of strings, each representing a hash output using a specific algorithm.
Each item in the array MUST be a valid [multihash](https://github.com/multiformats/multihash) value,  serialized as a [multibase](https://github.com/multiformats/multibase) string using either the `base32` or `base58btc` encodings.
  At least one of the deserialized multihash values must be a valid [DSNP Content Hash](../../DSNP/Identifiers.md#dsnp-content-hash).

### Example

This example gives CIDv1 (serialized as `base32`), SHA-256 (serialized as `base58btc`), and BLAKE2b (serialized as `base58btc`) hashes for the [PDF version of the DSNP whitepaper](https://github.com/LibertyDSNP/papers/raw/main/whitepaper/dsnp_whitepaper.pdf).

```json
{
  "hash": [
    "bafybeida7z24mig7j3oagjru7s2gw6xbfkh7fryvah6ho2ar77xb7aleom",
    "QmQNHNfHnbgJJ6nK4UPx2VtTUCafAKCbqZJ6ZRYUGjoeFj",
    "2DrjgbGgSsXRhTiBWckoVwBFC6H4qiBWWNumSsRwdUt82YnTdN"
  ]
}
```
