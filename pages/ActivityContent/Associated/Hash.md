# Associated Type: Hash

*NOT* part of the Activity Streams 2.0 Vocabulary.

Activity objects linking to external content such as audio, image or video files must include a `"hash"` field for users to validate linked content.
The value of this `"hash"` field must be an array of strings.
Each item in the array MUST be a valid [DSNP Content Hash](../../DSNP/Identifiers.md#dsnp-content-hash) for the content associated with the hash.

### Example

This example gives SHA-256 and BLAKE3 hashes for the [PDF version of the DSNP whitepaper](https://github.com/LibertyDSNP/papers/raw/main/whitepaper/dsnp_whitepaper.pdf).

```json
{
  "hash": [
    "bciqgb7tvyyqn6tw4amtdj7funn5ockup6ldrkap4o5ubd77od6awi4y",
    "bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna"
  ]
}
```
