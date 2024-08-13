# Activity Stream Type: Profile

Profiles are used to provide additional user information display.

[Activity Vocabulary: Profile](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-profile)


| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/#jsonld) | YES | JSON-LD @context | MUST be set to `https://www.w3.org/ns/activitystreams` |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Profile` |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | no | The display name for the profile |  |
| `icon` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-icon) | no | An array of avatars of the profile | MUST follow [Image Link Type](../Associated/Attachments.md#image-link) |
| `summary` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-summary) | no | Used as a plain text biography of the profile |  |
| `published` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-published) | no | The time of publishing | MUST be [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) |
| `location` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-location) | no | For location | MUST follow [Location Type](../Associated/Location.md) |
| `tag` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-tag) | no | For tags or mentions | MUST follow [Tag Type](../Associated/Tag.md) |

## Examples

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Profile",
  "name": "John Doe",
  "summary": "John Doe is actually a small kitten. See pfp.",
  "icon": [
    {
      "type": "Link",
      "href": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/1-month-old_kittens_32.jpg/256px-1-month-old_kittens_32.jpg",
      "mediaType": "image/jpeg",
      "width": "256",
      "height": "171",
      "hash": [
        "bdyqphnphmjdoumkxqbsuspribxvlsx2hx6525u3fh2dkr5bxnqritzi"
      ]
    },
    {
      "type": "Link",
      "href": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/1-month-old_kittens_32.jpg/64px-1-month-old_kittens_32.jpg",
      "mediaType": "image/jpeg",
      "width": "64",
      "height": "43",
      "hash": [
        "bdyqktr7p5hc27bx4ernmngs6tj7uyukfb4atrtq44mdmx4yntuh2s5y"
      ]
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
