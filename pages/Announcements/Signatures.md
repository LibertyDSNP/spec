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
  "announcementType": 1,
  "fromId": "0x12345",
  "contentHash": "0x67890",
  "url": "https://www.dsnp.org/",
  "createdAt": "2021-07-31T10:11:12"
}
```

Expected serialization:

```
\x19Ethereum Signed Message:\n64announcementType0x1contentHash0x67890createdAt0x17afc0bd600fromId0x12345urlhttps://www.dsnp.org/
```

Serialization in hexadecimal:

```
0x19457468657265756d205369676e6564204d6573736167653a0a3936616e6e6f756e63656d656e7454797065307831636f6e74656e7448617368307836373839306372656174656441743078313761666330626436303066726f6d49643078313233343575726c68747470733a2f2f7777772e64736e702e6f72672f
```

### Hashing

- MUST hash the UTF-8 serialization with [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).

#### Example

For the previous example, the resulting hexadecimal hash MUST match:

```
0xe998171b9eedfe13a181aa158c7b2dbb739af9e5ca062cc5822e668be1314478
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
  v: '0x1c',
  r: '0xa34e5f6ba5f133cc1c8dfed613ad913f07dc5dff38c92278f9253c07ff43bd1d',
  s: '0x3f86a862db3db7223a2d2b530dd15cbdc450fb2394917f1f413f4a102822deca',
}
```

The compressed form of the above being this (`r + s + v`):

```
0xa34e5f6ba5f133cc1c8dfed613ad913f07dc5dff38c92278f9253c07ff43bd1d3f86a862db3db7223a2d2b530dd15cbdc450fb2394917f1f413f4a102822deca1c
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
