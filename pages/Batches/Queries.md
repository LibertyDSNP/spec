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

## Details
The Parquet Spec supports only 64-bit XxHashes for Bloom Filters with seed = 0.  Under the hood, the SDK will hash a value and check the Bloom filter in the batch file for that hash.  Here is a pseudocode example of how a batch file containing Broadcasts might be queried as to whether there are any fromAddresses matching a provided social address.

The function `checkBatch` would fetch the BloomFilters from the URL provided and check the filters for the hashed value.

The

```typescript
function getLatestPostsFrom(socialAddress: string, lastLogin: Date): Array<DSNPMessage> {
    const batches: Array<Batch> = getBatchesSince(lastLoginTime)
    let matchUrls: Array<string>
    const query: Record<Keys,Type> = {fromAddress: socialAddress}
    batches.map(url => {
        if (sdk.checkBatch(url, query)) matchUrls.push(url)
    })

    // a function that fetches entire batch file and returns broadcasts, 
    // replies, reactions where fromAddress === socialAddress
    return sdk.getPostsFromBatches(matchUrls, query)
}

```
