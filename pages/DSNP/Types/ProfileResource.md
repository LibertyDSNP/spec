# ProfileResource

A profile-linked resource is represented by the ProfileResource object type.

## Serialization

ProfileResource object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "ProfileResource",
    "type": "record",
    "doc": "Profile-linked resource",
    "fields": [
        {
            "name": "type",
            "type": "int",
            "doc": "Type of resource"
        },
        {
            "name": "cid",
            "type": "bytes",
            "doc": "Content IDentifier of resource"
        },
        {
            "name": "length",
            "type": "int",
            "doc": "Length of document in bytes"
        }
    ]
}
```

## Generation

### type

- MUST be a supported DSNP profile-linked resource type.

#### Supported Profile-Linked Resource Types

| Value | Description | Specification | Content Type | DSNP Version Added |
| --- | --- | --- | --- |
| 1 | Activity Content Profile with DSNP extensions | [DSNP Profile](../../ActivityContent/Types/Profile.md) | `application/json` | 1.3 |

All other document type values are reserved for future expansion.

### cid

- MUST be a valid (binary) [DSNP CID](../Identifiers.md#dsnp-cid)

### length

- MUST be a positive integer
- MUST match the length in bytes of the document
