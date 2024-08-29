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

## Attestations

Attestation attachments are DSNP extensions to the Activity Content model that allow users to attach Verifiable Credentials corresponding to an Attribute Set Type with their DSNP profile or a social media post.

The Verifiable Credential found at the indicated URL must include the user's [DSNP User URI](../../DSNP/Identifiers.md#dsnp-user-uri) in its `credentialSubject.id` field.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Attestation` |
| `url` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-url) | YES | An array of links for the given credential | MUST be a [Verifiable Credential Link](#verifiable-credential-link) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the attestation |  |

### Verifiable Credential Link

Attestation attachments must contain a link to a Verifiable Credential document.
The link must contain a relationship identifier in the form of a DSNP Attribute Set Type (the `rel` field), to allow applications to determine the type of credential expected.

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Link` |
| `rel` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-id) | YES | The attestation's attribute set type | MUST be a DSNP [Attribute Set Type](../../DSNP/AttributeSets.md#attribute-set-type) corresponding to the referenced credential document |
| `href` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-href) | YES | The URL for the associated Verifiable Credential | MUST be a [Supported URL Schema](../Overview.md#supported-url-schema) |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type of `href` content | MUST be set to [`application/vc`](https://www.w3.org/TR/vc-data-model-2.0/#vc-ld-media-type) |
| `hash` | [DSNP extension](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](Hash.md#supported-algorithms) |

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
          "rel": "did:dsnp:123456$AcmeMedicalAssociationPhysician",
          "href": "https://acmemedicalassn.org/credentials/degree-123.json",
          "mediaType": "application/vc",
          "hash": [
		    "bciqdnu347gcfmxzbkhgoubiobphm6readngitfywktdtbdocgogop2q"
          ]
        }
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
