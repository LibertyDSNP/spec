# Attestation

Attribute Sets that a DSNP User wants to directly associate with their DSNP User Id are represented using the Attestation object.

## Serialization

Attestation object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "Attestation",
    "type": "record",
    "doc": "A reference to an attribute set describing a DSNP user",
    "fields": [
        {
            "name": "attributeSetType",
            "type": "string",
            "doc": "DSNP Attribute Set Type of the referenced credential"
        },
        {
            "name": "cid",
            "type": "string",
            "doc": "Content Identifier of DSNP Verifiable Credential document"
        },
        {
            "name": "url",
            "type": "string",
            "doc": "Suggested URL of document"
        }
    ]
}
```

## Generation

### attributeSetType

- MUST be a [DSNP Attribute Set Type](../AttributeSets.md#attribute-set-type)

### cid

- MUST be a valid [Content IDentifier](https://github.com/multiformats/cid)
- Resource MUST be a [Verifiable Credential](../../VerifiableCredentials/VerifiableCredential.md) document

### url

- MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890)
- MUST use one of the supported URL Schemes
- CID of resource must match the `cid` field

#### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |
