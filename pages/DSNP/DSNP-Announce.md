# DSNP Announce
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose
1. Describe the method to announce [DSNP Messages](/DSNP/DSNP-Messages) to the blockchain.
1. Provide Solidity code examples (pending final contract)
1. Facilitate use of SDK and locating of on-chain data

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover`
  to get public keys. A public key also need not be included in a log event for ease of validation.
* content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.

## DSNP Announce

### DSNPMessage Event

The DSNPMmessage event is a standard event topic to be used for all DSNP Messages.

```solidity
interface DSNPAnnounce {
    event DSNPMessage(address dnspFrom, uint16 dsnpType, bytes[] dnspData);
}
```

| field | description | type |
|-------|-------------|------|
| dnspFrom | Social Identity From Address | address / uint160 / bytes20 |
| dsnpType | Enum from [DSNP Message Types](/DSNP/DSNP-Message-Types) | unit16 |
| data | Matching serialized data from [DSNP Messages](/DSNP/DSNP-Messages) | bytes |

### Event Topic

The event topic for DSNPMessage follows the standard Solidity event name to hash standard.
```
0x98aa3317938b163d794c4cf04dce050dbf5b96a939a7387b4b7c38f3cafcbf06 = keccak-256("DSNPMessage(from,uint16,bytes32)")
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