---
name: Overview
route: /ActivityPub/Overview
menu: ActivityPub
---

# Activity Pub Overview

Content shared via the DSNP will generally consist of URIs pointing to documents containing Activity Pub JSON objects.
For the purposes of the DSNP, only a subset of the [Activity Pub Streams](https://www.w3.org/TR/activitypub/) and [Activity Pub Vocabulary](https://www.w3.org/TR/activitystreams-vocabulary/) specifications must be supported by default.
Optionally, some implementers may choose to support more of the Activity Pub standards as they see fit, but as a warning, these standards may include ambiguities which could lead to different and incompatible implementations of certain features.
Implementers who extend their support for Activity Pub objects beyond the minimal subset defined here do so at their own risk.

Additionally, some aspects of the ActivityPub standard may be modified or extended in the context of the DSNP to support specific validations or features necessary in a distributed context.
These deviations from the standard will be thoroughly documented here.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Identify what aspects of the existing Activity Pub specifications are supported, encouraged or enforced in the DSNP.
1. Specify any extensions or modifications of the Activity Pub specifications that must be supported or required by the DSNP.

## Assumptions

* All broadcast messages link to an activity pub object, not any other form of content.
* All reply messages link to an activity pub object, not any other form of content.

## Minimum Subset

At minimum, all clients implementing the DSNP must support presentation for the following message types from the ActivityPub vocabulary: `"Link"`, `"Note"` and `"Person"`.
It is also strongly encouraged to support `"Audio"`, `"Image"`, `"Mention"`, `"Profile"`, `"Tombstone"` and `"Video"` where ever possible.

## Extensions

In addition to the standards defined by the ActivityPub specifications, some extensions of ActivityPub are also required by the DSNP due to its decentralized context.

### Required Keys and Values

Certain suggested properties of objects in the ActivityPub standard are required for validation by the DSNP.
As such all clients, indexers and announcers must require these fields in any messages received.
Messages not meeting these requirements must be ignored.

#### Timestamps

All Activity Pub content must include a `"published"` key with a timestamp value string matching the [ISO8601](https://www.iso.org/iso-8601-date-and-time-format.html) format with timezone.
Clients may choose to treat content marked as published significantly in the future as scheduled content which will be presented to the user later or ignored entirely.
Likewise, clients may choose to treat content marked as published significantly in the past as archival content which is only displayed to the user when sought out or ignore it entirely.

In any case, timestamps cannot be trusted to represent the true time that a message is posted on the DSNP due to the decentralized nature of the system and the relativistic limits of communication across the world.
Clients may sort content by it's provided published timestamp, but it should be made clear to the user where ever possible that these timestamps are no necessarily accurate.
