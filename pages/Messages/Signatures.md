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

1. Serialize the DSNP announcement, if not encrypted
1. Hash the serialized string
1. Sign the hash

To serialize messages, objects must first be converted to a string then prepended with the standard [Ethereum RPC prefix](https://eth.wiki/json-rpc/API#eth_sign).
To convert messages to a string, each key of the DSNP object should be concatenated with its value in alphabetical order.
Once converted, the string must be prefixed with "\x19Ethereum Signed Message:\n" and the byte length of the string.

Once the data is serialized, the serialized string should be hashed using [keccak-256](https://en.wikipedia.org/wiki/SHA-3).
This fixed length hash generated can then be signed using [secp256k1](https://google.com/search?hl=en&q=secp256k1) and the publishing user's private key.
The resulting signature should be provided along with the message contents to the announcer for inclusion in the next available batch.

For example, given the following DSNP broadcast message:

```json
{
  "fromAddress": "0x12345",
  "contentHash": "0x67890",
  "uri": "https://www.projectliberty.io/"
}
```

This would be the expected serialization:

```
\x19Ethereum Signed Message:\n69contentHash0x67890fromAddress0x12345urihttps://www.projectliberty.io/
```

This would be the expected hash:

```
0x6ad0d59e6d5f7aaee5998e5d584d8c55a3c01f09bf0f5b4c49b2399eca22a82a
```

And the generated signature would be a string unique to the signing user's keys but looking something like this:

```
{
  v: "0x1c",
  r: "0x60548fc39c248a6cbcf085854238c6cf66d44ab16a64faace38bf3f03f42400f",
  s: "0x4b0cf86049606203f0334cdc0118d4b09244881dd22d3722e618648469defcc7"
}
```

The compressed form of the above being this:

```
0x60548fc39c248a6cbcf085854238c6cf66d44ab16a64faace38bf3f03f42400f4b0cf86049606203f0334cdc0118d4b09244881dd22d3722e618648469defcc71c
```

## Verifying Messages

Verifying announcements can be done by repeating the serialization and hashing steps from the signing process then validating the generated hash against the publishing user's public key.
The user's public key can be fetched from the Identity contract as described in the [Identity spec](/Identity/Overview).

Given the message and signature provided in the previous example, the elliptic curve recovery should match the following ETH address:

```
0x60b5Af7F23489339acBA7B1c85171Ef9D8f4A1d1
```
