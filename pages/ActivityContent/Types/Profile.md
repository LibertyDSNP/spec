# Activity Stream Type: Profile

Profiles are used to provide additional user information display.

[Activity Vocabulary: Profile](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-profile)


| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `@context` | [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/#jsonld) | YES | JSON-LD @context | MUST be set to `https://www.w3.org/ns/activitystreams` |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Profile` |
| `actor` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-actor) | no | May be used to identify the DSNP User who originated the activity | Use [DSNP User URI](../../DSNP/Identifiers.md#dsnp-user-uri) |
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
  "actor": "dsnp://1727293022", 
  "name": "John Doe",
  "summary": "John Doe is actually a small kitten. See pfp.",
  "icon": [
    {
      "type": "Link",
      "href": "https://placekitten.com/256/256",
      "mediaType": "image/jpeg",
      "width": "256",
      "height": "256"
    },
    {
      "type": "Link",
      "href": "https://placekitten.com/64/64",
      "mediaType": "image/jpeg",
      "width": "64",
      "height": "64"
    }
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```
