# DSNP Messages
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Table of Contents
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
* Posting messages is via Ethereum log events
* Signature algorithm is secp256k1 which enables `ecreover` to get public keys

## DSNP Message Formats
We have considered two possibilities, independent message formats based on action type, and a unified message format.

### Separated Message Format
This format is the current preference.

* All actions are posted to chain with some or all pertinent information about the action
* Different information is posted depending on the action.
* **Advantages**
    * can index many actions without requesting off-chain data
    * can validate most actions without requesting off-chain data
    * can archive some actions without requesting off-chain data
* **Disadvantages**
    * more data (likely more costly up front) than a simple URI

#### Log message format
| field | description | type |
|-------|-------------|------|
| topic | Ethereum log topic | bytes|
| fromAddress | social identity |bytes |
| actionType | DSNP action type |number/enum |
| DSNPMessageData | serialized, compressed message| bytes |


### DSNP action types
#### Post
Public post (was Announcement)

| field     | description | type |
|-------    |-------------| ----|
| inReplyTo | content hash | bytes
| hash      | content hash |  bytes
| uri       | content uri | bytes

#### Drop
Dead drop message

| field | description | type
|-------|-------------| ---|
| ddid | dead drop id |  bytes
| uri  | content uri  |  bytes
| hash | content hash |  bytes

#### GraphChange
public follow/unfollow

| field | description | type
|-------|-------------| ---|
|address  | social identity|  bytes
|actionType | follow/unfollow| number/enum

#### PrivateGraphChange
private follow/unfollow

| field | description | type
|-------|-------------| ---|
|bytes | encrypted follow/unfollow action | bytes

#### Inbox
| field | description | type
|-------|-------------| ---|
|hash string | content hash | bytes
|uri  | content uri  | bytes

#### KeyList, PrivateGraphKeyList, EncryptionKeyList
Keylist rotation

| field | description | type
|-------|-------------| ---|
|keylist | new list of valid keys | [bytes]

#### Profile
Profile updates such as name or icon change

| field | description | type
|-------|-------------| ---|
|name | new name | bytes
|iconUri| profile icon uri  |bytes
|hash | content hash |   bytes

#### Reaction
visual reply to a post

| field | description | type
|-------|-------------| ---|
|emoji | the encoded reaction  | number
|inReplyTo | message ID the reaction is for |  bytes

### Unified Message Format
This is currently not the recommended solution but is presented as a comparison.

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
