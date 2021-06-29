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

All clients implementing the DSNP must support presentation for the following message types from the Activity Streams vocabulary: `"Link"`, `"Note"` and `"Person"`.
It is also strongly encouraged to support `"Audio"`, `"Image"`, `"Profile"` and `"Video"` where ever possible.
Clients may ignore messages that they do not support.

### Required Activity Types

#### Link

Link objects must be supported to represent linked content posted by users.
Link objects must include a `"type"` field with a value of `"Link"`.
Link objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Link objects must include a `"href"` field with a valid URL string.

Clients must support valid URLs with a `"https://"` protocol with valid domain names.
Clients may support other protocols as they see appropriate.
Clients may support link objects with IP address hostnames or invalid domain names.

Link objects may include a `"mediaType"` field with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string representing the type of content at the linked URL.

For example, the following would be a valid link object:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "https://dsnp.org",
  "published": "1970-01-01T00:00:00+00:00"
}
```

And implementers may choose to ignore the following link objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "ipfs://bafybeiemxf5abjwjbikoz4mc3a3dla6ual3jsgpdr4cjr3oz3evfyavhwq/wiki/Vincent_van_Gogh.html",
  "published": "1970-01-01T00:00:00+00:00"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Link",
  "href": "http://192.168.1.1/router-setup",
  "published": "1970-01-01T00:00:00+00:00"
}
```

#### Note

Note objects must be supported to represent text content posted by users.
Note objects must include a `"type"` field with a value of `"Note"`.
Note objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Note objects must include a `"content"` field with a string.

Clients may support content with unicode text as possible in their given browser or operating system.
Clients may support [Markdown](https://daringfireball.net/projects/markdown/), [BBCode](https://www.bbcode.org) or other formatting standards.
If a note contains Markdown, BBCode or some other formatting, the note object must include a `"mediaType"` field with a [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string representing the type of encoding present, i.e. `"text/markdown"`.

Note objects may include an `"attachment"` field with either a single activity sub-object, a single URL string or an array of sub-objects and/or strings representing external content referenced by the note object.
Any linked content in the encoded text of the note object should be included in the attachments.
Clients must support attachments URL strings or objects with type `"Link"`.
Clients that support display of audio, image and video type objects should support display of each attachments object types respectively.

Note objects may include a `"summary"` field with a string containing a brief summation of the `"content"` field.

For example, the following would be valid note objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "Hello world!",
  "published": "1970-01-01T00:00:00+00:00"
}
```

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Note",
  "content": "# Markdown document\n\n * List item\n\n * List item\n\n * List item",
  "mediaType": "text/markdown",
  "published": "1970-01-01T00:00:00+00:00"
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
  "published": "1970-01-01T00:00:00+00:00"
}
```

#### Person

Person objects must be supported to represent display names for users.
Person objects must include a `"type"` field with a value of `"Person"`.
Person objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Person objects must include a `"name"` field with a string representing a nickname for the user to be presented alongside the user's DSNP User Id or handle.

For example, the following would be a valid person object:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Person",
  "name": "John Doe",
  "published": "1970-01-01T00:00:00+00:00"
}
```

### Recommended Activity Types

#### Audio

Clients should support audio activity objects to represent audio content posted by users.
Audio objects must include a `"type"` field with the value `"Audio"`.
Audio objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Audio objects must include a `"URL"` with either a URL string or an activity sub-object of type `"Link"` containing a URL pointing to an audio file.
Audio objects must include a `"hash"` field as described in the [content proofs section](#content-proofs) below.
Audio objects must include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string.

Clients must support the following media types:

| Format | MIME Type    | Specification(s)                                             |
|--------|--------------|--------------------------------------------------------------|
| MP3    | `audio/mp3`  | [RFC3003](https://tools.ietf.org/html/rfc3003)               |
| OGG    | `audio/ogg`  | [RFC5334](https://tools.ietf.org/html/rfc5334)               |
| WebM   | `audio/webm` | [WebM standard](https://www.webmproject.org/docs/container/) |

Audio objects may include a `"duration"` field with a string complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Audio objects linking to live streaming content may use the string `"Live"` for the duration field or omit it entirely.

For example, the following would be valid audio objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Audio",
  "url": "https://example.org/short_clip.webm",
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
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
  "duration": "PT3H12M",
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
}
```

#### Image

Clients should support image activity objects to represent image content posted by users.
Image objects must include a `"type"` field with the value `"Image"`.
Image objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Image objects must include a `"URL"` with either a URL string or an activity sub-object of type `"Link"` containing a URL pointing to an image file.
Image objects must include a `"hash"` field as described in the [content proofs section](#content-proofs) below.
Image objects must include fields of `"height"` and `"width"` each with positive integer value either on the root activity object or the individual link sub-objects if multiple are present representing the height and width of the linked image file.
Image objects must include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string.

Clients must support the following media types:

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


For example, the following would be a valid image objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Image",
  "name": "Placekitten 1",
  "url": "https://placekitten.com/g/3000/2400",
  "width": 3000,
  "height": 2400,
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
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
  },
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
}
```

#### Profile

Clients should support profile activity objects to represent profile data associated with users.
Profile objects must include a `"type"` field with the value `"Profile"`.
Profile objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Profile objects must include a `"describes` field with an activity sub-object of type `"Person"` to represent the user being described by the profile object.

