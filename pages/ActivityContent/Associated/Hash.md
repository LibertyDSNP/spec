---
name: "Associated Type: Hash"
route: /ActivityContent/Associated/Hash
menu: Activity Content
---

# Associated Type: Hash

*NOT* part of the Activity Streams 2.0 Vocabulary.

Activity objects linking to external content such as audio, image or video files must include a `"hash"` field for users to validate linked content.
The value of this `"hash"` field must be a array of objects representing multiple hashes.
AT LEAST ONE hash in the array MUST be one of the [supported algorithms](#supported-algorithms) although others may also be used.

| Property | Required | Description | Restrictions |
| --- | --- | --- | --- |
| `algorithm` | YES | The algorithm of the given hash | |
| `value` | YES | Hash value serialization | |

### Supported Algorithms

| Algorithm | Description | Value Serialization | Specification(s) |
| --- | --- | --- | --- |
| keccak-256 | keccak-256 hash | [hexadecimal](/Announcements/Overview#hexadecimal) | [The Keccak SHA-3 submission v3](https://keccak.team/files/Keccak-submission-3.pdf) |

### Example

```json
{

  "hash": [
    {
      "algorithm": "keccak-256",
      "value": "0x...."
    }
  ]
}
```