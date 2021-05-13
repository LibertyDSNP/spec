---
name: Validation
route: /Messages/Validation
menu: Messages
---

# Message Validation

All messages included in a batch should be validated to guarantee the message's authenticity, authorization and permissibility.
Messages should be validated by announcers before being included in a batch file, however clients and indexers should not rely on announcer validation alone.
Clients and indexers must perform their own validation on incoming messages as well.

Validation of messages in this document is defined as a collection of independent checks which may be run in parallel depending on implementation, however all checks are required to pass for a message to be considered valid.
Certain validation checks are applicable to all messages types and will be referred to as **General Validation** checks in this document.
Other validation checks, referred to as **Type Specific Validation** checks, may only be applied to certain message types.
Additionally, **Optional Validation** checks may be applied depending on particular users' preferences and legal jurisdictions.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose
1. Describe the process of validating messages for inclusion in a batch

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)
* All assumptions from [DSNP Signatures](/Messages/Signatures)

## General Message Validation

In general, implementations should validate all announcements for correctness against the [DSNP message schema](/Messages/Overview) and authenticity using [their provided signatures](/Messages/Signatures).
Additionally, client implementations must validate the activity pub content of applicable messages for correctness with the [Activity Pub schema](https://www.w3.org/TR/activitypub/) and authenticity using the provided content hash.
Announcers may choose to skip content validation checks in the interest of performance given the high cost of fetching content.

### Announcement Correctness

Validation of announcement correctness will vary depending on which fields are present on a particular DSNP message type.
In general, announcement correctness validation will consist of confirming that all necessary fields are present and that values in each field use a format appropriate for the field type.

#### Encrypted Messages

Announcers who do not possess the necessary keys to decrypt an encrypted message cannot validate the message's correctness and must treat the message as valid so users with the appropriate keys may still access them in the produced batch.
In contrast, clients and indexers who do not possess the necessary keys to decrypt an encrypted message should consider the message invalid and ignore it as it provides no value to the end-user.

Optionally, announcers and indexers may choose to invalidate encrypted messages for which the content is obviously incorrect, i.e. the encrypted byte array isn't long enough to be a valid message, however no standard will be defined for this behavior and caution should be used to avoid incorrectly invalidating messages.

If any validator, including announcers, clients and indexers, do possess the necessary keys to decrypt a given message, the message should decrypted and validated as if it were a non-encrypted message.

#### Non-Encrypted Messages

Validating correctness for a non-encrypted message will consist of verifying that each field in the message is defined and meets the formatting rules listed in the subsections below for the given field type.

##### Addresses

1. Address fields must be exactly 20 bytes.

##### Emoji

1. Emoji fields must not be empty.
1. Emoji fields must only consist of [Unicode points](https://unicode.org/standard/standard.html) from `U+2000` to `U+2BFF`, from `U+E000` to `U+FFFF`, or from `U+1F000` to `U+10FFFF`.

For example, all of the following should be considered valid emoji:

```
"😀", "🤌🏼", "👩🏻‍🎤", "🧑🏿‍🏫", "🏳️‍🌈", "🏳️‍⚧️", "⚛︎", "🃑", "♻︎"
```

Additionally, none of the following should be considered valid:

```
"F", ":custom-emoji:", "<custom-emoji>", "ᚱ", "ᘐ", "״"
```

##### Hashes

1. Hash fields must be exactly 32 bytes.

##### Message Ids

1. Message Identifier fields must meet all standards defined in the [Message Identifiers](/Messages/Identifiers) specification.

##### Type Enumerators

1. Type Enumerator fields must be a valid enumerator value as defined in the [Message Overview](/Messages/Overview).

##### URI Fields

1. URI fields must include meet all standards defined in [RFC3986](http://www.ietf.org/rfc/rfc3986.txt).
1. URI fields must not refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
1. URI fields must use the `https` protocol. Support for other protocols may be added in the future.

### Announcement Authenticity

Validation of announcement authenticity will consist of verifying the message's signature using the appropriate public key for the user listed in the `fromId` field.
Specific steps for fetching a public key are as follows:

1. Resolve the identity contract from the `fromId` included in the DSNP messages.
1. Use `ecrecovery` to fetch the public key associated with the identity contract.
1. Test the public key against the identity contract using `IDelegation.isAuthorizedTo`.

Once the key is fetched, the signature can be verified against it using the [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) and the [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the serialized message as described in the [Message Signatures](/Messages/Signatures#verifying-messages) specification.

### Content Correctness

Like announcement correctness, validating content correctness will vary greatly depending on the content of the message, but generally, it will consist of verifying the overall structure of the activity pub object and format of values associated with each field.
As previously stated, announcers may skip this check in the interest of performance, but clients and indexers must not.
Specifically, the following rules detail how activity pub content should be validated:

1. Content must be a valid JSON object as defined in [RFC7159](https://datatracker.ietf.org/doc/html/rfc7159).
1. Content must include a type field matching one or more of the [core types](https://www.w3.org/TR/activitystreams-vocabulary/#h-types) or [extended types](https://www.w3.org/TR/activitystreams-vocabulary/#h-extendedtypes) defined in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) specification.
1. Content must include all necessary fields associated with the given type defined in the [Activity Pub](https://www.w3.org/TR/activitypub/) specification.

Additional fields not required or defined by the Activity Pub specifications may also be included in accordance with various extensions of the specification, such as [Mastodon](https://docs.joinmastodon.org/spec/activitypub/), [ForgeFed](https://github.com/forgefed/forgefed) or one of the many [potential future extensions](https://www.w3.org/wiki/ActivityPub_extensions) proposed by the [W3C](https://www.w3.org).

If the content of a message is no longer accessible, i.e. the URI of the message returns a 404 or 500 HTTP status, the message is invalid and should be ignored.
It is also recommended that implementations provide a warning either in the console or directly to the user with the associated HTTP status.
For example, a message such as `"Content Inaccessible: Error 404"` would suffice.

### Content Authenticity

Authentication of a message's contents must be verified by hashing the exact contents of the body returned by the message URI and comparing it with the `contentHash` field of the given message.
Given that the signature of the message is valid, this hash serves as proof that the signing user posted the activity pub content.

For example, given a DSNP message with the following content at it's URI:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

The resulting hash would be `0x70ae98439569700ae8328f204ba496e4ac151dc117d08ac217daa15b412641f7`.
Notice that this hash is generated including spaces and newlines exactly as they appear in the content body.
The content body must be hashed byte for byte from the response of the URI with absolutely no processing.

## Optional Validations

In addition to the aforementioned general validation and type specific validation checks, there are also a set of optional validation checks that implementers are encouraged to support, however end-users may choose to ignore them depending on their legal jurisdiction or personal preference.
As such, it is strongly encouraged to make these features configurable by the end-user in all implementations.

### Copyright & Licensing

Implementations may also choose or be required by law to invalidate content identified as violating certain laws, such as intellectual property, in the end-user's specific legal jurisdiction.
These implementations may use content fingerprinting, shared lists or other methods to identify this content.
This document will not define any standards for these methods except that before removing any potentially violating content implementers must verify that the offending content does not include proof of legal exemption, such as paid licensing, in the activity pub content of the message.

These legal exceptions must be listed under an additional content field named `"licensing"` which may include either a URI pointing to the appropriate proof, an object to be defined by the enforcing legal body or an array consisting of multiple instances of either.
For example, here is a sample activity pub object with fictional licensing:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Video",
  "name": "Excerpt of Yankees vs Nationals Game 2021",
  "url": "http://sportsblog.com/yankeesnationals2021.mkv",
  "duration": "5M",
  "licensing": [
    "https://mlb.com/licensing/sportsblogcom.json",
    {
      "authority": "ESPN",
      "type": "paid",
      "licensee": "SportsBlog.com",
      "proof": "c3RyaW5naBc6453=w-9sSAw4naBc8533="
    }
  ]
}
```
