---
name: Introduction
route: /
---

# DSNP Specification

## Version 0.10.0

Welcome to the Decentralized Social Networking Protocol (DSNP) specification!
Here you can find a detailed documentation regarding the current state of the protocol, previous iterations and proposals for future extensions.
**Please note, the protocol specification is still very much a work in progress at this time, and the information within is subject to frequent changes.**

## Goals & Purpose

The free communication of users on the internet faces a variety of problems in the modern day.
These challenges include censorship from state and corporate actors, the amplification of misinformation through viral content, and an ever-shrinking collection of near monopolies with absolute power over social interaction in the 21st century.
Through the DSNP, we hope mitigate and ideally solve these challenges in the way social interaction operates online.

## How to Read This Specification

The specification is divided into several modules.
Each module describes a mostly self-contained aspect of the DSNP and includes documents detailing the function and intended use the module.

Proposals for some of these future extensions can be found in the [Draft Specifications](#draft-specifications) section and on [GitHub](https://github.com/LibertyDSNP/spec/labels/enhancement),
however these proposals should be regarded with caution as they are largely incomplete and may be subject to change or deletion without notice.

## Implementation Status

**DISCLAIMER**

The DSNP is still in a work in progress and as such it is currently subject to frequent changes.
We do not recommend implementing any software based on this document in its current state.
Once the Protocol Specification reaches an appropriate degree of completeness, we will remove this disclaimer.

### Versions

DSNP Specification Versions follow [Semantic Versioning 2.0](https://semver.org/) for releases.
Draft Specifications do NOT effect the version number until they are included.
Reference and Roadmap changes do NOT effect the version number.

| Name | Description | Date |
| --- | --- | --- |
| 1.0.0 | Initial Release | In Progress |

### Draft Specifications

| Name | Status | Description |
| --- | --- | --- |
| [Archivist](/Draft/Archivists) | DRAFT | Long term DSNP Announcement Storage |

#### Draft Status Definitions

| Name | Description |
| --- | --- |
| **Draft** | Open for comment and major changes. |
| **Proposed** | Ready for formal review. It should be done except for minor changes. |
| **Tentative** | This is the accepted plan. The specification should not change unless there are blocking issues. |

## Language Interfaces

### Solidity

All included Solidity interfaces are targeting the Solidity language version 0.8.x.
Other versions may be available in the [official contracts code repository](https://github.com/LibertyDSNP/contracts).

## Contracts and Interfaces

Official DSNP interfaces and implementations code may be found in [GitHub](https://github.com/LibertyDSNP/contracts).

## DSNP SDKs

- [Official TypeScript/JavaScript](https://github.com/LibertyDSNP/sdk-ts)

## Roadmap
*Last Updated: 2021-09-08*

### Completed

| Work | Status |
| --- | --- |
| Whitepaper | Done (2020 Q4) |
| Spec Outline | Done (2021 Q1) |
| Batch Announce First Draft  | Done (2021 Q1) |
| Spec Live! | Done (2021 Q1) |
| Identity Contract & Delegation | Done (2021 Q2) |
| Batch Announce File Format | Done (2021 Q3) |
| Identity Factory | Done (2021 Q2) |
| Graph Handle Registry | Done (2021 Q2) |
| Batch Announce Filter System | Done (2021 Q3) |
| Graph Data | Done (2021 Q3) |
| Announcement/Publishing Revision | Done (2021 Q3) |
| Stabilize 1.0 | Done (2021 Q3) |

### Future

Below is a tentative roadmap to what protocol features are being developed next!
Order is approximately in current priority order.

#### Chain Migration
*Status: In progress*

Ethereum's cost is just too high.
Migrate the DSNP architecture to another chain.

#### Private Graph
*Status: Whitepaper*

Keep some graph connections private with permissioned access.  

#### Direct Messaging
*Status: Whitepaper*

One-to-one messaging with metadata privacy.

#### Public Friends
*Status: Not Started*

Graph connections are currently limited to one-way follow relationships.
Build support for other forms of relationships that require all parties to opt-in.

#### Social Account Recovery
*Status: Not Started*

Use the social graph to leverage safe account recovery and protect against private key losses.

#### Private Friends
*Status: Not Started*

Expand private graph to other relationships while maintaining metadata protection.

#### Verified Attributes
*Status: Not Started*

Some users and applications need social identities with additional layers of validation.
How can these be created while being privacy preserving and support and open system.

#### Distributed Content Moderation
*Status: Not Started*

Content moderation is hard because it is different for different people.
Make the individual nature of content moderation easier through distributing the work and results.

#### Namespace and Multichain support
*Status: Not Started*

Identity and content could flow from other systems needing to know where that data originated without collisions.
Supporting multichain would be the first step and allow even greater user choice, without locking data to one chain or network.  

#### Content Bridges
*Status: Not Started*

Open social network bridges would allow more content and users accessible to all via DSNP.

#### Service-Node Protocols
*Status: Not Started*

Sub-specifications targeted at ecosystem services to promote interoperability.

#### Private Group Messaging
*Status: Not Started*

Secure many-to-many conversions.
Group chat style still with metadata privacy.

#### Private Posts to Friends
*Status: Not Started*

Secure one-to-many posts that still allow for commenting.

#### Third-party Identity Bridges
*Status: Not Started*

Create ways for users to be able to bring their own identities or connect a DSNP Identity with outside identities.

#### Archivists
*Status: [Draft](/Draft/Archivists)*

Long-term storage for announcements and perhaps expanding to content storage.

#### Peer-to-Peer publishing
*Status: Not Started*

Build a peer-to-peer system for announcement publishing for faster routing and message delivery.

# Learning More

In addition to this document, more resources regarding our project can be found at [DSNP.org](https://www.dsnp.org), including our blog, forum, code repository and SDK.
