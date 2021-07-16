---
name: Overview
route: /Announcements/Overview
menu: Announcements
---

# Announcements Overview

Announcements are content or reference to content that are included in [Batch Publication Files](/BatchPublications/Overview)
to communicate new user activity to the rest of the network.
All Announcements have a [signature](/Announcements/Signatures) to validate the creators authority to publish content.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Announcement Types

Each Announcement has a enumerated type for use when separating out a stream of Announcements.

| Value | Name | Description | DSNP Announcement Id |
|------ | ---- | ----------- | -------------------- |
| 0 | Reserved | reserved for future use | - |
| 1 | [GraphChange](/Announcements/Types/GraphChange) | social graph changes | no |
| 2 | [Broadcast](/Announcement/Types/Broadcast) | a public post | YES |
| 3 | [Reply](/Announcement/Types/Reply) | a public response to a Broadcast | YES |
| 4 | [Reaction](/Announcement/Types/Reaction) | a public visual reply to a Broadcast | no |
| 5 | [Profile](/Announcement/Types/Profile) | a profile | YES |
