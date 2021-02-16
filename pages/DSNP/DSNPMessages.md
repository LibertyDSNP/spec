# DSNP Messages
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. Describe the form and content of DSNP Messages posted to the blockchain used for all Liberty Platform activities. Only some of these activities will have the full message posted to chain. Examples:
    * Announcements (profile changes, public posts, reactions)
    * Direct messages between accounts (dead drop, inbox)
    * Key changes (private graph keylist, encryption keylist, public key rotation)
    * Graph changes (follow/unfollow)
1. Specify an on-chain message formatProvide data size estimations
1. Facilitate use of SDK and interpretation of on-chain data

## Assumptions
* Chain messages are on Ethereum
* Message data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378)
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use `ecreover` 
  to get public keys. A public key also need not be included in a log event for ease of validation. 

## DSNP Message Formats
We have considered two possibilities, a [variable message format](#Variable-Message-Format), and a [unified message format](#unified-message-format).

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
| DSNPType | DSNP message type |number/enum |
| DSNPData | serialized, compressed message data| bytes |


### DSNP Messages
These messages would be serialized and compressed and emitted in the log event as the `DSNPData` field.

**Broadcast:** a public post (was Announcement)

| field     | description | type |
|-------    |-------------| ----|
| inReplyTo | content hash | bytes
| hash      | content hash |  bytes
| uri       | content uri | bytes

**Drop:** a dead drop message

| field | description | type
|-------|-------------| ---|
| ddid | dead drop id |  bytes
| uri  | content uri  |  bytes
| hash | content hash |  bytes

**GraphChange:** a public follow/unfollow

| field | description | type
|-------|-------------| ---|
|address  | social identity|  bytes
|actionType | follow/unfollow| number/enum

**KeyList, PrivateGraphKeyList, EncryptionKeyList:** a keylist rotation

| field | description | type
|-------|-------------| ---|
|keylist | new list of valid keys | [bytes]

**Inbox:** a direct message

| field | description | type
|-------|-------------| ---|
|hash string | content hash | bytes
|uri  | content uri  | bytes

**Profile:** a profile update such as name or icon change

| field | description | type
|-------|-------------| ---|
|name | new name | bytes
|iconUri| profile icon uri  |bytes
|hash | content hash |   bytes

**EXCLUDED for testnet:**

**PrivateGraphChange:** a private follow/unfollow

| field | description | type
|-------|-------------| ---|
|bytes | encrypted follow/unfollow action | bytes

**Reaction:** a visual reply to a post

| field | description | type
|-------|-------------| ---|
|emoji | the encoded reaction  | number
|inReplyTo | message ID the reaction is for |  bytes


### Unified Message Format
This is currently not the recommended solution, but is presented as a comparison.

* All actions are posted to the chain with some pertinent information about the action
* The same information is posted regardless of action
* The rest of the information for the action is stored off chain.
* **Advantages**
    * less data on chain --> lower up-front costs and lower node storage requirements
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
