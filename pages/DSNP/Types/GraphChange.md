# Graph Change Announcement

A Graph Change Announcement is for publishing relationship state changes for a user.

## Fields

| Field | Description | Data Type | Serialization | Parquet Type | Bloom Filter |
| ----- | ----------- | --------- | ------------- | ------------ | ------------ |
| announcementType | Announcement Type Enum (`1`) | enum | [decimal](../Serializations.md#decimal) | `INT32` | no |
| changeType | Type of relationship change | enum | [decimal](../Serializations.md#decimal) | `INT32` | no
| fromId | id of the user creating the relationship | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES
| objectId | id of the target of the relationship | 64-bit unsigned integer | [decimal](../Serializations.md#decimal) | `UINT_64` | YES

## Field Requirements

### announcementType

- MUST be fixed to `1`

### changeType

- MUST be one of the Change Type Enum

### Change Type Enum

Different change types have different meanings.

| Value | Name | Description |
| ----- |----- | ----------- |
| 0 | Unfollow | Remove a Follow relationship |
| 1 | Follow | Create a Follow relationship |

### fromId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)
- MUST have authorized the creation of the Announcement, either directly or via a transparent chain of delegation

### objectId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

## Non-Normative

### Graph Retrieval, Ordering and Reading
Each Graph Change event represents a state transition for the graph.
The state of the graph at any time is given by taking the state of the graph at a previous time and applying all Graph Change events not previously applied in the order specified above.
Once those Graph Change events are retrieved, they can be ordered to reflect the current graph state
(i.e. Charlie has followed Bob, then he unfollowed him, and then followed him again. The graph state reflects that Charlie is following Bob).

To retrieve the graph, do the following:
1. Retrieve the events with [announcementType](../Announcements.md#announcement-types) matching the enum for "Graph Change"
1. Filter the events to a particular DSNP User Id to retrieve information about the respective graph.
1. Order the retrieved data by [Announcement Ordering](../Announcements.md#ordering-announcements).
