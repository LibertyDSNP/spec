# Activity Content Specification
__Version 1.0.0__

Content references shared via the DSNP consists of URLs pointing to documents containing Activity Streams JSON objects.
For the purposes of the DSNP, restrictions are placed on the [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/) specification.

## JSON-LD and Activity Streams

All DSNP Activity Content is compatible with the [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/) specification.
While there are some DSNP extensions, they are guaranteed to use non-colliding terms.
Therefore, we set the JSON-LD `@context` field to `https://www.w3.org/ns/activitystreams` according to [Activity Streams 2.0 §2.1](https://www.w3.org/TR/activitystreams-core/#jsonld).

## Core Activity Content Types

DSNP uses only the following content types at the root level.

| Name | Description | DSNP Announcements |
| ---- | ----------- | -------------------- |
[Note](/ActivityContent/Types/Note) | standard user content | [Broadcast](/DSNP/Types/Broadcast), [Reply](/DSNP/Types/Reply) |
[Profile](/ActivityContent/Types/Profile) | user profile content | [Profile](/DSNP/Types/Profile) |

## Associated Types

| Name | Description | Specification |
| ---- | ----------- | ------------- |
[Location](/ActivityContent/Associated/Location) | add a location to content | [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) |
[Tag](/ActivityContent/Associated/Tag) | add a tag to content | [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) |
[Attachments](/ActivityContent/Associated/Attachments) | supported attachment types | [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) |
[Hash](/ActivityContent/Associated/Hash) | content validation hash | DSNP Extension |

## Supported URL Schema

URLs in DSNP-compatible Activity Content MUST to use one of the following URL schemes.

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |
| HTTP | Hypertext Transfer Protocol | [RFC2616](https://datatracker.ietf.org/doc/html/rfc2616) | 1.0 |

## Libraries

| Name | Language(s) |
| --- | --- |
| [LibertyDSNP/activity-content](https://github.com/LibertyDSNP/activity-content) | JavaScript/TypeScript |
| [LibertyDSNP/activity-content-java](https://github.com/LibertyDSNP/activity-content-java) | Java/Kotlin |
| [LibertyDSNP/activity-content-swift](https://github.com/LibertyDSNP/activity-content-swift) | Swift |

## Releases

| Version | Description | Release Date | Changelog |
| --- | --- | --- | --- |
| [1.0.0](https://github.com/LibertyDSNP/spec/tree/ActivityContent-v1.0.0) | Initial Release | 2021-09-09 | [Changelog](https://github.com/LibertyDSNP/spec/releases/tag/ActivityContent-v1.0.0) |

## Non-Normative

## Additional Fields

Implementers may choose to support more of the Activity Streams standard as long as it does not conflict with this specification, but as a warning, other implementations may not recognize those additions.
Implementers who extend their support for Activity Streams objects beyond the subset defined here do so at their own risk.
