# Announcement Signatures

Announcements are signed using recoverable ECDSA signatures similarly to how transactions are signed ([Ethereum Yellow Paper Appendix F](https://ethereum.github.io/yellowpaper/paper.pdf)).
The signatures use the [SECP-256k1 curve](https://link.springer.com/chapter/10.1007%2F978-3-662-44893-9_12)
and matches the signature algorithms found in the Ethereum JSON-RPC method [`eth_sign`](https://eth.wiki/json-rpc/API#eth_sign).
All parties interacting with Announcements should independently validate signatures to guard against creator impersonation.


## Signing an Announcement

1. Serialize all Announcement fields (except the signature field).
1. Hash the serialized string.
1. Sign the hash with an SECP-256k1 private key that is [authorized to Announce](Ethereum/Identity.md) on the given DSNP User Id in the `fromId` field of the Announcement.

### Serialization

1. The key of each field (except the signature field) of the Announcement MUST be concatenated with the value.
1. Each concatenated field string MUST then be [sorted alphabetically](http://www.unicode.org/reports/tr10/) and concatenated.
1. Prefix the alphabetized concatenated string with the [Ethereum RPC prefix](https://eth.wiki/json-rpc/API#eth_sign) (`\x19Ethereum Signed Message:\n`) and the byte length of the string.

*Note: If signing with a wallet, the [Ethereum RPC prefix](https://eth.wiki/json-rpc/API#eth_sign) will be added by the wallet.*

#### Example

| Field | Value |
| --- | --- |
| announcementType | `1` |
| contentHash | `0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658` |
| createdAt | `1627726272000` |
| fromId | `74565` |
| url | `https://www.dsnp.org/` |

Expected serialization:

```
\x19Ethereum Signed Message:\n64announcementType1contentHash0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658createdAt1627726272000fromId74565urlhttps://www.dsnp.org/
```

Serialization in hexadecimal:

```
0x19457468657265756d205369676e6564204d6573736167653a0a313531616e6e6f756e63656d656e745479706531636f6e74656e74486173683078396332326666356632316630623831623131336536336637646236646139346665646566313162323131396234303838623839363634666239613363623635386372656174656441743136323737323632373230303066726f6d4964373435363575726c68747470733a2f2f7777772e64736e702e6f72672f
```

### Hashing

- MUST hash the UTF-8 serialization with [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).

#### Example

For the previous example, the resulting hexadecimal hash MUST match:

```
0xabaae4d8fda61c1b9cf481ef784158ebae5cea36f5cb7d1242987553a6dc6aa8
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
  r: '0x2e05b0f769b0344a58a06718f90f5d605878b6d5e9e14e1f235de24b399cfe42',
  s: '0x7135a0b704862a8bc2847c4bb9f78bb43f707d427f0ba19bb43f66d5666934c9',
}
```

The compressed form of the above being this (`r + s + v`):

```
0x2e05b0f769b0344a58a06718f90f5d605878b6d5e9e14e1f235de24b399cfe427135a0b704862a8bc2847c4bb9f78bb43f707d427f0ba19bb43f66d5666934c91c
```

## Recovering a Signer's Ethereum Address

1. Repeat the serialization above.
1. Perform [elliptic curve recovery](https://web.archive.org/web/20170921160141/http://cs.ucsb.edu/~koc/ccs130h/notes/ecdsa-cert.pdf) with the serialization and signature.

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
