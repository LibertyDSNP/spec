---
name: "Type: Graph Change"
route: /Announcements/Types/GraphChange
menu: Announcements
---

# Graph Change Announcement

A Graph Change Announcement is for publishing relationship state changes for a user.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`1`) | enum | [decimal](/Announcements/Overview#decimal) | `INT32` | no |
| changeType | Type of relationship change | enum | [decimal](/Announcements/Overview#decimal) | `INT32` | no
| createdAt | milliseconds since Unix epoch | 64 bit unsigned integer | [decimal](/Announcements/Overview#decimal) | `UINT_64` | no
| fromId | id of the user creating the relationship | 64 bit unsigned integer | [decimal](/Announcements/Overview#decimal) | `UINT_64` | YES
| objectId | id of the target of the relationship | 64 bit unsigned integer | [decimal](/Announcements/Overview#decimal) | `UINT_64` | YES
| signature | creator signature | 65 bytes | [hexadecimal](/Announcements/Overview#hexadecimal) | `BYTE_ARRAY` | no

## Field Requirements

### announcementType

- MUST be fixed to `1`

### changeType

- MUST be one of the Change Type Enum

### Change Type Enum

Different change types have different meanings

| Value | Name | Description |
| ----- |----- | ----------- |
| 0 | Unfollow | Remove a Follow relationship |
| 1 | Follow | Create a Follow relationship |

### createdAt

- MUST be set to the milliseconds since Unix epoch at time of signing
- MUST be unique for the given `fromId` and `objectId` pair

### fromId

- MUST be a [DSNP User Id](/DSNP/Identifiers#dsnp-user-id)
- MUST be the [signer](/DSNP/Signatures) of the announcement

### objectId

- MUST be a [DSNP User Id](/DSNP/Identifiers#dsnp-user-id)

### signature

- MUST be an [Announcement Signature](/DSNP/Signatures) over the all fields except the signature field

## Non-Normative

### Replay Attacks

Clients must ignore any Graph Change event that comes after another event with the same signature.
This avoids [Replay attacks](https://en.wikipedia.org/wiki/Replay_attack)
Each graph change event has a `createAt` that allows for differing signatures.
The `createAt` is set to the timestamp is represented as milliseconds since Unix epoch.

For example:
1. Bob "follows" Charlie and then "unfollows" him then "follows" him again.
  - If the `GraphChange` event has no timestamp, the second follow event would have to be ignored when reading the graph.
    It would appear to have the same signature as the first event and therefore be a duplicate, and a potential replay attack.
  - With a timestamp, the second follow event would have a unique signature and could therefore be interpreted as a valid event.


### Graph Retrieval, Ordering & Reading
Each graph change event represents a state transition for the graph.
The state of the graph at any time is given by taking the state of the graph at a previous time and applying all graph change events not previously applied in the order specified above.
Once those graph change events are retrieved, they can be ordered to reflect the current graph state
(i.e. Charlie has followed Bob then unfollowed him and then followed him again. The graph state reflects that Charlie is Following Bob).

To retrieve the graph, do the following:
1. Retrieve the [`DSNPBatchPublications`](/BatchPublication/Publish) events with [announcementType](/Announcements/Overview#announcement-types) matching the enum for "Graph Change" from the chain.
1. Retrieve the batch files from each log event.
1. Query the batch files for the data for a particular DSNP User Id to retrieve information about the respective graph.
1. Order the retrieved data by [Announcement Ordering](/Announcements/Overview#ordering-announcements)
