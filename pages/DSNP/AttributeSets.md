# Attribute Sets

Attribute sets enable structured data to be associated with DSNP users (self or others), DSNP content, or any other content (original or not) that has a public URL.
Attribute sets have a cryptographically authenticated creator, and a subject (the entity being described), which may be the same.
Attribute set data may appear in several modes: it can be published as a DSNP Announcement, attached to a user's Profile document, or attached to social media content.

## Data Model

The conceptual model for Attribute Sets includes three types of data:

1. A schema encoding rules for validating attribute set data. This MUST be in the form of a [DSNP Verifiable Credential Schema](../VerifiableCredentials/Types/VerifiableCredentialSchema.md) (a Verifiable Credential that contains a JSON Schema document).
2. The attribute set data itself. This MUST be serialized as a [DSNP Verifiable Credential](../VerifiableCredentials/Types/VerifiableCredential.md).
3. A reference to the attribute set data, which may take one of several different forms depending on the desired usage pattern.

## Attribute Set Type

An Attribute Set Type is an identifier that is used to group Attribute Sets that share the same data structure and semantic meaning.
Attribute Set Types have a well known canonical name and (in most cases) a well defined schema, expressed using a Verifiable Credential Schema document.

### Versioning

DSNP supports (but does not mandate) Attribute Set Types that can be described in different Verifiable Credential Schema documents over time in order to preserve backward and forward compatibility.
This allows the exact details of the schema to evolve over time without compromising the discovery and verifiability of previously shared credentials.

This behavior is achieved by allowing a schema issuer to retain a common identifier across multiple versions of a schema, provided that the proof signatures are all issued from the same DSNP user (the schema author).
This allows applications to perform reliable lookups against an Attribute Set Type, regardless of the specific version that may be used by an individual credential document.
This is facilitated by the following naming scheme.

### Canonical naming

Attribute Set Type canonical names are constructed as follows:

* MUST be in the format _attributeSetTypeNamespace_ + "`$`" + _attributeSetTypeName_, where _attributeSetTypeNamespace_ MUST be either a multihash content hash (encoded as a multibase string), the DSNP DID of the schema author (beginning with "`did:dsnp:`"), or the empty string (for schemaless attribute set types).
* _attributeSetTypeName_ MUST match a declared type value in the Verifiable Credential document
* If _attributeSetTypeNamespace_ is a DID, it must match the issuer of the Verifiable Credential Schema document referenced from the credential document, and the schema document must include a proof that can be verified using the issuer's public key.
* If _attributeSetTypeNamespace_ is empty, the credential document MUST NOT reference a schema.
* If _attributeSetTypeNamespace_ is a multibase string, it must match the multihash content hash of the schema file referenced from the credential document.

Examples:

- Schemaless: `$IsHuman`
- Unsigned schema: `bciqoatksnf4szlitvzfpsdgzegmkmz74i4mpsmb76q7pro42c6fvpzq$BSC`
- Signed schema: `did:dsnp:1234567890$TimeZone`

## Usage Patterns

### Attribute Set Announcements

The Announcement model allows Attribute Sets to be consumed as events providing context or metadata to the social network.
Attribute Set Announcements allow DSNP Users to associate data or make assertions about their own account, other DSNP Users, content on DSNP, or even content external to DSNP.
Credential documents are anchored to the announcement by the `url` and `hash` fields.

Applications consuming these Announcements can index and use the associated Attribute Sets to inform their user experience.
For example, a fact-checking organization can publish Attribute Set announcements to flag content it deems to be misinformation, and interested applications that trust the organization's determinations can provide warning labels on social media posts.
Similarly, an organization might attach metadata in the form of Attribute Sets to denote DSNP User Ids that are operated by government actors.

Attribute Set Announcements cannot be updated once published, but can be tombstoned.
Applications MUST treat tombstoned Attribute Set Announcements as nonexistent.

#### Announcement Types

Attribute Set announcements are expressed using three announcement types, depending on the type of subject being described.

