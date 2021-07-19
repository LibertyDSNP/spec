---
name: Overview
route: /Graph/Overview
menu: Graph
---

# Graph

This specification describes the social network graph and how it is represented in the protocol. 

In this context a [social graph](https://en.wikipedia.org/wiki/Social_graph) means a graph that represents social relations between entities.

The DSNP graph represents users as [DSNP User Ids](/Identity/Overview). 
Each instance of a social network graph is made up of a DSNP User Id following other DSNP User Ids.
When the term "user" is referenced below it is referring to a DSNP User Id.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose
1. Describe the form of Graph Message posted to the blockchain
1. Explain how to retrieve and resolve the graph
1. Facilitate use of SDK and interpretation of graph-data

## Assumptions
- All graph messages will be of type `GraphChange`.
- All `GraphChange` messages will be added to a batch file for an publication on blockchain

##Terminology

#### Friendship

There is no concept of "friendship" within the DSNP social network graph. 
Friendship requires a mutual acknowledgement between 2 different DSNP User Identities. 
Friendship can be thought as "mutual following" - where 2 DSNP User identities are following each other. 

#### Follow

A "follow" is the act of publicly following a user (referenced as a [DSNP User Identity](/Identity/Registry)) which results in adding this DSNP User Id to a user's social graph.

#### Unfollow

An "unfollow" is the act of publicly unfollowing a user (referenced as a [DSNP User Identity](/Identity/Registry)) which results in the removal of this DSNP User Id from a user's social graph.

### Graph

The collection of DSNP User identities that a given user is following via the DSNP protocol. 

#### Public
Publicly following or unfollowing a DSNP User Id implies that anyone looking for these follow
or unfollow events on the blockchain will be able to determine who the follower (DSNP User Id 
doing the following) and followee (DSNP User Id being followed) are for a given event.

## Graph Change Announcement Format
Anytime a user "follows" or "unfollows" someone - a graph change [announcement](/Messages/Overview) is created.
A graph change will contain the following information: `fromId`, `changeType`, `objectId`, `nonce`. See [Messages Overview](/Messages/Overview) for more information on these fields.

## Graph Storage
All graph change announcements are signed and added to a [Batch File](/BatchPublication/Overview).
The Batch File is [published](/BatchPublication/Publish) on the blockchain.

## Graph Retrieval, Ordering & Reading
A user's graph can be derived for any given point in time by retrieving the graph change events for that time period (i.e. from block 0 to block 10). 
Once those graph change events are retrieved, they can be ordered (as mentioned below) to reflect the current graph state
(i.e. Charlie has followed Bob then unfollowed him and then followed him again. The graph state reflects that Charlie is Following Bob).

To retrieve the graph, do the following:
1. Retrieve the [`DSNPBatchPublications`](/BatchPublication/Publish) events with [announcementType](/Messages/Types) matching the enum of `GraphChange` from the chain.
1. Retrieve the batch files from each log event.
1. Query the batch files for the data for a particular DSNP User Id to retrieve information about the respective graph.
1. Order the retrieved data based on the following
    1. Block Number Ascending
    1. Transaction Index Ascending
    1. Log Index Ascending
    1. Batch File Row Index Ascending
                                                
For more on ordering see [Message Ordering Specification](/Messages/Ordering).

#### Creating the graph
Each graph change event represents a state transition for the graph. 
The state of the graph at any time is given by taking the state of the graph at a previous time and applying all graph change events not previously applied in the order specified above.

This can be done by retrieving `GraphChange` log events starting with a specific block number. 
For example: The graph for a given user has been retrieved and stored up until block number 18. 
A filter can be added to the logs being retrieved to only retrieve log events starting from block 19.

## Replay Attacks

Clients must ignore any GraphChange event that comes after another event with the same signature. This avoids [Replay attacks](https://en.wikipedia.org/wiki/Replay_attack)
Each graph change event has a timestamp that allows for differing signatures.
This timestamp is represented as microseconds since Unix epoch.

For example:
1. Bob "follows" Charlie and then "unfollows" him then "follows" him again.
    - If the `GraphChange` event has no timestamp, the second follow event would have to be ignored when reading the graph. 
      It would appear to have the same signature as the first event and therefore be a duplicate, and a potential replay attack.
    - With a timestamp, the second follow event would have a unique signature and could therefore be interpreted as a valid event.
