---
menu: Batches
name: Queries
route: /Batches/Queries
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
We wish to minimize the number of queries needed and the amount of data clients must retrieve in order to get data the client wants.
This is to be balanced with avoiding operational overhead of a database, which would do indexing and support more advanced queries.
It is anticipated that indexing services would fill this need if it arises.

## Details
Following the [Parquet spec](https://github.com/apache/parquet-format), the query values are hashed and the Bloom filter in the batch file is pulled from the file and checked for that hash.
Only valid DSNP message fields, that is, columns in Parquet, can be checked.

Here is an example use case of how a batch file containing Broadcasts might be queried for a specific social address.

**NOTE the following SDK functions don't exist at this time**

```typescript
function getLatestPostsFrom(socialAddress: string, lastLogin: Date): Array<DSNPMessage> {

    const lastLoginBlock = sdk.timestampToBlockHeight(lastLogin)

    const batches: Array<Batch> = sdk.getBatchesSince(lastLoginBlock)
    let matchUrls: Array<string>

    const query: Record<Keys,Type> = { fromAddress: socialAddress }

    batches.map(batchUrl => {
        // fetch the BloomFilters from the URLs provided and check the filters
        // for the hashed value
        if (sdk.bloomFilterQuery(batchUrl, query)) matchUrls.push(batchUrl)
    })

    // this function fetches each batch file, then returns rows
    // matching fromAddress === socialAddress
    return sdk.batchQuery(matchUrls, query)
}
```
