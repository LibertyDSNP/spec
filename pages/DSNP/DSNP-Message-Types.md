# DSNP Message Types
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. List valid message types and their [DSNP Message](DSNP-Messages.md) type assigned enumeration
1. Facilitate use of SDK 
1. Facilitate interpretation of on-chain data and message results
1. Estimate data size


## Assumptions
* All assumptions from [DSNP Messages](DSNP-Messages.md)
* Message types are preset, but the DSNP Message contract will be upgradeable to allow more types.
* Message type values outside the contract presets are invalid

| name     | description | value |
|-------    |-------------| ----|
| Private | message and message type are private; message data is encrypted | 0 |
| GraphChange | follow or unfollow an account | 1 |
| Broadcast | a public post or reply | 2 |
| Profile | a Profile change | 3 |
| KeyList | KeyList rotation | 4 |
| PrivateGraphKeylist | PrivateGraph keylist rotation | 5 |
| EncryptionKeyList | Encryption keyList rotation | 6 |
| Reaction | a public visual reply to a Broadcast | 7 |
| PrivateGraphChange | an encrypted follow or unfollow | 8
| Drop | a dead drop message | 9
| EncryptedInbox | an encrypted direct message | 10
| PrivateBroadcast | an encrypted broadcast | 11

## Private Messages
If it's not desired to specify a message type, use the `Private` value as the message type.

Note that a Drop, i.e. a dead drop message cannot be made private with this message, since the dead drop ID, which is a necessary shared secret for decryption, would not be available.
                                                 
See [DSNP Message Serialization](./DSNP-Message-Serialization.md) for more detail