| Announcement Type | Id | Subject identifier |
| --- | --- | --- |
| [User Attribute Set](./Types/UserAttributeSet.md) | 8 | [DSNP DID](../VerifiableCredentials/Types/DID.md) |
| [DSNP Content Attribute Set](./Types/DSNPContentAttributeSet.md) | 9 | [DSNP Content URI](./Identifiers.md#dsnp-content-uri) |
| [External Content Attribute Set](./Types/ExternalContentAttributeSet.md) | 10 | URL and hash |

### Attestation Attachments

Attribute Sets associated with and controlled by a DSNP User can be referenced as [Attestation Attachments](../ActivityContent/Associated/Attachments.md#attestation) to a user's [Profile](./Types/Profile.md) document, or to an Activity Content Note object that is referenced from a Broadcast or Reply announcement.

Profile-linked attestations are necessary in cases where an attestation is required in order for a consumer to verify chains of trust designated by schema controllers, such as an accreditation that gives the organization represented by the DSNP User Id the authority to issue credentials to others.

Applications enabling users to update their Profile document should take care to preserve any Profile-linked attestations, even if the meaning of these is opaque to the updating application.

Attestation attachments link to credentials that identify a DSNP User as their subject.
That is, the `credentialSubject.id` field should match the user's DSNP DID.

### On-Demand Presentation

Holders of Verifiable Credentials may wish to present these only on demand rather than have a public record of the credential.
Several emerging specifications are developing for this usage pattern and are outside the scope of this specification.
Developers are encouraged to consider the [Verifiable Presentation Request](https://w3c-ccg.github.io/vp-request-spec/) specification.

## Public Key References

Both Verifiable Credential Schema documents and Verifiable Credential documents may include proof sections.

DSNP Users may control one or more key pairs for use in signing these documents and make these discoverable using the `assertionMethod` User Data type.
A key announced in this fashion can be referenced within the proof using a [DSNP DID](../VerifiableCredentials/Types/DID.md) with a key identifier, as in `did:dsnp:123456#key1`.

A verifier must ensure that the DSNP User Id referenced this way (that is, the substring of the DID before the first `#` character) is the same as the issuer field.

Following the principle of least privilege, the key pair used to issue credentials SHOULD be different from any control keys used to authenticate transactions.

## Trust and Verification

Trust in an attribute set may be assigned based on a combination of its Attribute Set Type and issuer.
It is left to each application that acts as a DSNP consumer to determine which attribute sets it will trust.

Trust MUST be accompanied by verification of the documents linked to an Attribute Set reference.

### Summary of Verification Responsibilities

When verifying a credential document, a consumer MUST:

* Retrieve the Verifiable Credential document from the announcement or attachment link's `url` field (or, for on-demand credentials, receive the credential document by some other mechanism).
* Calculate and verify that the content hash of the credential document matches the value specified in the referring item (an Attribute Set Announcement's `contentHash` field, for example).
* Verify that the credential document is well formed (it should comply with the generic JSON schema for verifiable credential documents, and include a valid combination of fields).
* Verify that the credential's expiration date (the `expirationDate` or `validUntil` field), if present, has not passed.
* If the subject of the credential document is not a URL beginning with "`dsnp://`", verify the `subjectContentHash` by retrieving the subject URL and applying the indicated hash function. URLs beginning with "`dsnp://`" do not need a hash check as they already include a self-reflective content hash. They should, however, be checked for existence.
* Retrieve the schema document from the URL specified in the `credentialSchema.id` field.
* For schema of type `JsonSchemaCredential`, validate the schema document against the generic JSON schema for Verifiable Credential Schema, and validate the credential document against the JSON schema found in the Verifiable Credential Schema document's `credentialSubject.jsonSchema` property.
* For schema of type `JsonSchema`, validate that the schema document is a well formed JSON schema, then validate the credential document against the schema document.
* Construct the `attributeSetType` for the credential document by following the rules for schemaless, unsigned, or signed schemas, and ensure it matches the declared type in the announcement or link object. Note that this MAY require verification of the issuer proof of the Verifiable Credential Schema, and potentially a chain of trust (see below).
* Verify the issuer proof on the credential document, if present.

Verifiers should take care that transient errors (for example, a URL being unreachable due to temporary network issues) do not lead to long-term caching of false negatives.

### Trust chains

Applications are free to make their own trust decisions, and display or incorporate Verifiable Credentials based on their `issuer`.
However, in many real world scenarios, the originator of a particular type of credential may authorize agents to issue the credential, based on any number of approval or certification processes external to DSNP.
When utilizing Verifiable Credential Schema documents, the originator of a DSNP Attribute Set Type can encode its requirements for trusted agents within a DSNP extension field.

To do so, DSNP uses an optional, protocol-specific `trust` key within the `dsnp` key under the `credentialSubject` section of the schema credential. 
The `trust` key can contain one or both subkeys `oneOf` or `allOf`, which in turn contain a list of Attribute Set Types, or further embedded `oneOf` or `allOf` groupings.
These indicate to the consumer that the author of the credential schema requires that a credential of the defined type be trusted only if its issuer can be shown to possess Verifiable Credentials of the indicated type.

In the case of `oneOf`, the verifier should check that the issuer is the subject of a Verifiable Credential conforming to at least one of the given Attribute Set Types.
In the case of `allOf`, the verifier should check that the issuer is the subject of Verifiable Credentials for every given Attribute Set Type.

For example, the Worldwide Whale Foundation, identified by DSNP User Id 123456, may authorize its agents, including Acme Ocean Certification Lab, to issue credentials of type `did:dsnp:123456$CertifiedWhaleBiologist` to individuals that meet the certification standard that the Foundation defines.
The Worldwide Whale Foundation defines a second attribute set type, `did:dsnp:123456$AuthorizedWhaleBiologistCertifier` by publishing a Verifiable Schema Credential for that type, and then issues a Verifiable Credential of that type (an accreditation) to Acme Ocean Certification Lab, which is then published online.
Worldwide Whale Foundation then includes the `did:dsnp:123456$AuthorizedWhaleBiologistCertifier` Attribute Set Type in the `credentialSubject.dsnp.trust.allOf` array of the `CertifiedWhaleBiologist` Verifiable Credential Schema (in this example, using `oneOf` would be equivalent), generates and attaches the signature proof, and publishes the schema document.
When Acme Ocean Certification Lab wants to issue `did:dsnp:123456$CertifiedWhaleBiologist` credentials to users, it should include the URL, attribute set type, and content hash of its accreditation credential in the `issuer.authority` array of each credential issued.
A consumer of the credential can retrieve and verify that Acme Ocean Certification Lab is an accredited issuer.

### Displaying credentials

The DSNP schema credential document MAY contain an additional `display` key within the `dsnp` key under `credentialSubject`.
This allows the authors of attribute set types to recommend how a credential should be displayed within a user interface.

To allow for localizable text, a map of content language codes (following `BCP-47`, so using the same form as the HTTP `Content-Language` header) to display text can be used under the subkey `label`.

Example:
```
...
"credentialSubject": {
  "type": "JsonSchema",
  "jsonSchema": {
    ...
  },
  "dsnp": {
    "display": {
      "label": {
        "en-US": "Whale Biologist",
        "es-ES": "Biólogo de Ballenas"
      }
    }
  }
}
```

DSNP applications should treat the `display` section as a recommendation but not a mandate, and are free to indicate the presence or absence of a Verifiable Credential in other forms.
