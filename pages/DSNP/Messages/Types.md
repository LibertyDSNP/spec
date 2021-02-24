---
name: Message Types
---

# Message Types

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. List valid message types and their [DSNP Message](/DSNP/DSNP-Messages) type assigned enumeration
1. Facilitate use of SDK
1. Facilitate interpretation of on-chain data and message results
1. Estimate data size


## Assumptions
* All assumptions from [DSNP Messages](/DSNP/DSNP-Messages)
* Message types are preset, but the DSNP Message contract will be upgradeable to allow more types.
* Message type values outside the contract presets are invalid

| name     | route | description | value |
|-------   |-------------|-------------| ----|
| Private | Personal Route ID | message and message type are private; message data is encrypted | 0 |
| GraphChange | Personal Route ID | follow or unfollow an account | 1 |
| Broadcast | Sender's ID | a public post | 2 |
| Reply | Message ID | a public reply | 3 |
| Profile | Sender's ID | a Profile change | 4 |
| KeyList | Personal Route ID | KeyList rotation | 5 |
| PrivateGraphKeylist | Personal Route ID | PrivateGraph keylist rotation | 6 |
| EncryptionKeyList | Personal Route ID | Encryption keyList rotation | 7 |
| Reaction | Message ID | a public visual reply to a Broadcast | 8 |
| PrivateGraphChange | Personal Route ID | an encrypted follow or unfollow | 9 |
| Drop | Dead Drop ID | a dead drop message | 10 |
| EncryptedInbox | Receiver's ID | an encrypted direct message | 11 |
| PrivateBroadcast | TBD | an encrypted broadcast | 12 |

## Private Messages
If it's not desired to specify a message type, use the `Private` value as the message type.

Note that a Drop, i.e. a dead drop message cannot be made private with this message, since the dead drop ID, which is a necessary shared secret for decryption, would not be available.

See [DSNP Message Serialization](/DSNP/DSNP-Message-Serialization) for more detail
