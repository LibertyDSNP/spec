# Associated Attachments

## Audio

[Activity Vocabulary: Audio](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-audio)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Audio` |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for given audio content in different formats | MUST be an [Audio Link](#audio-link) AND MUST have at least one [supported audio MIME type](#supported-audio-mime-types) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the audio file  |  |
| `duration` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) | no | Approximate [duration](https://www.w3.org/TR/xmlschema11-2/#duration) of the audio |  |

### Audio Link

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the given audio content | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type of `href` content | MUST follow  |
| `hash` | [DSNP 1.0](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](Hash.md#supported-algorithms) |

### Supported Audio MIME Types

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| MP3    | `audio/mpeg`  | [RFC3003](https://tools.ietf.org/html/rfc3003)               |
| OGG    | `audio/ogg`  | [RFC5334](https://tools.ietf.org/html/rfc5334)               |
| WebM   | `audio/webm` | [WebM standard](https://www.webmproject.org/docs/container/) |

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "attachments": [
    {
      "type": "Audio",
      "name": "The Scream",
      "url": [
        {
          "type": "Link",
          "href": "https://upload.wikimedia.org/wikipedia/commons/d/d9/Wilhelm_Scream.ogg",
          "mediaType": "audio/ogg",
          "hash": [
            "bdyqbcji3okmzxobvaqgduz5prixmumyndzopyufultmslndi4pdebii"
          ]
        }
      ],
      "duration": "1S"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Image

[Activity Vocabulary: Image](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-image)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Image` |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for given image content in different formats | MUST be an [Image Link](#image-link) AND MUST have at least one [supported image MIME type](#supported-image-mime-types) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name or alt text for the image  |  |


### Image Link

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the given image | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type of `href` content | |
| `hash` | [DSNP 1.0](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](../../DSNP/Identifiers.md#supported-hashing-algorithms) |
| `height` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-height) | no | A hint as to the rendering height in device-independent pixels |  |
| `width` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-width) | no | A hint as to the rendering width in device-independent pixels |  |


### Supported Image MIME Types

