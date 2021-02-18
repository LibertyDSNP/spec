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
* Content may be compressed where feasible
* Serialization is in JSON (highly subject to change)

### Note on Serialization method
At the time of this writing, we are using JSON serialization, however, the following other formats are being seriously considered:

* compressed JSON
* [RLP (Recursive Length Prefix)](https://eth.wiki/en/fundamentals/rlp)
* [eth2 serialization](https://ethresear.ch/t/blob-serialisation/1705), which is a proposal that is planned to replace RLP.
* [CBOR (Concise Binary Object Representation)](https://en.wikipedia.org/wiki/CBOR)

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
If it's not desired to provide the message type, use the Private message type value, and provide the actual message type in the data format. The types of messages that might use the `Private` type are:

* GraphChange
* Profile  
* Inbox
* Broadcast

Rather than using one of the private/encrypted DSNP message types, instead wrap the serialized data and include the public message type, as in this uncompressed example for a Profile change message:

```json
{
  "dsnpType": 3,
  "dsnpData": {
    "name": "Richard Burbage",
    "iconUri": "http://www.placekitten.com/400/600",
    "iconHash": "0x8c83cac8226fb6cbb05755139ee361b37554553e1851e0f2f3327ee97e26219f"
  }
}
```

The messageID here is the keccak-256 hash of what is supposed to be at `iconUri`, for validation purposes.

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

Thus the decrypted PrivateGraphChange is nothing more than a Profile message wrapped in an object with a message type.

**NOTE:** Dead drop messages (Drop), cannot be made private this way. The dead drop ID, which is a necessary shared secret for decryption, would not be available.

