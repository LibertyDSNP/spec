---
name: Validation
route: /Messages/Validation
menu: Messages
---

# Message Validation

All messages included in a batch should be validated to guarantee the message's authenticity, authorization and legality.
Messages should be validated before being written to a batch file, however clients should not rely on this being the case and should perform their own validation on messages in the interest of protection against malicious actors.

Validation for a message can be defined as a collection of independent steps which may be run in parallel depending on implementation, however all steps are required to pass for a message to be considered valid.
Certain validation steps are applicable to all messages types and will be referred to as "General Validation" steps in this document.
Other validation steps, referred to as "Type Specific Validation" steps, may only be applied to certain message types.
Additionally, some validation steps are entirely optional and may be applied depending on user choice and legal jurisdiction.

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

In general, all implementations should validate all announcements for correctness against the [DSNP message schema](/Messages/Overview) and authenticity using [their provided signatures](/Messages/Signatures).
Additionally, all client implementations should validate content for correctness against the [Activity Pub schema](https://www.w3.org/TR/activitypub/) and authenticity using the provided content hash.
However, announcers may choose to skip content validation steps in the interest of performance.

### Announcement Correctness

Validation of announcement correctness will vary depending on which fields are present on a particular DSNP message type.
In general, correctness validation will consist of confirming that all necessary fields are present and that values in each field use a format appropriate for the field type.

#### Encrypted Messages

In the case of encrypted messages, if the validating user does not possess the necessary keys to decrypt a message, no validation is possible and the message must be treated as valid, i.e. included in a batch, unless proven otherwise.
Clients, indexers and end-users who also do not possess the necessary keys should ignore these messages.

Optionally, announcers and indexers may choose to invalidate encrypted messages for which the content is obviously incorrect, i.e. the encrypted byte array isn't long enough to be a valid message, however no standard is defined for this behavior and caution should be used to avoid incorrectly invalidating messages.

If the validating user does possess the necessary keys, the message should decrypted and validated as if it were a non-encrypted message.

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
1. URI fields must not exceed 1024 bytes.

### Announcement Authenticity

Validation of announcement authenticity will consist of verifying the message's signature using the appropriate public key for the user listed in the `fromId` of the message and the [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) algorithm, as defined in the [Message Signatures](/Messages/Signatures) specification.
Specific steps for authenticating are as follows:

1. Resolve the identity contract from the `fromId` included in the DSNP messages.
1. Use `ecrecovery` to fetch the public key associated with the identity contract.
1. Test the public key against the identity contract using `IDelegation.isAuthorizedTo`.

### Content Correctness

Like announcement correctness, validating content correctness will vary greatly depending on the content of the message, but generally, it will consist of verifying the overall structure of the activity pub object and format of values associated with each field.
Specifically, the following rules detail how activity pub content should be validated:

1. Content must be a valid JSON object as defined in [RFC7159](https://datatracker.ietf.org/doc/html/rfc7159).
1. Content must include a type field matching one or more of the [core types](https://www.w3.org/TR/activitystreams-vocabulary/#h-types) or [extended types](https://www.w3.org/TR/activitystreams-vocabulary/#h-extendedtypes) defined in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) specification.
1. Content must include all necessary fields associated with the given type defined in the [Activity Pub](https://www.w3.org/TR/activitypub/) specification.

Additional fields not required or defined by the Activity Pub specifications may also be included in accordance with various extensions of the specification, such as [Mastodon](https://docs.joinmastodon.org/spec/activitypub/), [ForgeFed](https://github.com/forgefed/forgefed) or one of the many [potential future extensions](https://www.w3.org/wiki/ActivityPub_extensions) proposed by the [W3C](https://www.w3.org).

If the content of a message is no longer accessible, i.e. the URI of the message returns a 404 or 500 HTTP status, the message is invalid.
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
Notice that this hash is generated including whitespace and newlines exactly as they appear in the content body.

## Type Specific Validation

Specific types of DSNP messages will also include their own specific validations depending on the semantic intent of the message type.
These specific validations follow:

### Broadcasts

1. All broadcast messages with a `"type"` field of `"Follow"` in the activity pub content must include a date in the `"published"` field preceded by a follow [Graph Change](/Messages/Overview#GraphChange) DSNP message with no unfollow events between the time of the follow and the broadcast messages.
1. All broadcast messages with a `"type"` field of `"Like"` or `"Dislike"` in their activity pub content must be preceded by a [Reaction](/Messages/Overview#Reaction) DSNP message referring to the same object, i.e. that the `URI` message field of DSNP message identified by the `inReplyTo` field of the reaction is identical to the `"object"` field of the like or dislike activity pub content.
1. All broadcast messages with a `"type"` field of `"Undo"` must include an `"object"` field with either a valid DSNP identifier referring to a previously announced broadcast message or a URI matching the URI of a previously announced broadcast event.

### Replies & Reactions

1. All reply and reaction messages must include an `inReplyTo` field identifying an existing DSNP message.
1. All reply and reaction messages must be from and signed by a user, the replier, for which the user who posted the original content referred to in the `inReplyTo` field has never previously published a broadcast message with a activity pub content `"type"` field of `"Block"` and `"object"` field containing the string `dsnp://` followed by the user id of the replier, thereby indicating that the original poster has previously blocked the replier.

## Optional Validations

In addition to the aforementioned general validations on all messages and type specific validation on particular messages, there are also a set of optional validations that will be defined below and implementers are encouraged to support, however users, announcers and indexers may choose to ignore depending on their legal jurisdiction and individual preference.
As such, it is strongly encouraged to make these features configurable by the end user in all implementations as allowable by law.

### Blocklists & Allowlists

Users may maintain private lists of other users who they do not wish to publicly block but choose to ignore all messages from.
Likewise, announcers and indexers may also choose to ignore messages from users with repeated patterns of malicious or other objectionable behavior.
To accommodate these users, implementations must include management systems for these lists and consider all incoming messages from blocked users as invalid.

Additionally, some users may choose an allowlist approach instead, blocking messages from all users by default except for a selected list of approved users.

### Copyright & Licensing

Implementations may also choose or be required by law to invalidate content identified as violating intellectual property or other legal restrictions in applicable jurisdictions.
These implementations may use content fingerprinting, shared lists or other methods to identify this content.
This document will not define any standards for these methods except that before removing any potentially violating content implementers must verify that the offending content does not include proof of licensing or other legal exception in the activity pub content of the message.

These legal exceptions must be listed under an additional content field name `"licensing"` which may include either a URI pointing to the appropriate proof, an object to be defined by the enforcing legal body or an array consisting of multiple instances of either item. For example, here is a sample activity pub object with fictional licensing:

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
