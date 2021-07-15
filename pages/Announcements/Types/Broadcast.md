---
name: Broadcast
route: /Announcements/Types/Broadcast
menu: Announcements/Types
---

# Broadcast Announcement

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Details

A Broadcast Announcement is a way to send a public message to everyone.

## Fields

| dsnpData field | description | parquet type | bloom filter |
| ------------- | ------------ | ------------ | ------------ |
| announcementType | Announcement Type Enum (`2`) | `INT32` | no |
| contentHash | keccak-256 hash of content stored at URL | `BYTE_ARRAY` | YES
| fromId | DSNP User Id | `BYTE_ARRAY` | YES
| url | content URL | `BYTE_ARRAY` | no
| signature | content URL | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `2`

### contentHash

- MUST be 32 bytes in length
- MUST be the keccak 256 hash of the bytes of the file stored at url

### fromId

- MUST be a [DSNP User Id]()

### url

- MUST be publicly accessible
- MUST use one of the supported URL Schemes
- Resource MUST one of the supported [Activity Content](/ActivityContent/Overview) Types

### signature

- MUST be an [Announcement Signature](/Announcements/Signatures) over the all fields except the signature field.
