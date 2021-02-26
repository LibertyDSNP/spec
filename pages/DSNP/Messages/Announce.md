# DSNP Announce
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose
1. Describe the method to announce [DSNP Messages](/DSNP/Overview) to the blockchain.
1. Provide Solidity code examples (pending final contract)
1. Facilitate use of SDK and locating of on-chain data

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover`
  to get public keys. A public key also need not be included in a log event for ease of validation.
* content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.

## DSNP Announce

### DSNPBatch Event

The DSNPBatch event is a standard event topic to be used for announcing a location that a list of [DSNP Messages](/DSNP/DSNP-Messages) can be found.

```solidity
interface DSNPAnnounce {
    event DSNPBatch(bytes32 dsnpHash, bytes[] dsnpUri);
}
```

| field | description | type |
|-------|-------------|------|
| dsnpHash | Keccak-256 hash of each hash included in the batch | bytes32 |
| dsnpUri | Uri containing the batch file matching [DSNP Messages](/DSNP/Overview) | bytes |


### Event Topic

The event topic for DSNPBatch follows the standard Solidity event name to hash standard.
```
0xb4ac029c8b5c911494e703c67200023f015b73f7b42c3cb4b580b5588fac2d10 = keccak-256("DSNPBatch(bytes32,bytes[])")
```

### Announce Requirements

| Interface | Required |
|-----------|----------|
| DSNPAnnounce | Required |
| [ERC165](https://eips.ethereum.org/EIPS/eip-165) | Optional |

## Default Announce Contract

An open public announce contract will be available for anyone to use.
The contract address and link to code to be updated here once completed.

### Address

| Network | Address |
|---------|---------|
| testnet | tbd |
| Beta Mainnet | tbd |