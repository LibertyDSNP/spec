# Graph Edge

Relationships between users are represented using the GraphEdge object.

## Serialization

GraphEdge object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "GraphEdge",
    "type": "record",
    "doc": "A relationship to another DSNP user",
    "fields": [
        {
            "name": "userId",
            "type": "long",
            "doc": "The other user's DSNP User Id"
        },
        {
            "name": "since",
            "type": "long",
            "doc": "Timestamp in Unix epoch seconds when this relationship was originally established"
        }
    ]
}
```

## Generation

### userId

- MUST be a [DSNP User Id](../Identifiers.md#dsnp-user-id)

<mark>To allow for optimal compression, User Ids are stored using the <tt>long</tt> type in Avro schema, which is a 64-bit _signed_ integer.
    Care should be taken to ensure that User Id values greater than or equal to 2<sup>63</sup>, where used by an implementation, are converted correctly between signed and unsigned representations.</mark>

### since

- MUST be a value in seconds since the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time)
