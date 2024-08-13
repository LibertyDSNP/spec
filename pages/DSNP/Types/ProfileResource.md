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
            "name": "contentAddress",
            "type": "string",
            "doc": "Content address for the resource"
        }
    ]
}
```

## Generation

### type

- MUST be a supported DSNP profile-linked resource type.

#### Supported Profile-Linked Resource Types

| Value | Description | Specification | Content Type | Maximum File Size | Content Address Type | DSNP Version Added |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Activity Content Profile with DSNP extensions | [DSNP Profile](../../ActivityContent/Types/Profile.md) | `application/json` | 256 Kb | Supported [IPFS CID](https://docs.ipfs.tech/concepts/content-addressing/)<sup>1</sup> | 1.3 |

All other resource type values are reserved for future expansion.

<sup>1</sup>Supported IPFS CIDs must be CID version 1, using either `sha2-256` or `blake3` hashes with the `raw` codec and the `base32` serialization.

### contentAddress

- MUST be a valid content address for the specified `type` (see table above)
- MUST contain sufficient information for an application to perform content integrity validation, for example by comparing the `contentAddress` field to the address derived by recalculating the content address from the bytes of the retrieved resource