Profile objects should include a `"summary"` field with a string representing a short biography of the user.
Profile objects should include an `"icon"` field with an activity sub-object of type `"Image"` referring to an image to be used as the user's avatar.
Profile objects should include a `"links"` field with an array of activity sub-objects of type `"Link"` referring to other websites or profiles associated with the user.

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
  "icon": {
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
  ],
  "published": "1970-01-01T00:00:00+00:00"
}
```

#### Video

Clients should support video activity objects to represent video content posted by users.
Video objects must include a `"type"` field with the value `"Video"`.
Video objects must include a `"published"` field as described in the [timestamps section](#timestamps) below.
Video objects must include a `"URL"` with either a URL string or an activity sub-object of type `"Link"` containing a URL pointing to a video file.
Video objects must include a `"hash"` field as described in the [content proofs section](#content-proofs) below.
Video objects must include fields of `"height"` and `"width"` each with positive integer value on either the root activity object or the individual link sub-objects if multiple are present representing the height and width of the linked video file.
Video objects must include a `"mediaType"` field on their link sub-object with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string.

Clients must support the following media types:

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

Video objects may include a `"duration"` field with a string complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Video objects linking to live streaming content may use the string `"Live"` for the duration field or omit it entirely.

For example, the following would be valid video objects:

```json
{
  "@context": "https://www.w3.org/ns/activitystreams",
  "type": "Video",
  "name": "Puppy Plays With Ball",
  "url": "http://example.org/video.mkv",
  "duration": "PT2H",
  "width": 1024,
  "height": 768,
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
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
  "mediaType": "video/webm",
  "published": "1970-01-01T00:00:00+00:00",
  "hash": {
    "algorithm": "keccak256",
    "value": "0x0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF0123456789ABCDEF"
  }
}
```

## Modifications and Extensions

In addition to the minimum subset defined in the prior section, some features of the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-accept) and extensions thereof applying to all messages are recommended or required due to the decentralized nature of the DSNP.

### Ids Not Required

Unlike the [Activity Streams](https://www.w3.org/TR/activitystreams-core/) specification, id fields are not required on any DSNP activity content objects due to the difficulty in generating self-referential content on certain hosting platforms.

### Content Contexts

Clients may want to represent content as existing within a specific presentation or social context, such as Reddit's subreddit concept, Slack's channels or old-style forum rooms.
Implementers may represent this context in activity objects with the `"context"` field.
This field must contain a string starting with the name of the implementing service followed by forward slash and a string unique to the specific context.
Implementers are encouraged to add additional forward slash separators to their unique string to represent contexts within contexts.
For example, a `#development` channel context within a `LibertyDSNP` organization on Slack could be represented by the string, `"Slack/LibertyDSNP/#development"`.

Clients may choose to ignore activity objects with contexts outside the user's current context by default, but all contexts must be made accessible to the user through some form of navigation.

### Content Proofs

Activity objects linking to external content such as audio, image or video files must include a `"hash"` field including a hash of the linked file to prove its authenticity.
The value of this `"hash"` field must be a nested object or an array of objects representing multiple hashes.
Each hash object must include an `"algorithm"` field with a string value representing the algorithm used to hash the linked file.
Each hash object may include any other necessary fields for the given algorithm to prove the linked files authenticity.

Alternatively, users may want to link to content which frequently changes, such as HTML documents or live streams, and therefore cannot be hashed to prove its authenticity.
Clients must support publishing these sorts of documents as link objects instead to indicate to viewing users that the content may have changed since the original publish time.

### Tags

Users may choose to include tags in activity objects to bring them to the attention of other users.
Implementers must support a `"tag"` field on any activity object which may contain a string, an activity sub-object of type `"Tag"` or `"Mention"` or an array of strings and/or sub-objects.
Mention sub-objects must include a `"type"` field with the value `"Mention"` and a `"href"` field containing the DSNP User Id of the mentioned user.

### Timestamps

All activity objects must include a `"published"` key with a timestamp value string matching the [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) format with timezone.
Clients may choose to treat content marked as published significantly in the future as scheduled content which will be presented to the user later or ignored entirely.
Likewise, clients may choose to treat content marked as published significantly in the past as archival content which is only displayed to the user when sought out or ignore it entirely.

In any case, timestamps cannot be trusted to represent the true time that a message is posted on the DSNP due to the decentralized nature of the system and the relativistic limits of communication across the world.
Clients may sort content by it's provided published timestamp, but it should be made clear to the user where ever possible that these timestamps are not necessarily accurate.
