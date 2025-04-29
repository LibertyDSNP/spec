# Activity Stream Type: Note

[Activity Vocabulary: Note](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/#jsonld) | YES | JSON-LD @context | MUST be set to `https://www.w3.org/ns/activitystreams` |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Note` |
| `content` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-content) | YES | Text content of the note |  |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type for the `content` field | MUST be set to a [supported MIME type](#supported-content-mime-types) |
| `published` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-published) | YES | The time of publishing | MUST be [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the note |  |
| `attachment` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attachment) | no | Array of attached links or media | MUST be one of the [Supported Attachments](../Associated/Attachments.md) |
| `tag` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tag) | no | Array of tags/mentions | MUST follow [Tag Type](../Associated/Tag.md) |
| `location` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-location) | no | For location | MUST follow [Location Type](../Associated/Location.md) |
| `inReplyTo` |  [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-inreplyto) | no | Identifies the content being replied to | MUST be a [DSNP Content URI](../../DSNP/Identifiers.md#dsnp-content-uri) |

## Supported Content MIME Types

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| Plain  | `text/plain` |                                                              |

## Examples

### Basic Note
```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Hello world!",
  "mediaType": "text/plain",
  "published": "1970-01-01T00:00:00+00:00"
}
```

### Note Replying to a DSNP Note
```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "inReplyTo": "dsnp://123456/bdyqdua4t4pxgy37mdmjyqv3dejp5betyqsznimpneyujsur23yubzna",
  "content": "Hello world!",
  "mediaType": "text/plain",
  "published": "1970-01-01T00:00:00+00:00"
}
```

### Note with a Link Attachment

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "mediaType": "text/plain",
  "attachment": [
    {
      "type": "Link",
      "href": "https://en.wikipedia.org/wiki/Citation_needed"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
