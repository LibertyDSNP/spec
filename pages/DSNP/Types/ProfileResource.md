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
            "name": "contentHash",
            "type": "bytes",
            "doc": "Multihash digest of resource content"
        },
        {
            "name": "length",
            "type": "int",
            "doc": "Length of resource in bytes"
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

### contentHash

- MUST be a valid [DSNP Content Hash](../Identifiers.md#dsnp-content-hash)

A compliant DSNP system MUST specify how to use the `contentHash` field to retrieve the target document.

### length

- MUST be a positive integer
- MUST match the length in bytes of the resource
