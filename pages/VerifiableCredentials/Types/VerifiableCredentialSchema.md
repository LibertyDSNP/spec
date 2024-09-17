# Verifiable Credential Schema

The schema for a DSNP Verifiable Credential MAY be defined using the format described in the [Verifiable Credentials JSON Schema](https://www.w3.org/TR/vc-json-schema/) W3C Candidate Recommendation Draft.
This format provides a credential wrapper around a JSON schema document.

Empty schemas (Verifiable Credential Schema Documents with `"jsonSchema": {}`) are allowed; however, schemaless credentials may be preferred in this situation.
Empty schemas are useful in situations where no attribute data fields are relevant but the schema author wishes to assert authorship.

## Verifiable Credential Schema Document

A Verifiable Credential Schema document is a JSON-LD document that is itself a [Verifiable Credential](./VerifiableCredential.md) with a claim that includes the schema and (optionally) the DSNP extension described below.
A schema credential specializes the meaning of the following fields:

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | YES | Array of strings | Type of credential | MUST contain the strings `"VerifiableCredential"` and `"JsonSchemaCredential"` |
|`credentialSubject` | YES | Object | Object containing JSON schema and DSNP extensions | See [Credential Subject](#credential-subject) |
| `credentialSchema` | YES | Object | Metaschema defining JSON Schema types | See [Credential Schema](#credential-schema) |

### Credential Schema
The required `credentialSchema` object MUST follow the specification and contain:

```
{
  "id": "https://www.w3.org/2022/credentials/v2/json-schema-credential-schema.json",
  "type": "JsonSchema",
  "digestSRI": "sha384-S57yQDg1MTzF56Oi9DbSQ14u7jBy0RDdx0YbeV7shwhCS88G8SCXeFq82PafhCrW"
}
```

### Credential Subject

A DSNP Verifiable Credential Schema document's `credentialSubject` object uses the following keys:

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | YES | String | Type of subject matter | MUST be `JsonSchema` |
| `jsonSchema` | YES | Object | Embedded JSON Schema object | See [JSON Schema](#json-schema) |
| `dsnp` | no | Object | DSNP extension object | See [DSNP Extensions](#dsnp-extensions) |

#### JSON Schema

The JSON Schema object is formed as follows:

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `$schema` | YES | String | JSON Schema version identifier | MUST be a valid DSNP JSON Schema version |
| `title` | YES | String | Title of the schema | MUST match a string within the referencing credential's `type` array |

The remainder of the schema object should be interpreted as per the relevant JSON schema specification.

##### Valid DSNP JSON Schema Versions

DSNP applications MUST support the following JSON Schema versions:

| `$schema` value | Specification |
| --- | --- |
| `https://json-schema.org/draft/2020-12/schema` | [JSON Schema 2020-12 Update](https://json-schema.org/draft/2020-12/release-notes) |

Other JSON Schema versions MAY be supported, but creators should be aware that not all DSNP applications will be able to correctly validate credentials against schema definitions that are not universally supported.

#### DSNP Extensions

An optional `dsnp` object within the `credentialSubject` provides additional semantics for DSNP applications and users interacting with the schema.

##### Display Extension

The optional `display` key within the `dsnp` extension object MUST contain a `label` key that has an object value where the object is a map of one or more language tags to human-readable string values.
Language tags should follow [BCP-47/RFC-5646](https://www.rfc-editor.org/rfc/rfc5646.html)  (as used in the HTTP `Content-Language` header).
A content language key of `"*"` indicates a wildcard or default value, as in HTTP.

Example:
```json
"display": {
  "label": {
    "en-US": "Verified User",
    "de-DE": "Verifizierter Benutzer"
  }
}
```

A DSNP application MAY use the indicated values as a hint when displaying information about the subject of a Verifiable Credential utilizing this schema.

##### Trust Extension

The optional `trust` key within the `dsnp` extension object enables the author of a schema to describe the types of Verifiable Credentials that an issuer of credentials with this schema must have to be considered an accredited source and therefore trusted by an application.
These accreditations MUST be included by the issuer using the `authority` key under `issuer` in each relevant [Verifiable Credential](./VerifiableCredential.md#issuer) document they create.

The `trust` object contains one or both of the `oneOf` or `allOf` keys, each containing an array of strings.
Each string MUST be a valid DSNP Attribute Set Type.

See [Attribute Sets](../../DSNP/AttributeSets.md) for a detailed discussion of Attribute Set Types and their derivation.

A `trust` object containing both `oneOf` and `allOf` sections should be construed as requiring any of the `oneOf` constraints as well as all of the `allOf` constraints.

Example:
```json
"trust": {
  "oneOf": [
    "did:dsnp:123456$AppleProducer",
    "did:dsnp:123456$OrangeProducer"
  ],
  "allOf": [
    "did:dsnp:999999$FairTradeProducer"
  ]
}
```

The above example might be translated as "A credential conforming to this schema should only be trusted if its issuer is accredited as a `FairTradeProducer` and is also either an `AppleProducer` or an `OrangeProducer`."

## Example

```json
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2"
  ],
  "id": "https://dsnp.org/schema/examples/vehicle_owner.json",
  "type": [
    "VerifiableCredential",
    "JsonSchemaCredential"
  ],
  "issuer": "did:dsnp:123456",
  "issuanceDate": "2024-02-12T03:09:40.497Z",
  "expirationDate": "2099-01-01T00:00:00.000Z",
  "credentialSchema": {
    "id": "https://www.w3.org/2022/credentials/v2/json-schema-credential-schema.json",
    "type": "JsonSchema",
    "digestSRI": "sha384-S57yQDg1MTzF56Oi9DbSQ14u7jBy0RDdx0YbeV7shwhCS88G8SCXeFq82PafhCrW"
  },
  "credentialSubject": {
    "type": "JsonSchema",
    "jsonSchema": {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "title": "VehicleOwner",
      "type": "object",
      "properties": {
        "credentialSubject": {
          "type": "object",
          "properties": {
            "make": {
              "type": "string"
            },
            "model": {
              "type": "string"
            },
            "year": {
              "type": "number"
            }
          },
          "required": [
            "make",
            "model",
            "year"
          ]
        }
      }
    },
    "dsnp": {
      "display": {
        "label": {
          "en-US": "Vehicle Owner"
        }
      },
      "trust": {
        "oneOf": [
          "did:dsnp:123456$AuthorizedCarDealership",
          "did:dsnp:123456$OfficialTaxOffice"
        ]
      }
    }
  },
  "proof": {
    "type": "DataIntegrityProof",
    "created": "2024-02-12T03:09:44Z",
    "verificationMethod": "did:dsnp:123456#z6MkhFqFV1UD6GYbQ1V4HSF3pnGprovQceXbgwbLKrhxnbny",
    "cryptosuite": "eddsa-rdfc-2022",
    "proofPurpose": "assertionMethod",
    "proofValue": "z3ENMBo7UyKvZkJSBMqvGFDB1uvGChP1QTEgiCsNzt23ciq4RTffk2xxz2noXxxHL6wPmN1Bp2fSvTuMnvHQFP9tp"
  }
}
```
