---
name: Introduction
route: /
---

# DSNP Specification

## Version 0.9.0

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

| Name | Description | Date |
| --- | --- | --- |
| 1.0.0 | Initial Release | In Progress |

### Draft Specifications

| Name | Status | Description |
| --- | --- | --- |
| [Archivist](/Draft/Archivists) | DRAFT | Long term DSNP Announcement Storage |

#### Status Definitions

| Name | Description |
| --- | --- |
| **Draft** | Open for comment and major changes. |
| **Proposed** | Ready for formal review. It should be done except for minor changes. |
| **Tentative** | This is the accepted plan. The specification should not change unless there are blocking issues. |

## Solidity Interfaces

All included Solidity interfaces are targeting the Solidity language version 0.8.x.
Other versions may be available in the [official contracts code repository](https://github.com/LibertyDSNP/contracts).

## Contracts and Interfaces

Official DSNP interfaces and implementations code may be found in [GitHub](https://github.com/LibertyDSNP/contracts).

## DSNP SDKs

- [Official TypeScript/JavaScript](https://github.com/LibertyDSNP/sdk-ts)

## Roadmap

Here is a high level roadmap to what content is coming next!

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
| Chain Migration Options | 2021 |
| Stabilize 1.0 | 2021 |
| Archivist (Post 1.0) | 2021 |
| Chain Migration Plan (Post 1.0) | Future |
| Private Graph (Post 1.0) | Future |
| Private Announcements and Content (Post 1.0) | Future |
| Verified Attributes (Post 1.0) | Future |

# Learning More

In addition to this document, more resources regarding our project can be found at [DSNP.org](https://www.dsnp.org), including our blog, forum, code repository and SDK.
