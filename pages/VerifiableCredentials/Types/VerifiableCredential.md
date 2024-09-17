# Verifiable Credential

Credentials should conform to the [Verifiable Credentials Data Model 1.1](https://www.w3.org/TR/vc-data-model-1.1/) or [Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/), expressed as [JSON-LD](https://json-ld.org/).
The fields noted below consist only of those with requirements or semantics that differ from the underlying specification.

## JSON-LD Contexts

The following JSON-LD context values are valid for use with DSNP:

| Object | `@context` |
| --- | --- |
| Verifiable Credential | `https://www.w3.org/2018/credentials/v1`<br>`https://www.w3.org/ns/credentials/v2` |

## Verifiable Credential Document

A DSNP Verifiable Credential JSON document specializes the following fields:

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | YES | Array of strings | JSON-LD @context | MUST include `"https://www.w3.org/2018/credentials/v1"` or `"https://www.w3.org/ns/credentials/v2"` |
| `type` | YES | Array of strings | Type of credential | MUST contain `"VerifiableCredential"` per specification; if a `credentialSchema` is present, MUST also contain a string matching the referenced JSON Schema's `title`.  |
| `issuer` | YES | String or Object | DID or object identifying credential issuer | See [Issuer](#issuer) |
|`credentialSubject` | YES | Object | Object identifying subject and claim | See [Credential Subject](#credential-subject) |
| `credentialSchema` | no | Object | Reference to schema for this credential | See [Credential Schema](#credential-schema) |
| `proof` | no | Object | Cryptographic proof of authorship by `issuer` | See [Proof](#proof) |

### Issuer

The `issuer` field is required, even for credentials that do not include a `proof`.
Unsigned documents should still use the document creator's DID.

The `issuer` field may be a string that is the issuer's DID, or an object with the issuer's DID as the `id` property.

In the object form, the issuer may optionally include references to its own credentials, which may be used by a verifier processing the DSNP [trust extension](./VerifiableCredentialSchema.md#trust-extension).

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `id` | YES | String | DID of issuer | Must be a [DSNP DID](./DID.md) |
| `authority` | no | Array | List of relevant credentials with issuer as subject | See [Authority](#authority) |

#### Authority

Objects in the `issuer.authority` array MUST have the following properties:

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `id` | YES | String | URL of Verifiable Credential | MUST be a DSNP Verifiable Credential |
| `rel` | YES | String | The linked credential's attribute set type | MUST be a DSNP [Attribute Set Type](../../DSNP/AttributeSets.md#attribute-set-type) corresponding to the referenced credential document |
| `digestMultibase` | YES | Array |  Array of hashes for linked content validation | MUST include at least one [supported hash](../../ActivityContent/Associated/Hash.md#supported-algorithms) |

Examples:

```
"issuer": "did:dsnp:86420"
```

```
"issuer": {
  "id": "did:dsnp:86420",
  "authority": [
    {
      "id": "https://mydsnpcreds.net/86420-fp",
      "rel": "did:dsnp:123456$FairTradeProducer",
      "digestMultibase": [
        "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q"
      ]
    },
    {
      "id": "https://mydsnpcreds.net/86420-ap",
      "rel": "did:dsnp:123456$AppleProducer",
      "digestMultibase": [
        "bdyqhwoxp2mc6oyaqpqyd2fvaxralslk32ggazv6nxpp342iec6652tq"
      ]
    }
  ]
}
```

### Credential Subject

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `id` | YES | String | Subject of the claim data | If describing a DSNP User, MUST be a [DSNP User URI](../../DSNP/Identifiers.md#dsnp-user-uri); if describing DSNP content, MUST be a [DSNP Content URI](../../DSNP/Identifiers.md#dsnp-content-uri) |

The remainder of the contents of the `credentialSubject` value MUST conform to the JSON schema found via the `credentialSchema` object.

### Credential Schema

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `id` | YES | String | URL of schema document | If `type` is `JsonSchemaCredential`, MUST reference a [DSNP Verifiable Credential Schema](./VerifiableCredentialSchema.md) |

### Proof

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | YES | String | Proof type | MUST be `DataIntegrityProof` |
| `verificationMethod` | YES | String | URI of public key | MUST reference a public key within a [DSNP DID](./DID.md) document |
| `cryptosuite` | YES | String | Cryptographic algorithm identifier | MUST be `eddsa-rdfc-2022` |
| `proofPurpose` | YES | String | Context for assessing proof | MUST be `assertionMethod` |
| `proofValue` | YES | String | Digital signature proof | MUST be a multibase-encoded signature using `base58btc` encoding |

## Example

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2"
  ],
  "type": [
    "VehicleOwner",
    "VerifiableCredential"
  ],
  "issuer": "did:dsnp:654321",
  "issuanceDate": "2024-02-12T03:09:40.497Z",
  "credentialSchema": {
    "type": "JsonSchemaCredential",
    "id": "https://dsnp.org/schema/examples/vehicle_owner.json"
  },
  "credentialSubject": {
    "id": "dsnp://999999",
    "make": "DeLorean",
    "model": "DMC-12",
    "year": 1981
  },
  "proof": {
    "type": "DataIntegrityProof",
    "created": "2024-02-12T03:09:44Z",
    "verificationMethod": "did:dsnp:654321#z6Mkumvf8FpJybzi9byLX7qAhTPuKpqH7d5rWyqcrKJ9Mies",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    "proofValue": "z2YLydotgaGsbRGRxPzmoscd7dH5CgGHydXLKXJXefcT2SJGExtxmkJxGfUGoe81Vm62JGEYrwcS6ht1ixEvuZF9c"
  }
}
```
