---
name: Graph
route: /Graph
---

# Graph

This specification describes the social network graph and how it is represented in the protocol.

In this context a [social graph](https://en.wikipedia.org/wiki/Social_graph) means a graph that represents social relations between entities.

The DSNP graph represents nodes as [DSNP User Ids](/Identifiers#dsnp-user-id).

## Specification Status

| Version | Status   |
| ------  | -------- |
| 0.2     | Draft    |

## Public Graph

The public graph is anchored in state transitions recorded in [Graph Change Announcements](/Announcements/Types/GraphChange).
Possible graph nodes are limited to registered identifiers in the [Identity Registry](/Identity/Registry).
Playing all state transitions in [order](/Announcements/Overview#ordering-announcements) will
generate the current state of the public graph.

## Private Graph

Future. See the [DSNP Whitepaper](https://github.com/LibertyDSNP/papers) for foundational ideas.

## Non-Normative

### Following

A "follow" is the act of publicly following a [DSNP User Identity](/Identifiers#dsnp-user-id) which results in adding this DSNP User Id to a user's social graph.

An "unfollow" is the act of publicly unfollowing a [DSNP User Identity](/Identifiers#dsnp-user-id) which results in the removal of this DSNP User Id from a user's social graph.

### Friendship

There is no concept of "friendship" within the DSNP network.
Friendship requires a mutual acknowledgement between 2 different DSNP User Identities.
Friendship can be thought as "mutual following" - where 2 DSNP User Identities are following each other.
