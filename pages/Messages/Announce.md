---
name: Announce
route: /Messages/Announce
menu: Messages
---
# Announcing Messages

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose
1. Describe the method to announce [DSNP Messages](/Messages/Overview) to the blockchain.
1. Provide Solidity code examples (pending final contract)
1. Facilitate use of SDK and locating of on-chain data

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover`
  to get public keys. A public key also need not be included in a log event for ease of validation.
* content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.

## Announcing DSNP Events

### DSNPBatch Event

The DSNPBatch event is a standard event topic to be used for announcing a location that a list of [DSNP Messages](/Messages/Overview) can be found.

```solidity
interface IAnnounce {
    event DSNPBatch(int16 indexed dsnpType, bytes32 dsnpHash, string dsnpUri);
}
```

| field | description | type |
|-------|-------------|------|
| dsnpType | the DSNP Message Type enumeration for this Batch. See [DSNP Message Types](/Messages/Types)| int16 |
| dsnpHash | Keccak-256 hash of each hash included in the batch | bytes32 |
| dsnpUri | Uri containing the batch file matching [DSNP Messages](/Messages/Overview) | string |


### Event Topic

The event topic for DSNPBatch follows the standard Solidity event name to hash standard.
```
0xcbdadaa6a09ef0246e068fac931bf4aee2d931813b150eec3c405d88f6e225a5 = keccak-256("DSNPBatch(int16,bytes32,string)")
```

### Announce Requirements

| Interface | Required |
|-----------|----------|
| IAnnounce | Required |
| [ERC165](https://eips.ethereum.org/EIPS/eip-165) | Optional |

## Default Announce Contract

An open public announce contract will be available for anyone to use.
The contract address and link to code to be updated here once completed.

### Address

| Network | Address |
|---------|---------|
| testnet | TBD |
| Beta Mainnet | TBD |
