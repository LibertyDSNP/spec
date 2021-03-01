---
name: Messages
---

# Messages Overview

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. Describe the form and content of DSNP Messages posted to the blockchain used for all Liberty Platform activities. Only some of these activities will have the full message posted to chain. Examples:
    * Public messages (profile changes, public posts, reactions)
    * Direct messages between accounts (dead drop, inbox)
    * Key changes (private graph keylist, encryption keylist, public key rotation)
    * Graph changes (follow/unfollow)
1. Specify an on-chain message format
1. Provide data size estimations
1. Facilitate use of SDK and interpretation of on-chain data

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover`
  to get public keys. A public key also need not be included in a log event for ease of validation.
* content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.  

## DSNP Message Formats
We have seriously considered two possibilities, a [variable message format](#Variable-Message-Format), and a [unified message format](#unified-message-format).  Others are listed at the end of this page.

###  Variable Message Format
This format is the current preference.

* All actions are posted to chain with some or all pertinent information about the action
* Different information is posted depending on the action.
* **Advantages**
    * can index all actions without requesting off-chain data
    * can validate most actions without requesting off-chain data
    * can archive some actions without requesting off-chain data
* **Disadvantages**
    * more data (likely more costly up front) than a simple URI

**Log message format **

This is what would be posted as a Log event in Ethereum:

| field | description | type |
|-------|-------------|------|
| topic | Ethereum log topic | bytes|
| fromAddress | social identity |bytes |
| dsnpType | DSNP message type |number/enum |
| dsnpData | serialized, possibly compressed message data| bytes |

#### Some other options:
* Emit no topic, have a single contract that subscribers watch for events from.  Subscribers can perform filtering based on the `dsnpTopic` field.
* The topic is the dsnpType (possibly not an enum).  Subscribers could listen for desired topics.

### DSNP Messages
These messages would be serialized, compressed where feasible, and emitted in the log event as the `DSNPData` field.

For details on how messages are serialized, see [DSNP Message Serialization](/DSNP/DSNP-Message-Serialization)

#### Broadcast
a public post (was Announcement)

| field     | description | type |
|-------    |-------------| ----|
| inReplyTo | messageID replied to | bytes32
| messageID | keccak-256 hash of content stored at uri |  bytes32
| uri       | content uri | bytes


**NOTE** If origin broadcasts and replies stay the same type, inReplyTo is allowed to be blank.  If replies are separated into their own type, the inReplyTo field here will be dropped.

#### Drop
a dead drop message

| field | description | type
|-------|-------------| ---|
| ddid | dead drop id |  bytes
| uri  | content uri  |  bytes
| messageID | keccak-256 hash of content |  bytes32

#### GraphChange
a public follow/unfollow

| field | description | type
|-------|-------------| ---|
|address  | social identity|  bytes
|actionType | follow/unfollow| number/enum

#### KeyList, PrivateGraphKeyList, EncryptionKeyList

a keylist rotation

| field | description | type
|-------|-------------| ---|
|keylist | new list of valid keys | [bytes]

#### Inbox
a direct message

| field | description | type
|-------|-------------| ---|
|messageID | keccak-256 hash of content | bytes32
|uri  | content uri  | bytes

#### EncryptedInbox
an encrypted direct message.  This describes the format once decrypted.  Possibly combine both of these and expect that all Inbox messages are encrypted.

| field | description | type
|-------|-------------| ---|
|messageID | keccak-256 hash of content | bytes32
|uri  | content uri  | bytes

#### Reaction
a visual reply to a post

| field | description | type
|-------|-------------| ---|
|emoji | the encoded reaction  | number
|inReplyTo | messageID the reaction is for |  bytes32

### Possible Message Types

#### Profile
a profile update such as name or icon change

| field | description | type
|-------|-------------| ---|
|uri    | uri for the profile data  |bytes
| messageID |  keccak-256 hash of content at uri | bytes32


#### Private
An encrypted message of unknown type. See [DSNP Message Types: Private Messages](/DSNP/DSNP-Message-Types#private-messages) for details.

| field | description | type
|-------|-------------| ---|
| data | encrypted graph change data | bytes
| messageID | keccak-256 hash of unencrypted content | bytes32

#### PrivateBroadcast
An encrypted Broadcast decipherable by specific accounts . This describes the format once decrypted.

| field     | description | type |
|-------    |-------------| ----|
| inReplyTo | messageID replied to | bytes32
| messageID      | keccak-256 hash of content stored at URI |  bytes32
| uri       | content uri | bytes

#### Reply
This is a message type that would allow a Broadcast to drop the `inReplyTo` field.  In such case a Reply is exactly like Broadcast above, but `inReplyTo` is not allowed to be blank.


### Unified Message Format
This is currently not the recommended solution, but is presented as a comparison.

* All actions are posted to the chain with some pertinent information about the action
* The same information is posted regardless of action
* The rest of the information for the action is stored off chain.
* **Advantages**
    * less data on chain --> lower up-front costs and lower node storage requirements
    * privacy management is easier -- for example, "right to be forgotten" is easier to comply with since
        data is external, off-chain.
* **Disadvantages**
    * indexing requires retrieving content @ uri
    * archiving requires retrieving more content @ uri
    * validation requires retrieving more content @ uri
    * cost savings may be minimal

| field | description | type
|-------|-------------| ---|
| topic | Ethereum log topic |  bytes
| action type | the type of action | bytes
| fromAddress | social identity | bytes
| uri | uri of stored action information | bytes

### All data on chain
One possibility is not to have any data stored off-chain; instead, even the ActivityPub content would be posted to chain.
The disadvantages far outweigh the advantages:

* **Advantages**
    * Validation, indexing, discovery are much easier
* **Disadvantages**
    * This amount of data would rapidly slow down the network
    * The posting of illegal content could potentially shut down the network
    * Garbage collection, validation, privacy concerns, and dealing with illegal content become interdependent, and would pose conflicting interests.
    * Would still need archive to store at least some content
    * Unknown, likely chilling effect on incentive models

### No data except hashes on chain
Only hashes of the events are stored on chain; everything else is interpreted via API(s)