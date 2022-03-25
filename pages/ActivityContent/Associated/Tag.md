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
      "id": "dsnp://0x12345678"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
