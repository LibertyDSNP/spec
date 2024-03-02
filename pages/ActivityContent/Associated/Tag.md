# Associated Type: Tag

[Activity Vocabulary: tag](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tag)

## Hashtag

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | YES | The text of the tag |  |

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "I love the #dsnp spec!",
  "mediaType": "text/plain",
  "tag": [
    {
      "name": "#dsnp"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Mention

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The text of the tag |  |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the tag as type `Mention` |  MUST be `Mention`  |
| `id` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | Link to the user mentioned | MUST be a [DSNP User URI](../../DSNP/Identifiers.md#dsnp-user-uri) |

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "@sally should check out the #dsnp spec!",
  "mediaType": "text/plain",
  "tag": [
    {
      "name": "#dsnp"
    },
    {
      "name": "@sally",
      "type": "Mention",
      "id": "dsnp://12345678"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Interaction

Activity objects that support the `tag` vocabulary may include or link to credentials that conform to DSNP's [Attribute Set](../../DSNP/AttributeSets.md) model in the form of an Interaction.
This enables simple discovery of credentials and attestation that may be relevant for a user to include on their DSNP profile or relate to a specific content item being broadcast.

In contrast to the credentials that accompany User Attribute Set Announcements, Interactions may occur anonymously; the Verifiable Credential does not need to address a specific DSNP User as its subject.
This allows for the issuance of Interaction credentials outside of an authenticated DSNP application context, and in scenarios where users wish to remain anonymous to the issuer.
Within the context of DSNP, these credentials are called _tickets_.

An interaction tag consists of a reference URL (the `href` field), a relationship identifier in the form of a DSNP Attribute Set Type (the `rel` field), an interaction nonce as described below (the `nonce` field), and an interaction ticket (a Verifiable Credential that minimally includes an `interactionId` and repeats the `href` field, but may contain other data as defined by a [Verifiable Credential Schema](../../VerifiableCredentials/Types/VerifiableCredentialSchema.md)).

Proof that the ticket was issued to the subject responsible for posting the content that includes the interaction tag is produced and verified using a cryptographic hash.
To acquire an anonymous Interaction ticket, a DSNP User generates and records a random nonce of any length (192 bits or more is recommended).
The user then concatenates their DSNP User Id (in little-endian 64-bit format) with the nonce and generates a message digest using a [supported hashing algorithm](Hash.md#supported-algorithms).
The multibase-encoded hash output is then sent to the credential issuer to be included as an `interactionId` key in the `credentialSubject` field of the generated document.
It is intentionally opaque to the issuer.
The issuer may include any other fields relevant to the document schema in the `credentialSubject`, and then generate a signature proof.
The signed credential (ticket) is then included in the interaction tag (see example).

When posting content including the Interaction tag, the user must include the nonce (as the `nonce` key) in order for consuming applications to verify that the originator of the content is responsible for generating the interaction.
A verifier MUST inspect the DSNP User Id of the sender of the content (via the relevant announcement) and the nonce, and repeat the hashing process to verify that it matches the value from `interactionId`.

Issuers of interaction tickets are encouraged to use the `display` extension described in the DSNP [Verifiable Credential Schema](../../VerifiableCredentials/Types/VerifiableCredentialSchema.md#display-extension) documentation to provide applications with hints as to how a verified interaction may be displayed, for example as a badge on a profile or content post.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the tag as type `Interaction` |  MUST be `Interaction`  |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | URI of tagged item | MUST be the same as the corresponding field within the `credentialSubject` |
| `rel` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | URI of tagged item | MUST be a DSNP [Attribute Set Type](../../DSNP/AttributeSets.md#attribute-set-type) corresponding to the interaction ticket credential document |
| `nonce` | DSNP extension | YES | Multibase-encoded random byte string (a minimum deserialized size of 24 bytes is recommended) |  |
| `ticket` | DSNP extension | YES | W3C Verifiable Credential object | MUST include `interactionId` and `href` within its `credentialSubject` field |

### Provenance of Tickets (Non-Normative)

Part of the provenance of a ticket relies upon having a DSNP User Id and nonce that are hashed by the requester of the ticket.
Ideally, the requester could prove that they were the user indicated by the DSNP User Id.
Similar assertions are often done by providing signatures: the user could sign a message including their User Id with the private key associated with a public key they manage as user data, in much the same way that the issuer of a Verifiable Credential creates a signature proof.

However, because DSNP does not prevent multiple users from associating the same public key with their accounts, it would be possible, for example, for Alice to obtain a ticket in Bob's name and give it to Bob to post, as long as Bob represents that the corresponding public key is his own by listing it as one of his DSNP public keys.
Therefore, the provenance guarantee offered by the hashing approach on an otherwise anonymous ticket is ultimately equivalent.
Because of this, applications should _not_ infer that the ticket requester and sender are necessarily the same entity, only that, if different, they have collaborated to obtain a ticket associated with the sender.

If it is important to be able to prove definitively that the ticket requester is the same user as represented in the hash (for example, in a proof of personhood claim), the ticket issuer should ask the user to authenticate by signing a challenge with their control key, and include the unhashed User Id in the `credentialSubject`.

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "This rug really ties the room together.",
  "mediaType": "text/plain",
  "tag": [
    {
      "type": "Interaction",
      "href": "https://thebiglebowski.fandom.com/wiki/The_Rug",
      "rel": "dsnp://123456#AcmeVerifiedPurchase",
      "nonce": "...",
      "ticket": {
        ...
        "credentialSubject": {
          "interactionId": "...",
          "href": "https://thebiglebowski.fandom.com/wiki/The_Rug",
          "reference": {
            "transactionId": "ABC123"
          }
        },
        ...
      }
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
