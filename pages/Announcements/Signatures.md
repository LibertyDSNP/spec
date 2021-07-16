---
name: Signatures
route: /Announcements/Signatures
menu: Announcements
---

# Announcement Signature

Announcements are signed using recoverable ECDSA signatures similarly to how transactions are signed ([Ethereum Yellow Paper Appendix F](https://ethereum.github.io/yellowpaper/paper.pdf)).
The signatures use the [SECP-256k1 curve](https://link.springer.com/chapter/10.1007%2F978-3-662-44893-9_12)
and matches the signature algorithms found in the Ethereum JSON-RPC method [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign).
All parties interacting with Announcements should independently validate signatures to guard against creator impersonation.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |


## Signing an Announcement

1. Serialize all Announcement fields (except the signature field).
1. Hash the serialized string.
1. Sign the hash with an SECP-256k1 private key that is [authorized to Announce](/Identity/Overview) on the given DSNP User Id in the `fromId` field of the Announcement.

### Serialization

1. The key of each field (except the signature field) of the Announcement MUST be concatenated with the value.
1. Each concatenated field string MUST then be [sorted alphabetically](http://www.unicode.org/reports/tr10/) and concatenated.
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
\x19Ethereum Signed Message:\n64contentHash0x67890fromId0x12345urlhttps://www.projectliberty.io/
```

Serialization in hexadecimal:

```
0x19457468657265756d205369676e6564204d6573736167653a0a3634636f6e74656e74486173683078363738393066726f6d49643078313233343575726c68747470733a2f2f7777772e70726f6a6563746c6962657274792e696f2f
```

### Hashing

- MUST hash the UTF-8 serialization with [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).

#### Example

For the previous example, the resulting hexadecimal hash MUST match:

```
0x47a23e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e
```


### Signing

#### Wallet Signing

- Ethereum Wallets will do the prefix and hashing

#### Example

A signature would be unique to the signing key.
A signature of the previous example with the given private key produces:

Private Key: `0xd9d3b5afb7765ffd9f047fd0d1d9b47d4d538b6a56f1cf29dc160ab9c6d30aa3`

```
{
  v: '0x1b',
  r: '0xfb2260acfacf83bbb1fdac8a7126a14322c9163c20c6c87d7e9aac72fd15bd34',
  s: '0x6c1854bdd441e5086b3cfb64c45e78a4cff83878e92ce378ee689343214cdcd6',
}
```

The compressed form of the above being this (`r + s + v`):

```
0xfb2260acfacf83bbb1fdac8a7126a14322c9163c20c6c87d7e9aac72fd15bd346c1854bdd441e5086b3cfb64c45e78a4cff83878e92ce378ee689343214cdcd61b
```

## Validating a Signature

1. Repeat the serialization above.
1. Perform [elliptic curve recovery](https://web.archive.org/web/20170921160141/http://cs.ucsb.edu/~koc/ccs130h/notes/ecdsa-cert.pdf) with the serialization and signature.
1. Find the [Identity Contract](/Identity/Overview) for the given `fromId`.
1. Test the recovered Ethereum address against the Identity Contract via `IDelegation.isAuthorizedTo` with the permission `ANNOUNCE`.

#### Example

Given the message and signature provided in the previous examples, the elliptic curve recovery MUST match the following Ethereum address:

```
0x59DAD64610319200800D7A9b5259B7CbA937cc12
```

## Non-Normative

### Ethereum Wallets

Ethereum wallets can use the JSON-RPC method [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign)
to go directly from announcement serialization sans-prefix to signature.
The Announcement Signature specification matches this signature algorithm.
