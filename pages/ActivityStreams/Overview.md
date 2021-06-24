---
name: Overview
route: /ActivityStreams/Overview
menu: Activity Streams
---

# Activity Streams Overview

Content shared via the DSNP will generally consist of URLs pointing to documents containing Activity Streams JSON objects.
For the purposes of the DSNP, only a subset of the [Activity Streams 2.0](https://www.w3.org/TR/activitystreams-core/) specification must be supported by default.
Implementers may choose to support more of the Activity Streams standards as they see fit, but as a warning, these standards may include ambiguities which could lead to different and incompatible implementations of certain features.
Implementers who extend their support for Activity Streams objects beyond the minimal subset defined here do so at their own risk.

Additionally, some aspects of the Activity Streams standard may be modified or extended in the context of the DSNP to support specific validations or features necessary in a distributed context.
These deviations from the standard will be thoroughly documented here.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Identify what aspects of the existing Activity Streams specification is supported, encouraged or enforced in the DSNP.
1. Specify any extensions or modifications of the Activity Streams specification that must be supported or required by the DSNP.

## Assumptions

* All broadcast messages must link to activity stream JSON, not any other form of content.
* All reply messages must link to an activity stream JSON, not any other form of content.

## Minimum Subset

At minimum, all clients implementing the DSNP must support presentation for the following message types from the Activity Streams vocabulary: `"Link"`, `"Note"` and `"Person"`.
It is also strongly encouraged to support `"Audio"`, `"Image"`, `"Profile"` and `"Video"` where ever possible.
Clients may ignore messages that they do not support.

### Required Activity Types

#### Link

Link type objects must be supported to represent linked content posted by users.
Link objects must have a `"type"` field with a value of `"Link"` and a `"href"` field with a valid URL string value.
Clients must support valid URLs with a `"https://"` protocol.
Clients may choose to support or ignore other protocols as they see appropriate for the secURLty of users.
Clients may also choose to ignore link objects with IP address hostnames or invalid domain names.

Link objects may also include a `"mediaType"` field with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value representing the type of content at the linked URL.

For example, the following would be a valid link object:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "https://dsnp.org"
}
```

And implementers may choose to ignore the following link objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "http://192.168.1.1/router-setup"
}
```

#### Note