| Format | MIME Type       | Specification(s)                                                 |
|--------|-----------------|------------------------------------------------------------------|
| JPEG   | `image/jpeg`    | [RFC2045](https://www.iana.org/go/rfc2045)                       |
| PNG    | `image/png`     | [W3C PNG Standard](https://www.w3.org/TR/2003/REC-PNG-20031110/) |
| SVG    | `image/svg+xml` | [W3C SVG standard](https://www.w3.org/Graphics/SVG/)             |
| WebP   | `image/webp`    | [WebP standard](https://developers.google.com/speed/webp/)       |
| GIF    | `image/gif`     | [RFC2045](https://www.iana.org/go/rfc2045)                       |

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "attachments": [
    {
      "type": "Image",
      "name": "One of the founders of DSNP",
      "url": [
        {
          "type": "Link",
          "href": "https://upload.wikimedia.org/wikipedia/commons/a/ae/Mccourt.jpg",
          "width": 350,
          "height": 228,
          "mediaType": "image/jpg",
          "hash": [
            "bciqjiqcidmzuqpvrl5cocu3l4z2uhj22xqruht3d5kx7qijvfbnjlda",
            "bdyqbjzt5drgji5w7xhsddsynusgx2vdmakcsrr4sfin5fyfkwlpup6q"
          ]
        }
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Video

[Activity Vocabulary: Video](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-video)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Video` |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for given video content in different formats | MUST be a [Video Link](#video-link) AND MUST have at least one [supported video MIME type](#supported-video-mime-types) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the video  |  |
| `duration` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) | no | Approximate [duration](https://www.w3.org/TR/xmlschema11-2/#duration) of the video |  |


### Video Link

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the given content | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type of `href` content | |
| `hash` | [DSNP 1.0](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](Hash.md#supported-algorithms)  |
| `height` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-height) | no | A hint as to the rendering height in device-independent pixels |  |
| `width` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-width) | no | A hint as to the rendering width in device-independent pixels |  |


### Supported Video MIME Types

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| MPEG   | `video/mpeg` | [RFC2045](https://www.iana.org/go/rfc2045)                   |
| OGG    | `video/ogg`  | [RFC5334](https://www.iana.org/go/rfc5334)                   |
| WebM   | `video/webm` | [WebM standard](https://www.webmproject.org/docs/container/) |
| H265   | `video/H265` | [RFC7798](https://www.iana.org/go/rfc7798)                   |
| MP4    | `video/mp4`  | [RFC4337](https://www.iana.org/go/rfc4337)                   |

### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "attachments": [
    {
      "type": "Video",
      "name": "One of the founders of DSNP",
      "duration": "PT10M32S",
      "url": [
        {
          "type": "Link",
          "href": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Big_Buck_Bunny_4K.webm",
          "width": 4000,
          "height": 2250,
          "mediaType": "video/webm",
          "hash": [
            "bdyqed7dnok3batd7tr64trqmovfxam5tqsgxkiv2op5765pq43swtui"
          ]
        }
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Link

[Activity Vocabulary: Link](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-link)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the given link | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the link  |  |

### Examples

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Check out the DSNP Website!",
  "mediaType": "text/plain",
  "attachment": [
    {
      "type": "Link",
      "name": "DSNP Website",
      "href": "https://dsnp.org"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

## Attestations and Interactions

Attestation and Interaction attachments are DSNP extensions to the Activity Content model that allow Verifiable Credentials to be attached to content with clear semantics.

### Verifiable Credential Link

Both Attestation and Interaction attachments must contain a link to Verifiable Credential document.
The link must contain a relationship identifier in the form of a DSNP Attribute Set Type (the `rel` field), to allow applications to determine the type of credential expected.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `rel` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | The attestation's attribute set type | MUST be a DSNP [Attribute Set Type](../../DSNP/AttributeSets.md#attribute-set-type) corresponding to the referenced credential document |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the associated Verifiable Credential | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type of `href` content | MUST be set to [`application/vc+ld+json`](https://w3c.github.io/vc-data-model/#vc-ld-media-type) |
| `hash` | [DSNP 1.0](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](Hash.md#supported-algorithms) |

### Attestation

Attestations about a DSNP User may be included as attachments in an Activity object.
This format allows users to include relevant data corresponding to an Attribute Set Type with their DSNP profile or a social media content item.

The Verifiable Credential found at the indicated URL must include the [DSNP DID](../../VerifiableCredentials/Types/DID.md) of the user in its `credentialSubject.id` field.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Attestation` |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for the given credential | MUST be a [Verifiable Credential Link](#verifiable-credential-link) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the attestation |  |

#### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Profile",
  "content": "I am a doctor. You're doing this all wrong.",
  "mediaType": "text/plain",
  "attachments": [
    {
      "type": "Attestation",
      "name": "My Degree",
      "url": [
        {
          "type": "Link",
          "rel": "did:dsnp:123456$AcmeMedicalAssociation",
          "href": "https://acmemedicalassn.org/credentials/degree-123.json",
          "mediaType": "application/vc+ld+json",
          "hash": [
		    "QmQrGdv6Ky5sJhaVdw27y4aod5pdfihDkBTxiBkRaSGJJ7"
          ]
        }
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

### Interaction

The `Interaction` attachment type enables simple discovery of pseudonymously issued credentials that may be relevant for a user to relate to a specific content item.

In contrast to `Attestation` attachments, Interactions reference a Verifiable Credential that does not address a specific DSNP User as its subject, but instead relies on a user-provided interaction identifier that can later be provably associated with a DSNP identity.
This allows for the issuance of Interaction credentials outside of an authenticated DSNP application context, and in scenarios where users wish to remain anonymous to the issuer.

An Interaction attachment resembles an Attestation, with the addition of an interaction nonce as described below (the `nonce` field), a Verifiable Credential Link in the `url` field, and an identifier of the object of the interaction in the `href` field.
The linked Verifiable Credential must have a credential subject that minimally includes an `interactionId` and repeats the `href` field, but may contain other data as defined by a [Verifiable Credential Schema](../../VerifiableCredentials/Types/VerifiableCredentialSchema.md)).

Proof that the credential was issued to the user responsible for posting the content is produced and verified using a cryptographic hash.
To acquire an anonymous Interaction credential, a DSNP User generates and records a random nonce of any length (192 bits or more is recommended).
The user then concatenates their DSNP User Id (in little-endian 64-bit format) with the nonce and generates a message digest using a [supported hashing algorithm](Hash.md#supported-algorithms).
The multibase-encoded hash output is then sent to the credential issuer to be included as an `interactionId` key in the `credentialSubject` field of the generated document.
It is intentionally opaque to the issuer.
The issuer may include any other fields relevant to the document schema in the `credentialSubject`, and then generate a signature proof.
The URL of the signed credential is then included in the interaction attachment (see example).

When posting content including the Interaction attachment, the user must include the nonce (as the `nonce` key) in order for consuming applications to verify that the originator of the content is responsible for generating the interaction.
A verifier MUST inspect the DSNP User Id of the sender of the content (via the relevant announcement) and the nonce, and repeat the hashing process to verify that it matches the value from `interactionId`.

Issuers of interaction credentials are encouraged to use the `display` extension described in the DSNP [Verifiable Credential Schema](../../VerifiableCredentials/Types/VerifiableCredentialSchema.md#display-extension) documentation to provide applications with hints as to how a verified interaction may be displayed, for example as a badge on a profile or content post.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the tag as type `Interaction` |  MUST be `Interaction`  |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for the given credential | MUST be a [Verifiable Credential Link](#verifiable-credential-link) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the interaction |  |
| `reference` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | URI of object of the interaction | MUST be the same as the corresponding field within the linked document's `credentialSubject` |
| `nonce` | DSNP extension | YES | Multibase-encoded random byte string (a minimum deserialized size of 24 bytes is recommended) |  |

#### Provenance of Interaction Credentials (Non-Normative)

Part of the provenance of a credential relies upon having a DSNP User Id and nonce that are hashed by the requester of the credential.
Ideally, the requester could prove that they were the user indicated by the DSNP User Id.
Similar assertions are often done by providing signatures: the user could sign a message including their User Id with the private key associated with a public key they manage as user data, in much the same way that the issuer of a Verifiable Credential creates a signature proof.

However, because DSNP does not prevent multiple users from associating the same public key with their accounts, it would be possible, for example, for Alice to obtain a credential in Bob's name and give it to Bob to post, as long as Bob represents that the corresponding public key is his own by listing it as one of his DSNP public keys.
Therefore, the provenance guarantee offered by the hashing approach on an otherwise anonymous credential is ultimately equivalent.
Because of this, applications should _not_ infer that the credential requester and sender are necessarily the same entity, only that, if different, they have collaborated to obtain a credential associated with the sender.

If it is important to be able to prove definitively that the credential requester is the same user as represented in the hash (for example, in a proof of personhood claim), the credential issuer should ask the user to authenticate by signing a challenge with their control key, and include the user's unhashed DSNP DID as the `credentialSubject`.

#### Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "This rug really ties the room together.",
  "mediaType": "text/plain",
  "attachments": [
    {
      "type": "Interaction",
      "reference": "https://thebiglebowski.fandom.com/wiki/The_Rug",
      "nonce": "zYAjKoNbau5KiqmHPmSxYCvn66dA1vLmwbt",
      "url": [
        {
          "type": "Link",
          "rel": "did:dsnp:898998$ProofOfPurchase",
          "href": "https://therugstore.com/proof/txn-2929123.json",
          "mediaType": "application/vc+ld+json",
          "hash": [
		    "QmQrGdv6Ky5sJhaVdw27y4aod5pdfihDkBTxiBkRaSGJJ7"
          ]
        }
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

The referenced credential document would include within its `credentialSubject` a matching `reference` value, as well as an `interactionId` generated by hashing the sender's 64-bit little-endian DSNP User Id and the (deserialized) `nonce`:

```
  "credentialSubject": {
    "interactionId": "...",
    "reference": "https://thebiglebowski.fandom.com/wiki/The_Rug",
    "transactionId": "ABC123"
  }
```
