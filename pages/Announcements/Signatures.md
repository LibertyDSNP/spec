---
name: Signatures
route: /Announcements/Signatures
menu: Announcements
---

# Announcement Signature

To prove creator authenticity, all Announcements have a [secp256k1](/REPLACEME) signature.
All parties interacting with Announcements should independently validate signatures to guard against creator impersonation.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Assumptions

This signature should be generated from the [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf) hash of the announcement and the publishing user's private key.
Optionally, anonymous messages may be provided with a zero hash in place of the signature, however behavior for these messages is undefined, and they may be treated as invalid data by archivists or disregarded as spam by indexers or end clients.


## Signing an Announcement

1. Serialize all Announcement fields (except the signature field).
1. Hash the serialized string.
1. Sign the hash with a private key that is [authorized to Announce](/Identity/Overview) on the given DSNP User Id in the `fromId` field of the Announcement.

### Serialization

1. The key of each field (except the signature field) of the Announcement MUST be concatenated with the value.
1. Each concatenated field string MUST then be [sorted alphabetically](/REPLACEME) and concatenated.
1. Prefix the alphabetized concatenated string with the [Ethereum RPC prefix](https://eth.wiki/json-rpc/API#eth_sign) (`\x19Ethereum Signed Message:\n`) and the byte length of the string.

*Note: If signing with a wallet, the [Ethereum RPC prefix](https://eth.wiki/json-rpc/API#eth_sign) will be added by the wallet.*

#### Example

```json
{
  "fromId": "0x12345",
  "contentHash": "0x67890",
  "url": "https://www.projectliberty.io/"
}
```

Expected serialization:

```
\x19Ethereum Signed Message:\n65contentHash0x67890fromId0x12345urlhttps://www.projectliberty.io/
```

### Hashing

- MUST hash the serialization with [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).

#### Note

The `\x19` is NOT a string, but bytes.
Take the rest of the string and convert to bytes, then prefix with `19`.

#### Example

For the previous example, the resulting hexadecimal hash MUST match:

```
0x6ad0d59e6d5f7aaee5998e5d584d8c55a3c01f09bf0f5b4c49b2399eca22a82a
```


### Signing

#### Wallet Signing

- Ethereum Wallets will do the prefix and hashing

#### Example

A signature would be unique to the signing key.
A signature of the previous example with the given private key produces:

Private Key: ``

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

## Validating a Signature

1. Repeat the serialization above.
1. Perform [elliptic curve recovery](/REPLACEME) with the serialization and signature.
1. Find the [Identity Contract](/Identity/Overview) for the given `fromId`.
1. Test the recovered Ethereum address against the Identity Contract via `IDelegation.isAuthorizedTo` with the permission `ANNOUNCE`.

#### Example

Given the message and signature provided in the previous example, the elliptic curve recovery should match the following Ethereum address:

```
0x60b5Af7F23489339acBA7B1c85171Ef9D8f4A1d1
```
