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

For encrypted messages, the encrypted bytes of the `dsnpData` field can be hashed directly without any serialization.
For non-encrypted messages, each key-value pair in the `dsnpData` object should be concatenated in alphabetical order with no separator characters.

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
contentHash0x67890fromAddress0x12345urihttps://www.projectliberty.io/
```

This would be the expected hash:

```
0x45c42591e0154088325055f26664002bf05f211db9e5d7c7bfc588dc309698e0
```

And the generated signature would be a string unique to the signing user's keys but looking something like this:

```
LJbwyo6oxKd2GRxsUFwxUN1YwBzE9UC4WPvScsh0+vALkocQn60QjgkNd9CB0JUKfVTQdOlTm5gzaengzgmhDw==
```

## Verifying Messages

Verifying announcements can be done by repeating the serialization and hashing steps from the signing process then validating the generated hash against the publishing user's public key.
The user's public key can be fetched from the Identity contract as described in the [Identity spec](/Identity/Overview).

Given the message and signature provided in the previous example, the following public key should return true when verifying:

```
+IUGiZsGHq+3s/Zgxl8TQMRgydvsOX1hUwMzHykoqGw=
```
