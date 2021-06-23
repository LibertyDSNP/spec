---
name: Overview
route: /ActivityStreams/Overview
menu: Activity Streams
---

# Activity Streams Overview

Content shared via the DSNP will generally consist of URIs pointing to documents containing Activity Streams JSON objects.
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
Link objects must have a `"type"` field with a value of `"Link"` and a `"URL"` field with a valid URL string value.
Clients must at least support valid URLs with a `"https://"` protocol, but clients may choose to ignore any other protocols as they see appropriate for the security of users.
Clients may also choose to ignore link objects with IP address hostnames or invalid domain names.

#### Note

Note type objects must be supported to represent text content posted by users.
Note objects must have a `"type"` field with a value of `"Note"` and a `"content"` field with a string value.
Clients should support display of content with unicode text as possible in their given browser or operating system.
Clients may also support display of [Markdown](https://daringfireball.net/projects/markdown/) or [BBCode](https://www.bbcode.org) as appropriate.

Note objects may include an `"attachments"` field with an array value containing activity sub-objects representing external content referenced by the note object.
Clients must support display of attachments objects with type `"Link"`.
Clients that support display of audio, image and video type objects should support display of each attachments object types respectively.

Note objects may include a `"tags"` field with an array value containing activity sub-objects representing tags and mentions in the content of the note object, however clients and indexers may ignore these fields as they see fit.
Note objects may also include a `"summary"` field with a string value containing a brief summation of the `"content"` field.

#### Person

Person type objects must be supported to represent display names for users.
Person objects must have a `"type"` field with a value of `"Person"` and a `"name"` field with a string value representing a nickname for the user to be displayed alongside the user's DSNP User Id or handle.

### Recommended Activity Types

#### Audio

Clients are recommended to support presentation for activity objects of type audio to represent audio content posted by users.
Audio type objects, if supported, must at minimum contain a `"type"` field with the value `"Audio"` and a `"URL"` with an activity sub-object of type link  containing a URL pointing to an audio file.

Audio objects are also recommended to include a `"mediaType"` field with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support audio objects must at least support media types of `"audio/mpeg"` complying with [RFC3003](https://tools.ietf.org/html/rfc3003), `"audio/ogg"` complying with [RFC5334](https://tools.ietf.org/html/rfc5334) and `"audio/webm"` complying with the [WebM standard](https://www.webmproject.org/docs/container/).

Audio objects may also include a `"duration"` field with a string value complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Audio objects may include a `"preview"` field with an activity sub-object of type link referring to a shorter audio file provided as a preview of longer audio files.

#### Image

Clients are recommended to support presentation for activity objects of type image to represent image content posted by users.
Image type objects, if supported, must at minimum contain a `"type"` field with the value `"Image"` and a `"URL"` with an activity sub-object of type link containing a URL pointing to an image file.

Image objects are also recommended to include a `"mediaType"` field with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support image objects must at least support media types of `"image/jpeg"` complying with [RFC2045](https://www.iana.org/go/rfc2045), `"image/png"` complying with the [W3C PNG Standard](https://www.w3.org/TR/2003/REC-PNG-20031110/), `"image/svg+xml"` complying with the [W3C SVG standard](https://www.w3.org/Graphics/SVG/) and `"image/webp"` complying with the [WebM standard](https://www.webmproject.org/docs/container/).
Clients are also recommended to support `"image/gif"` complying with [RFC2045](https://www.iana.org/go/rfc2045) and `"image/heic"` complying with the [ISO/IEC JTC-1](http://www.iso.org/iso/jtc1_home.html) standard where possible.

Image objects may include a `"preview"` field with an activity sub-object or array of activity sub-objects of type link referring to a smaller resolution image or images provided as previews of larger image files.
Preview fields should generally include at least one file of the following resolutions: `320x240`, `640x480` or `1024x768`.

Clients that support image objects should also include fields of `"height"` and `"width"` each with positive integer value.
If these fields are not provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.
Clients may also ignore image files of exceptionally large or small sizes, however images with a preview of one of the prior mentioned resolutions must always be supported.

#### Profile

Clients are recommended to support presentation for activity objects of type profile to represent profile data associated with users.
Profile type objects, if supported, must at minimum contain a `"type"` field with the value `"Profile"` and a `"describes` field with an activity sub-object of type person to represent the user being described by the profile object.

Profile objects may include a `"summary"` field with a string value representing a short biography of the user.
Profile objects may include an `"avatar"` field with an activity sub-object of type image referring to an image to be used as the user's avatar.
Profile objects may include a `"links"` field with an array of activity sub-objects of type link referring to other websites or profiles associated with the user.

#### Video

Clients are recommended to support presentation for activity objects of type video to represent video content posted by users.
Video type objects, if supported, must at minimum contain a `"type"` field with the value `"Video"` and a `"URL"` with an activity sub-object of type link containing a URL pointing to a video file.

Video objects are also recommended to include a `"mediaType"` field with a standard [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) string value.
If no media type is provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.

Clients that support video objects must at least support media types of `"video/mpeg"` complying with [RFC2045](https://www.iana.org/go/rfc2045), `"video/ogg"` complying with [RFC5334](https://www.iana.org/go/rfc5334) and `"video/webm"` complying with the [WebM standard](https://www.webmproject.org/docs/container/).
Clients are also recommended to support `"video/H256"` complying with [RFC7798](https://www.iana.org/go/rfc7798), `"video/mp4"` complying with [RFC4337](https://www.iana.org/go/rfc4337) and `"video/raw"` complying with [RFC4175](https://www.iana.org/go/rfc4175).

Video objects may also include a `"duration"` field with a string value complying with the [XML Schema 11-2](https://www.w3.org/TR/xmlschema11-2/) standard for duration strings as recommended in the [Activity Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/#dfn-duration) specification.
Video objects may include a `"preview"` field with an activity sub-object of type link referring to a shorter video file or image file provided as a preview of longer video files.
It is recommended that implementers at minimum include one image previews wherever possible.
Preview images should generally include at least one file of the following resolutions: `320x240`, `640x480` or `1024x768`.

Clients that support Video objects should also include fields of `"height"` and `"width"` each with positive integer value.
If these fields are not provided, clients may attempt to infer the media type from the headers of the linked file or simply ignore the object.
Clients may also ignore video files of exceptionally large or small sizes, however videos with a preview of one of the prior mentioned resolutions must always be supported.

## Extensions

In addition to the standards defined by the Activity Streams specifications, some extensions of Activity Streams are also required by the DSNP due to its decentralized context.

### Content Contexts

Clients may sometimes want to represent content as existing within a specific presentation or social context, such as Reddit's subreddit concept, Slack's channels or old style forum rooms.
It is recommended that implementers represent this context in activity objects with the `"context"` field.
If present, this field must have a string value starting with the name of the implementing service followed by forward slash and a string unique to the specfici context.
Implementers are encouraged to add additional forward slash separators to their unique string to represent contexts within contexts.
For example, a `#development` channel context within a `LibertyDSNP` organization on Slack could be represented by the string, `"Slack/LibertyDSNP/#development"`.

Clients may choose to ignore activity objects with contexts outside the user's current context, but it is strongly recommended that all contexts be made accessible to the user through some form of navigation.

### Deletion Support

Users may occaisionally want to delete an activity object by changing it's contents, thereby changing it's hash value and invalidating any signature associated with it via broadcast or reply messages on chain.
Likewise, hosts of activity objects may want to do the same for the purpose of removing illegal or otherwise objectionable content.
Implementers are strongly recommended to represent this by adding a `"deleted"` field to the hosted activity object with an [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) timestamp representing the time at which the content was removed.
Implementers may choose to leave all other fields intact or remove them as they see fit.

Clients may choose to represent deleted content with a small tombstone message, such as "content removed," or ignore deleted content entirely.

### Required Keys and Values

Certain suggested properties of objects in the Activity Streams standard are required for validation by the DSNP.
As such all clients, indexers and announcers must require these fields in any messages received.
Messages not meeting these requirements must be ignored.

#### Timestamps

All activity objects must include a `"published"` key with a timestamp value string matching the [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) format with timezone.
Clients may choose to treat content marked as published significantly in the future as scheduled content which will be presented to the user later or ignored entirely.
Likewise, clients may choose to treat content marked as published significantly in the past as archival content which is only displayed to the user when sought out or ignore it entirely.

In any case, timestamps cannot be trusted to represent the true time that a message is posted on the DSNP due to the decentralized nature of the system and the relativistic limits of communication across the world.
Clients may sort content by it's provided published timestamp, but it should be made clear to the user where ever possible that these timestamps are not necessarily accurate.
