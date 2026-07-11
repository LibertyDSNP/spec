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
| `keyAgreementPublicKeys` | `mlkem768-pub` _(optional)_ | A [ML-KEM-768](https://csrc.nist.gov/pubs/fips/203/final) (NIST FIPS 203, security level 3) public key for post-quantum key encapsulation; used in the [X-Wing](https://www.ietf.org/archive/id/draft-connolly-cfrg-xwing-kem-06.txt) hybrid KEM for encrypting private User Data and for post-quantum PRId delivery |
| `assertionMethodPublicKeys` | `ed25519-pub` | A public key for the EdDSA signature scheme using SHA-512 and Curve25519 that can be used to verify cryptographic signatures |
| `assertionMethodPublicKeys` | `mldsa65-pub` _(optional)_ | A [ML-DSA-65](https://csrc.nist.gov/pubs/fips/204/final) (NIST FIPS 204) public key for post-quantum digital signatures |

The optional post-quantum key types are backward-compatible additions.
Implementations that do not support post-quantum algorithms MUST ignore public keys encoded with unrecognized multicodec identifiers.
A user MAY publish both a classical and a post-quantum key of a given key type simultaneously; in that case, the convention that the key with the highest index is the active key applies independently within each algorithm family.
