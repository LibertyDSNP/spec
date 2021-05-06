---
name: Format
route: /Archivists/Format
menu: Archivists
---

# Archive Storage Format

## Specification Status

| Version | Status |
---------- | ---------
| 0.2     | Tentative |

## Purpose
1. Specify the off-chain Archivist _storage_ format
1. Enable development of an application that can permanently store, or cause to be permanently store necessary
Liberty Protocol data in a uniform and systematic way.

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover`
  to get public keys. A public key also need not be included in a log event for ease of validation.
* Content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.

## Archive Entry
An archive entry is a combination of data in a DSNP message and from the block in which it is included.
It is a key-value map consisting of the following fields:

| field name | description |type |
| --- | --- | --- |
| `dsnpType` | DSNP message type |number/enum. see [DSNP Message Types](/Messages/Types) |
| `dsnpData` | DSNP message data | see fields in [DSNP Messages](/Messages/Overview) |
| `signatures` | list of signatures for this message | array of Signatures |

### `dsnpType`
* number
* Indicates what type of message this is, useful for indexers and filters.

### `dsnpData`
* varies
* This can be encrypted where approriate. The decrypted, fully deserialized version must be one of the types described in [DSNP Messages](/Messages/Overview).

### `signatures`
* array
* all the signatures applied to this message at the time of archival.

## Batch
A _Batch_ is data that is referenced by a Batch Announcement. It consists of one or more ArchiveEntries.

|field|description|type|
|---|---|---|
| `archives`| a set of ArchiveEntries | map`[ArchiveEntry]`|
| `batchID` | keccak-256 hash of content stored at URI |  bytes32
| `blockHeight` | the block number this message was included in | number |
| `fromAddress`| social identity of batch announcer,i.e. message sender | bytes |
| `logIndex` | the index within the logs of this message | number |
| `signature` | announcer's signature | Signature |
| `transactionIndex` | the index of the transaction this message is associated with | number |
| `uri` | the location of this archive | string |


### `archives`
The set of ArchiveEntries is a key-value map, with the key
being the `archiveEntryID`, which is a:

* bytes32
* The keccak-256 hash of all of the Archive Entry fields in a keccak-256 hash with the archiveEntryID field being blank.


### `batchID`
* bytes32
* the keccak-256 hash of content stored at the URI referenced in this batch.

### `blockHeight`
* number
* The block in which this DSNP Message is included.

### `fromAddress`
the social identity of the batch announcer, i.e. the message sender.

### `logIndex`
* number
* The log index in which this DSNP Message is included

### `signature`
* [Signature](#Signature) (see below)
* The signature of this batch announcer

### `transactionIndex`
* number
* The transaction index in which this DSNP Message is included

### `uri`
* string
* The permanent URI address where this archive is stored.

## Signature
A Signature consists of two fields:
* `signature` - A [secp256k1](https://en.bitcoin.it/wiki/Secp256k1) signature
* `result` - optional, bytes. A result of an operation performed. For example, if a signing entity wished to prove that they had performed some sort of validation or analysis on the message, they would put the result of the analysis in this field. It could be a meaningful number or string, some sort of proof hash, etc.

## Diagram
![Archive Messages Diagram](https://github.com/LibertyDSNP/spec/blob/c9f55041950e7f54ce07d0f32de6b35d4fa4e7c0/images/ArchiveMessages.png?raw=true)
