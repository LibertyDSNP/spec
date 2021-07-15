---
name: Graph Change
route: /Announcements/Types/GraphChange
menu: Announcements/Types
---

# Graph Change Announcement

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Details

A Graph Change Announcement is for publishing changes to a DSNP user's public social graph.

## Fields

| dsnpData field | description | parquet type | bloom filter |
| ------------- | ------------ | ------------ | ------------ |
| announcementType | Fixed Value: `1` | `INT32` | no |
| changeType | [Change Type Enum](/Announcements/Types/GraphChange#change-type-enum) | `INT32` | no
| fromId | DSNP User Id initiating the relationship | `BYTE_ARRAY` | YES
| objectId | DSNP User Id target of the relationship  | `BYTE_ARRAY` | YES
| nonce | microseconds since Unix epoch | `INT64` | no
| signature | content URL | `BYTE_ARRAY` | no

### Change Type Enum

Different change types have different meanings

| name | description | value |
|----- | ----------- | ----- |
| Unfollow | Remove a Follow relationship | 0 |
| Follow | Create a Follow relationship | 1 |

### Nonce



## Non-Normative

### Graph Retrieval, Ordering & Reading
Each graph change event represents a state transition for the graph.
The state of the graph at any time is given by taking the state of the graph at a previous time and applying all graph change events not previously applied in the order specified above.
Once those graph change events are retrieved, they can be ordered to reflect the current graph state
(i.e. Charlie has followed Bob then unfollowed him and then followed him again. The graph state reflects that Charlie is Following Bob).

To retrieve the graph, do the following:
1. Retrieve the [`DSNPBatchPublications`](/BatchPublication/Publish) events with [announcementType](/Announcements/Types) matching the enum of `GraphChange` from the chain.
1. Retrieve the batch files from each log event.
1. Query the batch files for the data for a particular DSNP User Id to retrieve information about the respective graph.
1. Order the retrieved data based on the following
  1. Block Number Ascending
  1. Transaction Index Ascending
  1. Log Index Ascending
  1. Batch File Row Index Ascending

For more on ordering see [Message Ordering Specification](/Announcements/Ordering).
