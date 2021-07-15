---
name: Types
route: /Messages/Types
menu: Messages
---

# Message Types

## Specification Status

| Version | Status |
---------- | ---------
| 0.1.1     | Draft |

## Purpose

1. List valid message types and their [DSNP Message](/Messages/Overview) type assigned enumeration.
1. Facilitate use of SDK.
1. Facilitate interpretation of on-chain data and message results.
1. Estimate data size.

## Assumptions

* All assumptions from [DSNP Messages](/Messages/Overview)
* Message types are preset, but the DSNP Message contract will be upgradeable to allow more types.
* Message type values outside the contract presets are invalid.

| name     | description | value |
|-------   |-------------| ----|
| Reserved | reserved for future use | 0 |
| GraphChange | follow or unfollow an account | 1 |
| Broadcast | a public post | 2 |
| Reply | a response to a Broadcast | 3 |
| Reaction | a public visual reply to a Broadcast | 4 |
| Profile | a Profile change | 5 |

## Private Messages

If it's not desired to specify a message type, use the `Private` value as the message type.

Note that a Drop, i.e. a dead drop message cannot be made private with this message, since the dead drop ID, which is a necessary shared secret for decryption, would not be available.

See [DSNP Message Serialization](/Messages/Serialization) for more detail.
