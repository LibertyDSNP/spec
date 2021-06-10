---
menu: Batches
name: Overview
route: /Batches/Overview
---

# Batches

The Batches specifications describe how Batches are announced, stored and queried.
A batch file is made of one type of DSNP message.

## File Format

The storage file format is [Apache Parquet](https://github.com/apache/parquet-format).

## Batch Announcements

DSNP Messages are queued where they go directly into one or more DSNP Message Type queues.
At some point when a queue is filled, the messages are dequeued and written to a Batch files and stored.
The details of each created batch are sent to IAnnounce.
IAnnounce emits one message per Batch file.
Please see [Announce Message](/Messages/Announce) documentation for more details.


## Batch file URLs

The Batch file URL accepts different schemes to assist with knowing how to retrieve and query the file contents.
This allows adapters to be written to support different methods of storage and retrieval.

For HTTPS downloads, the SDK uses `https` as needed:

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
    includes:boolean = sdk.batchIncludes(
        "https://mycloudhost.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41",
        { fromAddress: "45cdf29f9d10e57a5c1d993745acd65315cabs2a3aa2b1b",
          dsnpType: 2
        }
    )
```

Not all fields of a DSNP data type are added to the Bloom filters.
Generally speaking, content hashes and URIs are omitted, whereas any field containing a socialAddress or other meaningful text is included in the Bloom filter.
For more detail, see [See the Messages Overview](/Messages/Overview).

## Validation

### Batch File Validation

Batch files are hashed using [keccak-256](https://en.wikipedia.org/wiki/SHA-3) so that it can later be used to verify the integrity of the file.
The [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the file is submitted as part of a batch [announcement](/Messages/Announce) that result in a [DSNPBatch](/Messages/Announce#announcing-dsnp-events) Ethereum log event.

### Batch File DSNP Type Validation

Each batch file consists of one type of [DSNP announcement](/Messages/Overview#dsnp-announcement-formats).
Therefore, the file columns should correspond to the format listed in the DSNP announcement dsnpData field.
For example, if the file claims to be of DSNP type Broadcast, then the file is expected to include the following columns: `fromId`, `contentHash`, `uri`.
As long as the batch file hash can be verified, order of dsnpData fields are irrelevant.
Also note , if the announcement format does not match the format listed in [DSNP announcement](/Messages/Overview#dsnp-announcement-formats), reading a file is not possible.
Hence, being able to successfully read the file means that the file is valid.
