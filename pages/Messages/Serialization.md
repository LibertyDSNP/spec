---
name: Serialization
route: /Messages/Serialization
menu: Messages
---

# Message Serialization

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose
1. Describe the form and method of DSNP message serialization for posting messages in Ethereum logs.
1. Facilitate use of SDK

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)
* Content may be compressed where feasible
* Serialization is in JSON (highly subject to change)

### Note on Serialization method
During early development we are using plain JSON for serialization, however, this is unlikely to remain the case. Possibilities:
* [RLP (Recursive Length Prefix)](https://eth.wiki/en/fundamentals/rlp)
* [eth2 serialization](https://ethresear.ch/t/blob-serialisation/1705), which is a proposal that is planned to replace RLP.
* [CBOR (Concise Binary Object Representation)](https://en.wikipedia.org/wiki/CBOR)
* MessagePack
* Protobuf
* BSON
* SQLite

## Serializing Identifiable Messages
Identifiable messages are those with a DSNP Message Type other than `Private`.  They may still be private messages, but it's known what _type_ of message it is.

1. Serialize the message, as with this GraphChange, which is a follow of address `0x3c0ffee5`:
    ```json
    {
        "address": "0x3c0ffee5",
        "actionType": 0
    }
    ```
1. Post the log event with parameters `topic`, `dsnpType`, and `dsnpData`:
    ```javascript
    DSNPMessage("21734c56962501651bc24175682569d541893b6b320e149bacf1141de937dad7",
                1,
                '{"address":"0x3c0ffee5","actionType":0')
    ```


## Serializing Private Messages
If it's not desired to provide the message type, use the Private message type value, and provide the actual message type in the data format. The types of messages that are best suited for the `Private` type are those which would need to be viewed only by the user, that is:

* GraphChange
* Profile
* KeyList
* PrivateGraphKeylist
* EncryptionKeyList

It's also possible to use this for Inbox and Broadcast messages, however, any client that does this would need to listen to all messages and try to decrypt them to see if they have access, so it is not recommended.

Rather than using one of the private/encrypted DSNP message types, instead wrap the serialized data and include the public message type, as in this uncompressed example for a Profile change message:

```json
{
  "dsnpType": 3,
  "dsnpData": {
    "uri": "http://www.placekitten.com/400/600",
    "messageID": "0x8c83cac8226fb6cbb05755139ee361b37554553e1851e0f2f3327ee97e26219f"
  }
}
```

The messageID here is the keccak-256 hash of what is supposed to be at `uri`, for validation purposes.

This JSON object would then be compressed and encrypted, then added to a Private type DSNP message. The hash supplied for the actual DSNP message is the hash of the encrypted compressed data.

The DSNP message object would look something like this:
```json
{
  "dsnpType": 0,
  "messageID": "0x4dda635953920eb0b1e3725a084fce713458bcfd9d75bf43bfbb96443680628c",
  "dsnpData": "GyA5NTRM34AqyNc/bK9YAoLGBVFMac4FR92xtxyK1SacVg6lICgZ82uSXAYcHHrkfDN+douVwQDVtAkbABHg0g=="
}
```

The messageID in the Private message is the hash of the dsnpData field.

Thus the decrypted message data is nothing more than a Profile message wrapped in an object, plus a message type.

**NOTE:** Dead drop messages (Drop), cannot be made private this way. The dead drop ID, which is a necessary shared secret for decryption, would not be available.

### Hash validity
Where ever there is a messageID, as stated earlier it means a keccak-256 hash of the content at the referenced URI. This hash cannot be checked at the contract level for validity, in the sense of being actually the hash of the URI content, however it is not allowed to be either zero length or 256 zeroes.

The one exception would be if is decided that Replies are separate types from other Broadcast messages; in such case an "original post" is one that has a "zero hash" for its inReplyTo field.
