---
name: "Associated: Location"
route: /ActivityContent/Associated/Location
menu: Activity Content
---

# Associated Type: Location

[Activity Vocabulary: location](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-location)

| Property | Base Spec | Required | Description | Restrictions |
| --- | --- | --- | --- | --- |
| `type` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-type) | YES | Identifies the type of the object | MUST be set to `Place` |
| `name` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-name) | YES | The display name for the location  |  |
| `accuracy` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-accuracy) | no | The accuracy of the coordinates as a percentage. (e.g. "94.0" means "94.0% accurate") |  |
| `altitude` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-altitude) | no | The altitude of the location |  |
| `latitude` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-latitude) | no | The latitude of the location |  |
| `longitude` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-longitude) | no | The longitude of the location |  |
| `radius` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-radius) | no | The area around the given point that comprises the location |  |
| `units` | [Activity Vocabulary 2.0](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-units) | no | The units for `radius` and `altitude` (defaults to meters) | MUST be one of: `cm`, `feet`, `inches`, `km`, `m`, `miles` |

## Warning

Location data may pose a privacy danger to users.
Users should be warned before publishing location data.

## Example

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "I'm in NYC!",
  "mediaType": "text/plain",
  "location": {
    "type": "Place",
    "name": "New York City, NY",
    "latitude": "40.73",
    "longitude": "-73.93",
    "accuracy": "94.0"
  },
  "published": "1970-01-01T00:00:00+00:00"
}
```
