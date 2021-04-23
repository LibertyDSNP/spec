---
name: Signatures
route: /Messages/Signatures
menu: Messages
---

# Message Signatures

All DSNP announcements provided for batching should include a [secp256k1](https://google.com/search?hl=en&q=secp256k1) signature for the purposes of verifying the authenticity of the message.
This signature should be generated from the [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the announcement and the publishing user's private key.
Optionally, anonymous messages may be provided with a zero hash in place of the signature, however behavior for these messages is undefined, and they may be treated as invalid data by archivists or disregarded as spam by indexers or end clients.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose
1. Describe the process of signing DSNP announcements for inclusion in batches
1. Describe the process of verifying DSNP announcements from batches

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)

## Signing Messages

The process for generating signatures for DSNP announcements consists of three distinct steps:

1. Serialize the DSNP announcement
1. Hash the serialized string
1. Sign the hash

Before serializing, keys in the DSNP object should be sorted alphabetically using [default JavaScript string comparison](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Collator) order.
Serialization should be done as described in the [Serialization spec](/Identity/Serialization).
Next, the serialized string should be hashed using [keccak-256](https://en.wikipedia.org/wiki/SHA-3).
Finally, the fixed length hash generated can then be signed using [secp256k1](https://google.com/search?hl=en&q=secp256k1) and the publishing user's private key.

Once the signature is generated, it should be provided along with the message contents to the announcer for inclusion in the next available batch.

## Verifying Messages

Verifying announcements can be done by repeating the serialization and hashing steps from the signing process then validating the generated hash against the publishing user's public key.
The user's public key can be fetched from the Identity contract as described in the [Identity spec](/Identity/Overview).
