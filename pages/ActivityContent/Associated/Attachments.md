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
            {
              "algorithm": "keccak256",
              "value": "0x3b33df3d163e86514e9041ac97e3d920a75bbafa8d9c1489e631897874b762cc"
            }
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
| `hash` | [DSNP 1.0](Hash.md) | YES | Array of hashes for linked content validation | MUST include at least one [supported hash](Hash.md#supported-algorithms) |
| `height` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-height) | no | A hint as to the rendering height in device-independent pixels |  |
| `width` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-height) | no | A hint as to the rendering width in device-independent pixels |  |

Audio objects must include a `"hash"` field as described in the [content proofs section](#content-proofs) below.

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
            {
              "algorithm": "keccak256",
              "value": "0x90b3b09658ec527d679c2de983b5720f6e12670724f7e227e5c360a3510b4cb5"
            }
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

Audio objects must include a `"hash"` field as described in the [content proofs section](#content-proofs) below.

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
            {
              "algorithm": "keccak256",
              "value": "0xf841950dfcedc968dbd63132da844b9f28faea3dbfd4cf326b3831b419a20e9a"
            }
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
