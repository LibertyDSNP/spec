# DIDs

DSNP Users are referenced in Verifiable Credentials documents via DIDs compliant with the [Decentralized Identifiers v1.0](https://www.w3.org/TR/did-core/) specification.

Applications that make use of Verifiable Credentials issued by DSNP Users MUST be able to resolve DSNP User DIDs to DID documents in order to verify that signatures were created with keys controlled by that user.
A DSNP DID document is effectively a document aggregating DSNP User Data.
Compliant DSNP systems are encouraged to provide their own DID resolver libraries.

## DID Method Syntax

A DSNP DID uses `dsnp` (lowercase) as the method name and the DSNP User Id as the method-specific identifier, as the following example illustrates:

`did:dsnp:123456`

This DID identifies the DSNP User with User Id 123456.
In this format, the DSNP User Id is serialized in decimal form with no additional punctuation. 

References to identifiers within a DID document are formed by appending URL fragments to a DID.
For example, a Verifiable Credential might reference the public key to be used to verify a document's signature as `did:dsnp:123456#key1`, assuming the document included a `verificationMethod` with `"id": "key1"`.

## DID Document

A DSNP DID document is a JSON-LD document representing key material associated with a DSNP User.

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | YES | Array of strings | JSON-LD @context | MUST include `"https://www.w3.org/ns/did/v1"` |
| `id` | YES | String | The DID described by this document | MUST be of the form `did:dsnp:{userId}` |
| `verificationMethod` | NO | Array of Verification Method objects | Set of public keys that may be referenced from `assertionMethod`, `authentication`, and `keyAgreement` arrays |
| `assertionMethod` | NO | Array  | Set of public keys used to generate digital signatures | MUST include or reference all relevant keys present in DSNP User Data `assertionMethodPublicKeys` |
| `authentication` | NO | Array  | Set of public keys used as DSNP control keys | MAY include or reference any keys used as control keys |
| `keyAgreement` | NO | Array | Set of public keys used to generate shared secrets | MUST include or reference all relevant keys present in DSNP User Data `keyAgreementPublicKeys` |

Additional properties defined in the DID specification MAY be present.

### Public Key Representation

As per the DID specification, each element of the `assertionMethod` and `keyAgreement` arrays may be a string reference to the object with a matching `id` field in the `verificationMethod` array, or the Verification Method object itself.
Each Verification Method describes a public key.
These keys MUST be taken from the DSNP User Data associated with the user referenced by the DID.

DSNP DID resolvers MUST serialize keys in the Multikey format, defined in [Verifiable Credential Data Integrity 1.0](https://www.w3.org/TR/vc-data-integrity/).

| Property | Required | JSON Type | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | YES | String | JSON-LD @context | MUST be `https://w3id.org/security/multikey/v1` |
| `id` | YES | String | The full URI of this key | MUST be of the form `did:dsnp:{userId}#{identifier}`; MUST be unique within the document |
| `type` | YES | String | The type of this verification method | MUST be `Multikey` |
| `controller` | YES | String | The controller of this key | MUST be the DID of the enclosing document |
| `publicKeyMultibase` | YES | String | The public key | MUST be a valid multicodec-prefixed public key in `base58btc` encoding |

## Example

```json
{
  "@context": [
    "https://www.w3.org/ns/did/v1"
  ],
  "id": "did:dsnp:645313",
  "authentication": [
    {
      "@context": "https://w3id.org/security/multikey/v1",
      "id": "did:dsnp:645313#z6QP1gZa1xAGCtsPzZSc5mdTDtrGsWUyf12TmU6pSu15SXUr",
      "type": "Multikey",
      "controller": "did:dsnp:645313",
      "publicKeyMultibase": "z6QP1gZa1xAGCtsPzZSc5mdTDtrGsWUyf12TmU6pSu15SXUr"
    }
  ],
  "assertionMethod": [],
  "keyAgreement": [
    {
      "@context": "https://w3id.org/security/multikey/v1",
      "id": "did:dsnp:645313#z6LSoYFtPRBEizFQ2zYXEXBPP96t9gNFWjZVJTfXWqzMhw9e",
      "type": "Multikey",
      "controller": "did:dsnp:645313",
      "publicKeyMultibase": "z6LSoYFtPRBEizFQ2zYXEXBPP96t9gNFWjZVJTfXWqzMhw9e"
    }
  ]
}
```
