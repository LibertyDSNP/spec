---
name: Validation
route: /Announcements/Validation
menu: Announcements
---

# Announcement Validation

All messages must be validated by announcers before being included in a batch file, however clients and indexers should not rely on announcer validation alone and should perform their own validation on incoming messages as well.
Message validation in this document is defined as a collection of independent checks which may be run in parallel depending on implementation, however all checks are required to pass for a message to be considered valid.

In general, all implementations must validate announcements for correctness against the [DSNP message schema](/Announcements/Overview) and authenticity using [their provided signatures](/Announcements/Signatures).
Client and indexer implementations must also validate the activity streams JSON content of applicable messages for correctness with the [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/) and authenticity using the provided content hash.
Announcers may choose to skip content validation checks in the interest of performance given the high cost of fetching content.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Describe the process of validating messages for inclusion in a batch.

## Assumptions

* All assumptions from [DSNP Messages](/Announcements/Overview)
* All assumptions from [DSNP Signatures](/Announcements/Signatures)

## Field Validation

### `emoji`

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

### `contentHash`

1. Hash fields must be exactly 32 bytes.

### `inReplyTo`

1. MUST meet all standards defined in the [Announcement Identifier](/Announcements/Identifiers) specification.

### `signature`

1. MUST be exactly 64 bytes.

### `announcementType`

1. MUST be a valid enumerator value as defined in the [Announcement Types](/Announcements/Overview#announcement-types).

### `url`

1. MUST include meet all standards defined in [RFC3986](http://www.ietf.org/rfc/rfc3986.txt).
1. MUST not refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890).
1. MUST use a supported URL scheme.

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC 2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |


### User Ids

1. User Id fields must be exactly 8 bytes.

## Announcement Authenticity

Validation of announcement authenticity will consist of verifying the message's signature using the appropriate public key for the user listed in the `fromId` field.
Specific steps for fetching a public key are as follows:

1. Resolve the identity contract from the `fromId` included in the DSNP messages.
1. Use the https://spec.projectliberty.io/Announcements/Signatures spec with `ecrecovery` to recover the signer's public key.
1. Test the public key against the identity contract using `IDelegation.isAuthorizedTo`.

Once the key is fetched, the signature can be verified against it using the [Secp256k1](https://en.bitcoin.it/wiki/Secp256k1) and the [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the serialized message as described in the [Message Signatures](/Announcements/Signatures#verifying-messages) specification.

## Content Correctness

Like announcement correctness, validating content correctness will vary greatly depending on the content of the message, but generally, it will consist of verifying the overall structure of the activity streams object and format of values associated with each field.
As previously stated, announcers may skip this check in the interest of performance, but clients and indexers must not.
Specifically, the following rules detail how activity streams content should be validated:

1. Content must be a valid JSON object as defined in [RFC7159](https://datatracker.ietf.org/doc/html/rfc7159).
1. Content must include a type field matching one or more of the [core types](https://www.w3.org/TR/activitystreams-vocabulary/#h-types) or [extended types](https://www.w3.org/TR/activitystreams-vocabulary/#h-extendedtypes) defined in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) specification.
1. Content must include all necessary fields associated with the given type defined in the [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/) specification.

Additional fields not required or defined by the Activity Streams specifications may also be included in accordance with various extensions of the specification, such as [Mastodon](https://docs.joinmastodon.org/spec/activitypub/), [ForgeFed](https://github.com/forgefed/forgefed) or one of the related [potential future extensions](https://www.w3.org/wiki/ActivityPub_extensions) proposed by the [W3C](https://www.w3.org).

If the content of a message is no longer accessible, i.e. the URL of the message returns a 404 or 500 HTTP status, the message is invalid and should be ignored.
It is also recommended that implementations provide a warning either in the console or directly to the user with the associated HTTP status.
For example, a message such as `"Content Inaccessible: Error 404"` would suffice.

## Content Authenticity

Authentication of a message's contents must be verified by hashing the exact contents of the body returned by the message URL and comparing it with the `contentHash` field of the given message.
Given that the signature of the message is valid, this hash serves as proof that the signing user posted the activity streams content.

For example, given a DSNP message with the following content at it's URL:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
}
```

The resulting hash would be `0x70ae98439569700ae8328f204ba496e4ac151dc117d08ac217daa15b412641f7`.
Notice that this hash is generated including spaces and newlines exactly as they appear in the content body.
The content body must be hashed byte for byte from the response of the URL with absolutely no processing.
