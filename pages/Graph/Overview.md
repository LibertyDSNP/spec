---
name: Overview
route: /Graph/Overview
menu: Graph
---

# Graph

This specification is intended to describe the social network graph and how it is represented in the protocol. 

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
- All graph messages will be of type Graph Change
- All graph change messages will be added to batch files for announcement on block chain

##Terminology

#### Friendship

There currently is no concept of "friendship" within the social network graph - as that requires a mutual acknowledgement between 2 different DSNP Ids. 
Friendship can be thought of in this case as "mutual following" - where 2 DSNP identities are following each other. 

In order to add a user to a graph, a DSNP identity must "follow"(described below) the DSNP Id they wish to add to their graph. To remove someone from the graph 
a DSNP identity must "unfollow"(described below) the DSNP Id they wish to remove to their graph.

#### Follow

A Follow actions refers to the act of publicly following a user (referenced as a (DSNP Id )[/Identity/Overview]) which results in adding this DSNP Id to a user's social graph.

#### Unfollow

Unfollow action refers to the act of publicly unfollowing a user (referenced as a (DSNP Identity)[/Identity/Overview]) which results in the removal of this DSNP Id from a user's social graph

### Graph

The collection of DSNP identities that a given user(DSNP Id) is following via the DSNP protocol. 

#### Public
When referring to publicly following or unfollowing a DSNP ID - "publicly" implies that anyone looking for these follow or unfollow events on the blockchain will
be able to determine who the follower(DSNP id doing the following) and followee(DSNP Id being followed) are for a given event.

## Graph Change Announcement Format
Anytime a user "follows" or "unfollows" someone - a graph change event is created.
A graph change will contain the following information: `fromId`, `changeType`, `objectId`, `nonce`. See [Messages Overview](/Messages/Overview) for more information on these fields.

## Graph Storage
All graph change events are signed and added to a [batch file](/Batches/Overview).
Once that batch file is complete, it will be [announced](/Messages/Announce) on the blockchain per the DSNP specification. 
Each announce event specifies the type of message ([DSNPtype](/Messages/Announce)) that is in the batch file. 

## Graph Retrieval, Ordering & Reading
To have an accurate representation of the social graph for a given DSNP Id - it is necessary to retrieve the entire graph from the chain.

To do so it is necessary to do the following:
1. Retrieve all the log events[DSNP type](/Messages/Types)`GraphChange` from the chain
1. Retrieve the batch file from each log event. Each log event of type [GraphChage](/Messages/Announce) has a field called `dsnpURI` which contains a uri pointing to a [batch file](/Batches/Overview). 
1. Query the batch files for the data for a particular DSNPId to retrieve information about the respective graph. For more how batch file storage and how to query the batch file see [Batches overview](/Batches/Overview)
1. Order the retrieved data based on the following
    1. Block Number Ascending
    1. Transaction Index Ascending
    1. Log Index Ascending
    1. Batch File Row Index Ascending
                                                
For more on ordering see [Message Ordering Specification](/Messages/Ordering).

#### Reading the graph
Once the retrieval of the entire graph is complete and the data is ordered, one can read the graph to see the most recent state of following between to respective DSNP IDs (i.e the last graph change event shows Bob has unfollowed Charlie)

If the entire graph has been retrieved and stored, it is possible to then only retrieve new events from the point where the last graph ended. This can be done by retrieving `GraphChange` log events from the chain starting with a specific block number. 
For example: Imagine the graph for a given user has been retrieved and stored up until block number 18. Now when retrieving graph log events from the chain, a filter can be added to only retrieve events starting from block 19.

## Replay Attacks

We want to prevent [replay attacks](https://en.wikipedia.org/wiki/Replay_attack) on a given social graph.

Imagine the following scenario
1. Imagine Bob "follows" Charlie and then "unfollows" him.
 
1. Alice is then about to take Bob's follow event and re-announce it as though Bob had decided to follow Charlie again. 
    - The graph now reflects a state where Bob is following Charlie - even though this is not the state of the graph that Bob intended.

There is no way to prevent this situation from happening unless each graph change event is identifiably unique. 
In an effort to prevent [replay attacks](https://en.wikipedia.org/wiki/Replay_attack) a nonce field has been added to each graph change event. 
This nonce field is a unique timestamps represented as microseconds since Unix epoch.
This timestamp will allow a user to detect whether or not they have seen an event before and can therefore ignore duplicate events thus 
thwarting the threat of replay attacks.

## Other Attack Vectors


