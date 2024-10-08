# DSNP Over Frequency

## Language and Framework
Frequency is a Polkadot Parachain written in Rust, using the Substrate framework.

- [Frequency Website](https://www.frequency.xyz)
- [Frequency GitHub](https://github.com/LibertyDSNP/frequency)
- [Frequency Documentation](https://docs.frequency.xyz)
- [Frequency Rust Documentation](https://frequency-chain.github.io/frequency/)
- Helpful Links
  - [Getting Started - Polkadot Wiki](https://wiki.polkadot.network/docs/getting-started)
  - [Parachains - Polkadot Wiki](https://wiki.polkadot.network/docs/learn-parachains)
  - [Substrate Rust Docs](https://paritytech.github.io/substrate/master/)
  - [Rust-lang.org](https://www.rust-lang.org/)


## DSNP Over Frequency Schemas
Official schemas may be found in [GitHub](https://github.com/LibertyDSNP/schemas).

<!-- These ids are duplicated here for quick reference. -->

| Name | Schema Name | Schema Id Mainnet | Schema Id Testnet (Paseo) |
| --- | --- | --- | --- |
| [Tombstone](./Publishing.md) | `dsnp.tombstone` | 16 | 16 |
| [Broadcast](./Publishing.md) | `dsnp.broadcast` | 17 | 17 |
| [Reply](./Publishing.md) | `dsnp.reply` | 18 | 18 |
| [Reaction](./Publishing.md)| `dsnp.reaction` | 4 | 4 |
| [Update](./Publishing.md)| `dsnp.update` | 19 | 19 |
| [Key Agreement Public Keys](./UserData.md)| `dsnp.public-key-key-agreement` | 7 | 7 |
| [Public Follows](./UserData.md)| `dsnp.public-follows` | 8 | 8 |
| [Private Follows](./UserData.md) | `dsnp.private-follows` | 9 | 9 |
| [Private Connections](./UserData.md) | `dsnp.private-connections` | 10 | 10 |
| [Assertion Method Public Keys](./UserData.md) | `dsnp.public-key-assertion-method` | 14 | 14 |
| [Profile Resources](./UserData.md) | `dsnp.profile-resources` | 15 | 15 |
| [User Attribute Set](./Publishing.md) | `dsnp.user-attribute-set` | 20 | 20 |
| [DSNP Content Attribute Set](./Publishing.md) | `dsnp.dsnp-content-attribute-set` | 12 | 12 |
| [External Content Attribute Set](./Publishing.md) | `dsnp.ext-content-attribute-set` | 13 | 13 |

<!--
### Obsolete

| Name | Mainnet Block Obsoleted | Schema Id Mainnet | Schema Id Testnet (Paseo) |
| --- | --- | --- | --- |
| TBD | TBD | 0 | 0 |

-->

<!--- Uncomment for pre-release changes
## Prerelease Changelog

- [DIP-###](https://github.com/LibertyDSNP/spec/issues/###)

--->

| Last Update Date | Frequency Release | DSNP Version |
| --- | --- | --- |
| 2024-09-20 | 1.13.0+ | 1.3.0 |
