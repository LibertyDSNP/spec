# DSNP Message Serialization
## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. Describe the form and method of DSNP message serialization.
1. Facilitate use of SDK

## Assumptions
* All assumptions from [DSNP Messages](/DSNP/DSNP-Messages)
* Content will be compressed where feasible
* Serialization is in JSON (highly subject to change)

### Note on Serialization method
At the time of this writing, we are using JSON serialization, however, the following other formats are being seriously considered:

* compressed JSON
* [RLP (Recursive Length Prefix)](https://eth.wiki/en/fundamentals/rlp)
* [eth2 serialization] (https://ethresear.ch/t/blob-serialisation/1705), which is a proposal that is planned to replace RLP.
* [CBOR (Concise Binary Object Representation)](https://en.wikipedia.org/wiki/CBOR)

## Serializing Identifiable Messages
Identifiable messages are those with a DSNP Message Type other than `Private`.  They may still be private messages, but it's known what _type_ of message it is.

First serialize the message, as with this GraphChange, which is a follow of address `0x3c0ffee5`:
```json
{
  "dsnpMessageType": 1,
  "object": {
    "address": "0x3c0ffee5",
    "actionType": 0
  }
}
```

## Serializing Private Messages
If it's not desired to provide the message type, use the Private message type value, and provide the actual message type in the data format. The types of messages that might use the `Private` type are:

* GraphChange
* Profile  
* Inbox
* Broadcast

Rather than using one of the private/encrypted DSNP message types, instead wrap the serialized data and include the public message type, as in this uncompressed example for a Profile change message:

```json
{
  "dsnpMessageType": 0,
  "object": {
    "name": "Richard Burbage",
    "iconUri": "http://www.placekitten.com/400/600"
  }
}
```

This JSON object would then be compressed and encrypted, then added to a Private type DSNP message. The DSNP message object would look something like this:
```json
{
  "dsnpMessageType": 0,
  "hash": "0xfa8387a01234045ae381730204bb",
  "object": "GyA5NTRM34AqyNc/bK9YAoLGBVFMac4FR92xtxyK1SacVg6lICgZ82uSXAYcHHrkfDN+douVwQDVtAkbABHg0g=="
}
``` 

Thus the decrypted PrivateGraphChange is nothing more than a GraphChange wrapped in an object with a message type.

**NOTE:** Dead drop messages (Drop), cannot be made private this way. The dead drop ID, which is a necessary shared secret for decryption, would not be available.

