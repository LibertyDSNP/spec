---
menu: Batches
name: Overview 
route: /Batches/Overview 
---

# Batches

The Batches specifications describe how Batches are announced, stored and queried.

## File Format

The storage file format is [Apache Parquet](https://github.com/apache/parquet-format).

## Batch Announcements

DSNP Messages are queued where they go directly into one or more DSNP Message Type queues. At some point when a queue is filled, the messages are dequeued and written to a Batch files and stored. The details of each created batch are sent to IAnnounce. IAnnounce emits one message per Batch file. Please see [Announce Message](/Messages/Announce) documentation for more details.


## Batch file URLs

The Batch file URL accepts different schemes to assist with knowing how to retrieve
and query the file contents.  This allows adapters to be written to support different
methods of storage and retrieval.

For ordinary HTTP downloads, the SDK uses `http` or `https` as needed:

```typescript
    queue.commit({scheme: 'https'})    
```

so that the URI emitted in the announcement would look something like:
 ```typescript
    dsnpUri: "https://some.cloudhosting.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"
```

If it were for retrieval directly from Amazon S3, the SDK could use `s3`:
```typescript
    queue.commit({scheme: 's3'})    
```

Resulting in s3 instead of https in the announcement:

```typescript
    dsnpUri: "s3://s3.us-west-2.amazonaws.com/mybucket/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"
```
## Queries

Querying a batch file is done via Bloom filters.  The query call is done through the SDK and 
consists of a URL and an object of DSNP message column name/value pairs.  Example:

```typescript
    sdk.batchQuery(
        "https://mycloudhost.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41",
        { fromAddress: "45cdf29f9d10e57a5c1d993745acd65315cabs2a3aa2b1b",
          dsnpType: 2
        }
    )
```

Not all fields of a DSNP data type are added to the Bloom filters.  Generally speaking, content hashes and URIs are omitted, whereas any field containing a socialAddress or other meaningful text is included in the Bloom filter.  For more detail, see [See the Messages Overview](/Messages/Overview).
