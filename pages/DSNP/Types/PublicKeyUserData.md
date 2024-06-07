# Public Key

Represents an encoding of a public key, one half of a cryptographic key pair.

## Serialization

PublicKey object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "PublicKey",
    "type": "record",
    "fields": [
        {
            "name": "publicKey",
            "type": "bytes",
            "doc": "Multicodec public key"
        }
    ]
}
```

## Generation

### publicKey

- MUST be a public key of an allowed key type for the associated User Data type, encoded in `multicodec` format

The byte encoding consists of a [multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv) key identifier (as a varint) followed by the public key's binary data in the codec's described format.

#### Allowed Key Types

| User Data Type | Allowed Algorithms ([multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv)) | Purpose |
| --- | --- | --- |
| `keyAgreementPublicKeys` | `x25519-pub` |  A Curve25519 public key that can be used in key exchange protocols to generate a shared secret |
| `assertionMethodPublicKeys` | `ed25519-pub` | A public key for the EdDSA signature scheme using SHA-512 and Curve25519 that can be used to verify cryptographic signatures |