Note type objects must be supported to represent text content posted by users.
Note objects must have a `"type"` field with a value of `"Note"` and a `"content"` field with a string value.
Clients should support display of content with unicode text as possible in their given browser or operating system.
Clients may also support display of [Markdown](https://daringfireball.net/projects/markdown/) or [BBCode](https://www.bbcode.org) as appropriate.
If a note contains Markdown, BBCode or some other formatting, it is recommended that an `"mediaType"` field be added to the object with a [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value representing the type of encoding present, i.e. `"text/markdown"`.
Clients that do not support a particular encoding may either display a message of the encoded type as raw text or ignore it entirely.

Note objects may include an `"attachment"` field with either a single activity sub-object, a single URL string or an array of sub-objects and/or strings representing external content referenced by the note object.
It is recommended that any linked content in the encoded text of the note object also be included in the attachments.
Clients must support display of attachments URL strings or objects with type `"Link"`.
Clients that support display of audio, image and video type objects should support display of each attachments object types respectively.

Note objects may include a `"tag"` field with an array value containing activity sub-objects representing tags and mentions in the content of the note object, however clients and indexers may ignore these fields as they see fit.
Note objects may also include a `"summary"` field with a string value containing a brief summation of the `"content"` field.

For example, the following would be valid note objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Hello world!"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "# Markdown document\n\n * List item\n\n * List item\n\n * List item",
  "mediaType": "text/markdown"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "summary": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "attachment": [
    {
      "type": "Link",
      "href": "https://en.wikipedia.org/wiki/Citation_needed"
    },
    {
      "type": "Image",
      "name": "Figure 1",
      "href": "https://en.wikipedia.org/wiki/Diagram#/media/File:Zusammensetzung_Shampoo.svg"
    }
  ],
  "tag": [
    {
      "type": "Mention",
      "name": "John Doe",
      "href": "dsnp://0123456789ABCDEF/"
    },
    {
      "name": "#example-tag"
    },
    {
      "name": "#hashtags"
    },
    {
      "name": "#yolo"
    }
  ]
}
```

#### Person

Person type objects must be supported to represent display names for users.
Person objects must have a `"type"` field with a value of `"Person"` and a `"name"` field with a string value representing a nickname for the user to be displayed alongside the user's DSNP User Id or handle.

For example, the following would be a valid person object:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Person",
  "name": "John Doe"
}
```

### Recommended Activity Types

#### Audio

Clients should support presentation for activity objects of type audio to represent audio content posted by users.
Audio type objects, if supported, must at minimum contain a `"type"` field with the value `"Audio"` and a `"URL"` with either a URL string or an activity sub-object of type link containing a URL pointing to an audio file.

Audio objects are also recommended to include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support audio objects must support the following media types:

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| MP3    | `audio/mp3`  | [RFC3003](https://tools.ietf.org/html/rfc3003)               |
| OGG    | `audio/ogg`  | [RFC5334](https://tools.ietf.org/html/rfc5334)               |
| WebM   | `audio/webm` | [WebM standard](https://www.webmproject.org/docs/container/) |

Audio objects may also include a `"duration"` field with a string value complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Audio objects linking to live streaming content may use the string `"Live"` for the duration field or omit it entirely.

For example, the following would be a valid audio objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Audio",
  "url": "https://example.org/short_clip.webm"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Audio",
  "name": "Super Great Podcast",
  "url": {
    "type": "Link",
    "href": "https://example.org/podcast.mp3",
    "mediaType": "audio/mp3"
  },
  "duration": "PT3H12M"
}
```

#### Image

Clients should support presentation for activity objects of type image to represent image content posted by users.
Image type objects, if supported, must at minimum contain a `"type"` field with the value `"Image"` and a `"URL"` with either a URL string or an activity sub-object of type link containing a URL pointing to an image file.

Image objects are also recommended to include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support image objects must support the following media types:

| Format | MIME Type       | Specification(s)                                                 |
|--------|-----------------|------------------------------------------------------------------|
| JPEG   | `image/jpeg`    | [RFC2045](https://www.iana.org/go/rfc2045)                       |
| PNG    | `image/png`     | [W3C PNG Standard](https://www.w3.org/TR/2003/REC-PNG-20031110/) |
| SVG    | `image/svg+xml` | [W3C SVG standard](https://www.w3.org/Graphics/SVG/)             |
| WebP   | `image/webp`    | [WebP standard](https://developers.google.com/speed/webp/)       |

Clients should support the following media types:

| Format | MIME Type    | Specification(s)                                       |
|--------|--------------|--------------------------------------------------------|
| GIF    | `image/gif`  | [RFC2045](https://www.iana.org/go/rfc2045)             |
| HEIC   | `image/heic` | [ISO/IEC JTC-1](http://www.iso.org/iso/jtc1_home.html) |

Clients that support image objects must include fields of `"height"` and `"width"` each with positive integer value either on the root activity object or the individual link sub-objects if multiple are present.

For example, the following would be a valid image objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Image",
  "name": "Placekitten 1",
  "url": "https://placekitten.com/g/3000/2400",
  "width": 3000,
  "height": 2400
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Image",
  "name": "Placekitten 2",
  "url": {
    "type": "Link",
    "href": "https://placekitten.com/g/1280/960",
    "mediaType": "image/jpeg",
    "width": 1280,
    "height": 960
  }
}
```

#### Profile

Clients should support presentation for activity objects of type profile to represent profile data associated with users.
Profile type objects, if supported, must at minimum contain a `"type"` field with the value `"Profile"` and a `"describes` field with an activity sub-object of type person to represent the user being described by the profile object.

Profile objects may include a `"summary"` field with a string value representing a short biography of the user.
Profile objects may include an `"avatar"` field with an activity sub-object of type image referring to an image to be used as the user's avatar.
Profile objects may include a `"links"` field with an array of activity sub-objects of type link referring to other websites or profiles associated with the user.

For example, the following would be a valid profile object:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Profile",
  "summary": "John Doe is actually a small kitten. See pfp.",
  "describes": {
    "type": "Person",
    "name": "John Doe"
  },
  "avatar": {
    "type": "Link",
    "href": "https://placekitten.com/256/256"
  },
  "links": [
    {
      "type": "Link",
      "name": "John Doe's personal site",
      "href": "https://example.org"
    },
    {
      "type": "Link",
      "name": "John Doe's GitHub account",
      "href": "https://github.com/example"
    }
  ]
}
```

#### Video

Clients should support presentation for activity objects of type video to represent video content posted by users.
Video type objects, if supported, must at minimum contain a `"type"` field with the value `"Video"` and a `"URL"` with either a URL string or an activity sub-object of type link containing a URL pointing to a video file.

Video objects are also recommended to include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support video objects must support the following media types:

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| MPEG   | `video/mpeg` | [RFC2045](https://www.iana.org/go/rfc2045)                   |
| OGG    | `video/ogg`  | [RFC5334](https://www.iana.org/go/rfc5334)                   |
| WebM   | `video/webm` | [WebM standard](https://www.webmproject.org/docs/container/) |

Clients should support the following media types:

| Format | MIME Type    | Specification(s)                           |
|--------|--------------|--------------------------------------------|
| H256   | `video/H256` | [RFC7798](https://www.iana.org/go/rfc7798) |
| MP4    | `video/mp4`  | [RFC4337](https://www.iana.org/go/rfc4337) |
| Raw    | `video/raw`  | [RFC4175](https://www.iana.org/go/rfc4175) |

Video objects may also include a `"duration"` field with a string value complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Video objects linking to live streaming content may use the string `"Live"` for the duration field or omit it entirely.

Clients that support video objects must also include fields of `"height"` and `"width"` each with positive integer value on either the root activity object or the individual link sub-objects if multiple are present.

For example, the following would be valid video objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Video",
  "name": "Puppy Plays With Ball",
  "url": "http://example.org/video.mkv",
  "duration": "PT2H",
  "width": 1024,
  "height": 768
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Video",
  "name": "Big Buck Bunny",
  "url": {
    "type": "Link",
    "href": "https://upload.wikimedia.org/wikipedia/commons/c/c0/Big_Buck_Bunny_4K.webm",
    "width": 4000,
    "height": 2250
  },
  "duration": "PT10M32S",
  "mediaType": "video/webm"
}
```

## Extensions

In addition to the standards defined by the Activity Streams specifications, some extensions of Activity Streams are also required by the DSNP due to its decentralized context.

### Content Contexts

Clients may sometimes want to represent content as existing within a specific presentation or social context, such as Reddit's subreddit concept, Slack's channels or old-style forum rooms.
It is recommended that implementers represent this context in activity objects with the `"context"` field.
If present, this field must have a string value starting with the name of the implementing service followed by forward slash and a string unique to the specific context.
Implementers are encouraged to add additional forward slash separators to their unique string to represent contexts within contexts.
For example, a `#development` channel context within a `LibertyDSNP` organization on Slack could be represented by the string, `"Slack/LibertyDSNP/#development"`.

Clients may choose to ignore activity objects with contexts outside the user's current context, but it is strongly recommended that all contexts be made accessible to the user through some form of navigation.

### Deletion Support

Users may occasionally want to delete an activity object by changing it's contents, thereby changing it's hash value and invalidating any signature associated with it via broadcast or reply messages on chain.
Likewise, hosts of activity objects may want to do the same for the purpose of removing illegal or otherwise objectionable content.
Implementers are strongly recommended to represent this by adding a `"deleted"` field to the hosted activity object with an [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) timestamp representing the time at which the content was removed.
Implementers may choose to leave all other fields intact or remove them as they see fit.

Clients may choose to represent deleted content with a small tombstone message, such as "content removed," or ignore deleted content entirely.
Implementers wishing to specify a tombstone message for deleted content may change the `"type"` of the object to `"Tombstone"` and add or update the `"content"` field to include a message explaining the deletion, i.e. "removed due to DMCA violation" or "removed by author."

### Timestamps

All activity objects must include a `"published"` key with a timestamp value string matching the [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) format with timezone.
Clients may choose to treat content marked as published significantly in the future as scheduled content which will be presented to the user later or ignored entirely.
Likewise, clients may choose to treat content marked as published significantly in the past as archival content which is only displayed to the user when sought out or ignore it entirely.

In any case, timestamps cannot be trusted to represent the true time that a message is posted on the DSNP due to the decentralized nature of the system and the relativistic limits of communication across the world.
Clients may sort content by it's provided published timestamp, but it should be made clear to the user where ever possible that these timestamps are not necessarily accurate.
