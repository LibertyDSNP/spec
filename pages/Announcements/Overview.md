---
name: Overview
route: /Messages/Overview
menu: Messages
---

# Messages Overview

## Specification Status

| Version | Status |
---------- | ---------
| 0.3     | Tentative |

## Purpose

1. Describe the form and content of DSNP Messages posted to the blockchain used for all Liberty Platform activities.
1. Specify an on-chain announcement format.
1. Provide data size estimations.
1. Facilitate use of SDK and interpretation of on-chain data.

## Assumptions

* Announcements are on Ethereum.
* Announcement data is posted via [Ethereum log events](https://medium.com/mycrypto/understanding-event-logs-on-the-ethereum-blockchain-f4ae7ba50378).
* Signature algorithm is [secp256k1](https://en.bitcoin.it/wiki/Secp256k1). This allows the use of `ecreover` to get public keys. A public key also need not be included in a log event for ease of validation.
* Content hashes are created via the same [keccak-256 hashing algorithm](https://en.wikipedia.org/wiki/SHA-3) used by Ethereum.

## Terminology

In the interest of clarity, we will define the terms "message," "content," "announcement" and "event" as distinct but related objects going forward in this specification.

#### Announcement

An announcement refers specifically to a DSNP item as described in this specification document.
An announcement is intended for inclusion in a batch file and to eventually be published to the blockchain via a batch log event.
Some announcements, such as broadcasts and replies, will contain references to content items.

#### Content

Content items, or simply content, refers to activity streams compliant JSON hosted at some URL and intended to be posted via an announcement in a batch.
Generally, content within the DSNP specification will be defined by the [W3C Activity Streams 2.0 specification](https://www.w3.org/TR/activitystreams-core/), however extensions, such as the [Mastodon Activity Pub specification](https://docs.joinmastodon.org/spec/activitypub/) may also be implemented.

#### Message

Messages refer more generally to a piece of information posted via the DSNP specification.
In the case of broadcasts and replies, message may refer to the both the DSNP announcement of the content and the content itself.
In the case of other types of announcements, message may be used as an alias for announcements.

#### Event

Events refer specifically to log events on the Ethereum blockchain.
To avoid confusion with other terms, we will not officially refer to announcements, content or messages as events, however they may be referred to as such unofficially in more casual conversation such as forum posts, GitHub issues or pull requests.

## DSNP Announcement Formats

We have seriously considered two possibilities, a [variable announcement format](#Variable-Announcement-Format), and a [unified announcement format](#unified-announcement-format).

### DSNP Announcement

These announcements would be added to batch files for publication on the blockchain.

#### Broadcast

A public post.

| dsnpData field | description | type | bloom filter |
| ------------- |------------- | ---- | --- |
| fromId | DSNP User Id | bytes8 | YES
| contentHash | keccak-256 hash of content stored at URL |  bytes32 | YES
| url       | content URL | string | no

#### Reply

A public reply post.

| dsnpData field | description | type | bloom filter |
| ------------- |------------- | ---- | --- |
| inReplyTo | DSNP Message Id |  string | YES
| contentHash | keccak-256 hash of content stored at url |  bytes32  | YES
| fromId | DSNP User Id | bytes8 | YES
| url | content url | string | no

#### GraphChange

A public follow/unfollow.

| dsnpData field | description | type | bloom filter |
| ------------- |------------- | ---- | --- |
| fromId | DSNP User Id | bytes8 | YES
| changeType | follow/unfollow| number/enum | no
| objectId | Id of followee | bytes8 | YES
| nonce | microseconds since Unix epoch | number | no

#### Reaction

A visual reply to a post.

| dsnpData field | description | type | bloom filter |
| ------------- |------------- | ---- | --- |
| inReplyTo | DSNP Message Id |  string | YES
| fromId | DSNP User Id | bytes8 | YES
| emoji | the encoded reaction  | number / UTF-8 bytes[] | YES

#### Profile

A profile update such as name or icon change.

| dsnpData field | description | type | bloom filter |
| ------------- |------------- | ---- | --- |
| fromId | DSNP User Id | bytes8  | YES
| contentHash |  keccak-256 hash of content at url | bytes32 | no
| url    | url for the profile data  |string | no
