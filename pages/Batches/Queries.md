---
name: Queries
route: /Batches/Queries
menu: Batch Queries
---

# Queries

This specification describes how Batch files should be queried.


## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose

1. Specify how Batch files may be queried
1. Outline the API to be implemented in the SDK

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)

## Goals of Batch Design
We wish to minimize the number of queries needed and the amount of data clients must retrieve in order to get data the client wants.  This is to be balanced with avoiding operational overhead of a database, which would do indexing and support more advanced queries.  It is anticipated that indexing services would fill this need if it arises.

## Details
The Parquet Spec supports only 64-bit XxHashes for Bloom Filters with seed = 0.  The value are hashed and the Bloom filter in the batch file is pulled from the file and checked for that hash.  Only valid DSNP message fields, that is, columns in Parquet, can be checked.

The Bloom filters for a given column are retrieved from the file by first retrieving metadata to obtain the bloom filter offset, then retrieving the filter set.  To retrieve these values from a remote file, HTTP range header can be used.

Here is an example of how a batch file containing Broadcasts might be queried as to whether there are any fromAddresses matching a provided social address.

```typescript
function getLatestPostsFrom(socialAddress: string, lastLogin: Date): Array<DSNPMessage> {
    const batches: Array<Batch> = getBatchesSince(lastLoginTime)
    let matchUrls: Array<string>
    const query: Record<Keys,Type> = {fromAddress: socialAddress}
    batches.map(url => {
        // fetch the BloomFilters from the URL provided and check the filters for the hashed value
        if (sdk.checkBatch(url, query)) matchUrls.push(url)
    })

    // this example function would fetch each batch file, then return broadcasts, 
    // replies, reactions where fromAddress === socialAddress
    return sdk.getPostsFromBatches(matchUrls, query)
}
```
