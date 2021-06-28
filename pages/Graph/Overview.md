---
name: Overview
route: /Graph/Overview
menu: Graph
---

# Graph

This specification describes the social network graph and how it is represented in the protocol. 

In this context a [social graph](https://en.wikipedia.org/wiki/Social_graph) means a graph that represents social relations between entities.

The DSNP graph represents users as [DSNP Ids](/Identity/Overview). Each instance of a social network graph is made up of a DSNP Id following other DSNP Ids.
When the term "user" is referenced below we are referring to a DSNP Id.

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
- All `GraphChange` messages will be added to batch files for an announcement on block chain

##Terminology

#### Friendship

There is no concept of "friendship" within the DSNP social network graph. Friendship requires a mutual acknowledgement between 2 different DSNP Identities. 
Friendship can be thought as "mutual following" - where 2 DSNP identities are following each other. 

#### Follow

A "follow" is the act of publicly following a user (referenced as a (DSNP Identity)[/Identity/Overview]) which results in adding this DSNP Id to a user's social graph.

#### Unfollow

An "unfollow" is the act of publicly unfollowing a user (referenced as a (DSNP Identity)[/Identity/Overview]) which results in the removal of this DSNP Id from a user's social graph.

### Graph

The collection of DSNP identities that a given user is following via the DSNP protocol. 

#### Public
Publicly following or unfollowing a DSNP Id implies that anyone looking for these follow or unfollow events on the blockchain will
be able to determine who the follower(DSNP Id doing the following) and followee(DSNP Id being followed) are for a given event.

## Graph Change Announcement Format
Anytime a user "follows" or "unfollows" someone - a graph change event is created.
A graph change will contain the following information: `fromId`, `changeType`, `objectId`, `nonce`. See [Messages Overview](/Messages/Overview) for more information on these fields.

## Graph Storage
All graph change events are signed and added to a [batch file](/Batches/Overview).
Once that batch file is complete, it is [announced](/Messages/Announce) on the blockchain per the DSNP specification. 
Each announce event specifies the type of ([dsnpType](/Messages/Announce)) messages that are in the batch file. 

## Graph Retrieval, Ordering & Reading
To have an accurate representation of the social graph for a given DSNP Identity - it is necessary to retrieve the entire graph from the chain.

To retrieve the graph - do the following:
1. Retrieve all the log events[dsnpType](/Messages/Types)`GraphChange` from the chain
1. Retrieve the batch file from each log event. Each log event of type [GraphChange](/Messages/Announce) has a field called `dsnpUri` which contains a uri pointing to a [batch file](/Batches/Overview). 
1. Query the batch files for the data for a particular DSNP Id to retrieve information about the respective graph. For more on how batch file storage and how to query the batch file see - [batches overview](/Batches/Overview)
1. Order the retrieved data based on the following  
    1. Block Number Ascending
    1. Transaction Index Ascending
    1. Log Index Ascending
    1. Batch File Row Index Ascending
                                                
For more on ordering see [Message Ordering Specification](/Messages/Ordering).

#### Reading the graph
Once the retrieval of the entire graph is complete and data is ordered, read the ordered data to see the most recent state of the graph between two respective DSNP Ids (i.e the last graph change event shows Bob has unfollowed Charlie)

If the entire graph has been retrieved and stored, it is possible to then retrieve new events from the point where the last graph ended. This can be done by retrieving `GraphChange` log events from the chain starting with a specific block number. 
For example: The graph for a given user has been retrieved and stored up until block number 18. A filter can be added to the logs being retrieved from the chain to only retrieve log events starting from block 19.

## Replay Attacks

[Replay attacks](https://en.wikipedia.org/wiki/Replay_attack) are prevented by ensuring that each graph change event is identifiably unique. 
To allow for uniqueness, each graph change event has a nonce. This nonce field is timestamp represented as microseconds since Unix epoch.
This timestamp will allow a user to detect whether they have seen an event before and can therefore ignore duplicate events thus thwarting the threat of replay attacks.

Without a nonce the following replay attack could happen:
1. Bob "follows" Charlie and then "unfollows" him.
 
1. Alice takes Bob's follow event and re-announces it as though Bob has decided to follow Charlie again. 
    - The now reflects a state where Bob is following Charlie - even though this is not the state of the graph that Bob intended.

There is no way to prevent this situation from happening unless each graph change event is identifiably unique. 

## Other Attack Vectors
TBD

