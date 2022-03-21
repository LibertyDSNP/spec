# Activity Stream Type: Note

[Activity Vocabulary: Note](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-note)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/#jsonld) | YES | JSON-LD @context | MUST be set to `https://www.w3.org/ns/activitystreams` |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Note` |
| `content` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-content) | YES | Text content of the note |  |
| `mediaType` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-mediatype) | YES | MIME type for the `content` field | MUST be set to a [supported MIME type](#supported-content-mime-types) |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the note |  |
| `published` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-published) | no | The time of publishing | MUST be [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) |
| `attachment` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-attachment) | no | Array of attached links or media | MUST be one of the [Supported Attachments](ActivityContent/Associated/Attachments.md) |
| `tag` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tag) | no | Array of tags/mentions | MUST follow [Tag Type](ActivityContent/Associated/Tag.md) |
| `location` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-location) | no | For location | MUST follow [Location Type](ActivityContent/Associated/Location.md) |

## Supported Content MIME Types

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| Plain  | `text/plain` |                                                              |

## Examples

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Hello world!",
  "mediaType": "text/plain",
  "published": "1970-01-01T00:00:00+00:00"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "mediaType": "text/plain",
  "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "attachment": [
    {
      "type": "Link",
      "href": "https://en.wikipedia.org/wiki/Citation_needed"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
