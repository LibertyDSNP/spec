# Attribute Sets

Attribute sets are sender-controlled data, associated with DSNP users (self or others), DSNP content, or any other content (original or not) that has a public URL.
Attribute sets have a cryptographically authenticated creator, and a subject (the entity being described), which may be the same.
Attribute data can be published as a DSNP Announcement for all to see, or only revealed on demand, and may be represented by simple or complex data types.
Attribute sets can be tombstoned.

## Announcement Types

Attribute Sets are expressed using three announcement types.

1. A _User Attribute Set_ Announcement (8), where the subject is identified by its DSNP User Id.
1. A _DSNP Content Attribute Set_ (9), where the subject is identified by its DSNP Content URI.
1. An _External Content Attribute Set_ (10), where the subject is identified by its URL and hashcode.

## Attribute Set data

The data of an attribute set is represented as a claim (or set of claims) within a credential document.
Credential documents are anchored to the announcement by the `url` and `hash` fields.

### Verifiable Credential format

Credentials should conform to the [Verifiable Credentials Data Model](https://www.w3.org/TR/2022/REC-vc-data-model-20220303/), expressed in JSON.

A DSNP Verifiable Credential Document MUST contain the following fields:

* `@context`, as specified by W3C:
  * MUST be an array
  * MUST include the string "`https://www.w3.org/2018/credentials/v1`"
* `type`
  * MUST be an array
  * MUST contain the string "`VerifiableCredential`"
  * If a schema document is specified, MUST also contain a string matching the schema's name property.
* `issuer`
  * This field is required, even for credential documents that do not include attestation. It MUST be a DSNP DID. Unsigned documents should use the document creator's DID.
* `issuanceDate`
  * As specified by W3C.
* `credentialSubject` – containing two parts:
  * An `id` that identifies the subject of the claim data. This MUST correspond with the `subject` field in an Attribute Set Announcement: for a User Attribute Set, it should be a DSNP User URI; for a DSNP Content Attribute Set, it should be a DSNP Content URI; and for an External Content Attribute Set, it should be the URL of an online document on the web accessible by HTTPS.
  * The "claim" (in W3C parlance) that is being made about the subject, in the format specified by the Attribute Set Type's schema.

A DSNP Verifiable Credential Document MAY optionally contain the following fields

* `id`
  * As specified by W3C.
* `expirationDate`
  * As specified by W3C.
* `credentialSchema`
  * MUST be an object
  * MUST include an `id` property that is a URL for the schema document
* `credentialStatus`
  * As specified by W3C.
* `proof`
  * As specified by W3C.

## Attribute Set Type

Any number of Attribute Sets may share an Attribute Set Type, which defines a schema for attribute set data.
Attribute Set Types have a well known canonical name and (in most cases) a well defined schema, expressed using a W3C Verifiable Credential Schema document.

DSNP supports (but does not mandate) Attribute Set Types that can be described in different Verifiable Credential Schema documents over time in order to address the needs of schema evolution, while preserving backward and forward compatibility.
Proof signatures from a given DSNP user (the schema author) tie different schema documents to the same well known Attribute Set Type via a canonical naming scheme.
This allows applications to perform reliable lookups against a canonically named Attribute Set Type, regardless of the specific version that may be used by an individual credential document.

### Verifiable Credential Schema compatibility

The schema for an attribute set type may be defined using the format described in the Verifiable Credential JSON Schemas proposal.
This format provides a metadata wrapper around a JSON schema document.

Empty schemas (Verifiable Credential Schema Documents with `"jsonSchema": {}`) are allowed; however, schemaless attribute set types may be preferred in this situation.
Empty schemas are useful in situations where no attribute data fields are relevant but the schema author wishes to assert authorship.

A DSNP Verifiable Credential Schema Document MUST contain the following fields:

* `@context`, as specified by W3C:
  * MUST be an array
  * MUST include the string ""https://www.w3.org/2018/credentials/v1"
* `type`
  * MUST be an array
  * MUST contain the strings `"VerifiableCredential"` and `"JsonSchemaCredential"`
* `issuer`
  * This field is required, even for credential schema documents that do not themselves include attestation. It MUST be a DSNP DID. Unsigned documents should use the document creator's DID.
* `issuanceDate`, as specified by W3C
* `credentialSubject`, containing the JSON schema as specified by W3C
  * `type` MUST be `"JsonSchema"`
  * `jsonSchema` MUST be a valid JSON Schema 2020-12 object
    * `$schema` MUST be `"https://json-schema.org/draft/2020-12/schema"`
    * `title` MUST match a string within the referencing credential's `type` array. The `title` property is used in the canonical naming algorithm below.

To aid with canonical naming and schema evolution, a DSNP Verifiable Credential Schema Document MAY contain the following fields:

* `proof`, an object with the following properties
  * `type` MUST be `"DataIntegrityProof"`
  * `cryptosuite` MUST be `"eddsa-2022"`
  * `verificationMethod` MUST reference a valid public key in DID form
  * `created` timestamp as specified by W3C
  * `proofPurpose` MUST be `assertionMethod`
  * `proofValue` MUST be a multibase-encoded signature. The signature is generated using the JSON Linked Data Signatures algorithm.

Schema documents MAY have `proof` sections that do not conform to the above requirements, but if so, they are not eligible for the canonical naming scheme.

### Canonical naming

All Attribute Set Announcement Types use an `attributeSetType` field.
This field is designed to provide a unique name for an Attribute Set Type, namespaced to avoid collision with incompatible schema files.

Attribute Set Type canonical names are constructed as follows:

* MUST be in the format `_attributeSetTypeNamespace_` + "`#`" + `attributeSetTypeName`, where `attributeSetTypeNamespace` MUST be either a multihash content hash (encoded as a multibase string), the DSNP DID of the schema author (beginning with "`did:dsnp:`"), another DID for the schema author that is trusted by the implementation (beginning with the string "`did:`"), or the empty string (for schemaless attribute set types).
* `attributeSetTypeName` MUST match a declared type value in the Attribute Set Value Document
* If `attributeSetTypeNamespace` is a DID, it must match the schema author in the schema referenced from the credential document, and the schema must include a proof that can be verified using the author's public key.
* If `attributeSetTypeNamespace` is empty, the credential document MUST NOT reference a schema.
* If `attributeSetTypeNamespace` is a multibase string, it must match the multihash content hash of the schema file referenced from the credential document.

Examples:

* Schemaless: `#IsHuman`
* Unsigned schema: `zQmQNHNfHnbgJJ6nK4UPx2VtTUCafAKCbqZJ6ZRYUGjoeFj#BSC`
* Signed schema: `did:dsnp:12345678909876#TimeZone`

## Public Key references

Both Verifiable Credential Schema documents and Verifiable Credential documents may include proof sections.
It is expected (though not mandated) that these will often use cryptographic signatures based on the author or issuer's key.

DSNP Users may announce a Public Key for use in signing these documents by using the [Public Key Announcement](Types/PublicKey.md) with the key type of `assertionMethod`.
A key announced in this fashion can be referenced using a DSNP URI as follows:
`did:dsnp:_dsnpUserId_#_keyIdentifier_`

In this format, the DSNP User Id is a 64-bit unsigned integer, represented in decimal form.
The key identifier is system-specific.

A verifier must ensure that the DSNP User Id referenced this way is the same as the author or issuer field.

The key pair used as an assertion method SHOULD be different from any control keys used to authenticate transactions.

## Trust and verification

Trust in an attribute set may be assigned based on a combination of the announcement's `sender` and `issuer`. It is left to the DSNP consumer to determine which attribute sets it will trust.

Trust SHOULD be accompanied by verification of the documents linked to an Attribute Set Announcement.

TODO write more here about the `trust` section.

### Summary of verification responsibilities

When verifying a credential document, a consumer SHOULD:

* Retrieve the Credential Document from the `url` field (or, for on-demand credentials, receive the credential document by some other mechanism).
* Verify that the content hash of the Credential Document matches the value specified in the Attribute Set Announcement's `contentHash` field. (This is the same operation as required for other content-anchoring announcements.)
* Verify that the credential document is well formed (it should comply with the generic JSON schema for verifiable credential documents, and include a valid combination of fields).
* Verify that the credential's `expirationDate`, if present, has not passed.
* If the subject of the credential document is not a URL beginning with "`dsnp://`", verify the `subjectContentHash` by retrieving the subject URL and applying the indicated hash function. URLs beginning with "`dsnp://`" do not need a hash check as they already include a self-reflective content hash. They should, however, be checked for existence.
* If present, retrieve the Credential Schema Document from the URL specified in the `credentialSchema.id` field.
* Validate the Credential Schema Document against the generic JSON schema for Verifiable Credential Schema.
* Validate that the claim content in the `credentialSubject` field conforms to the schema.
* Construct the `attributeSetType` for the document by following the rules for schemaless, unsigned, and signed schemas, and ensure it matches the announcement. Note that this MAY require verification of the author proof of the Verifiable Credential Schema.
* Verify the issuer proof, if present.

Verifiers should take care that transient errors (for example, a URL being unreachable due to temporary network issues) do not lead to false negatives.
