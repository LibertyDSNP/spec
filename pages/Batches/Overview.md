---
name: Batches route: /Batches/Overview menu: Batches
---

# Batches

The Batches specifications describe how Batches are stored and queried.

## File Format

The storage file format is Apache's Parquet.

## Batch file URLs

The Batch file URL accepts different schemes to assist with knowing how to retrieve and query the file contents.

For ordinary HTTP downloads, the SDK uses `http` or `https` as needed:

```typescript
    queue.commit({scheme: 'https'})    
```

This would result in a Batch announcement looking something like:

```typescript
{
    topic: "7ef9f847d24ac0269f41857ece1879e64dc8c648e5fb1ee11c9454ff19629338", 
    batches: [
        {
            dsnpType: 2, 
            dsnpHash: "cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41",
            dsnpUri: "https://mycloudhost.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41"
        }
    ]
}
```

If it were for retrieval directly from Amazon S3, the SDK may use `s3`:

```typescript
    queue.commit({scheme: 's3'})    
```

Resulting in s3 instead of https in the announcement:

```typescript
    dsnpUri: "s3://s3.us-west-2.amazonaws.com/mybucket/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"
```

This also allows us (or another developer) to add adapters for other storage options, such as IPFS:
```typescript
    dsnpUri: "ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/batches/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41.parquet"
```

## Queries

Querying a batch file is done via Bloom filters.  The query call is done through the SDK and consists of a URL and a DSNP message key/value pairs.
```typescript
    sdk.checkBatch(
        "https://mycloudhost.com/cf9c0d7f801f56b634ae4cd3cf0b1aab9e11f2e00125dfb156baccc760417c41",
        {fromAddress: "45cdf29f9d10e57a5c1d993745acd65315cabs2a3aa2b1b"}
    )

```
