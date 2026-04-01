# Social Media

Social media content in DSNP is published by combining two mechanisms:
[Announcements](../Core/Announcements.md) carry the network-level record of activity,
while [Activity Content](../../../../ActivityContent/Overview.md) documents carry the
human-readable content those announcements reference.

## Announcements

An [Announcement](../Core/Announcements.md) is a structured record published to the network
that identifies a piece of content, its author, and its type.
Content-bearing announcement types include a `url` pointing to an external document and a
`contentHash` that allows readers to verify the document's authenticity regardless of where
it is hosted.

The announcement types defined in this specification for social media use are:

| Value | Name | Description |
| --- | --- | --- |
| 0 | [Tombstone](Types/Tombstone.md) | Invalidates a previously announced content item |
| 2 | [Broadcast](Types/Broadcast.md) | A public post |
| 3 | [Reply](Types/Reply.md) | A public response to a Broadcast |
| 4 | [Reaction](Types/Reaction.md) | A public visual reply to a Broadcast |
| 6 | [Update](Types/Update.md) | An update to previously announced content |

The mechanics of publishing, validating, deduplicating, and batching announcements are defined
in [Core Announcements](../Core/Announcements.md) and
[Core Batch Publications](../Core/BatchPublications.md).

## Activity Content

Content-bearing announcements reference an [Activity Content](../../../../ActivityContent/Overview.md)
document — a JSON object conforming to a DSNP-defined subset of
[W3C Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/).
The supported content types are:

| Type | Description |
| --- | --- |
| [Note](../../../../ActivityContent/Types/Note.md) | A text post, optionally with attachments |
| [Profile](../../../../ActivityContent/Types/Profile.md) | A user profile document |

The `url` field in an announcement points to a hosted Activity Content document.
The `contentHash` field contains a [DSNP Content Hash](../Core/Identifiers.md#dsnp-content-hash)
of that document, which readers use to verify its integrity after retrieval.
