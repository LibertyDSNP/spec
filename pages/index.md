# DSNP Specification

Welcome to the Decentralized Social Networking Protocol (DSNP) specification.
Here you can find the detailed specification documentation for DSNP, official DSNP system
specifications, and associated specifications.

## Goals & Purpose

Free communication among users on the Internet faces a variety of problems in the modern day.
These challenges include censorship by state and corporate actors, the amplification of
misinformation through viral content, and an ever-shrinking collection of near monopolies with
absolute power over social interaction in the twenty-first century.
Through DSNP, we hope to mitigate and ideally solve these challenges in the way social
interaction operates online.

## How to Read This Specification

DSNP is organized into a layered set of protocol specifications under the
Protocols section, plus associated content and credential
specifications, and system implementations.

### Protocol Specifications

| Name | Version | Description |
| --- | --- | --- |
| [DSNP Core](DSNP/Protocols/Core/Overview.md) | 1.3.0 | System-agnostic DSNP protocol primitives: identity, keys, delegation, operations, records, and the announcement and user data framework |
| [DSNP Social Networking](DSNP/Protocols/Social/Overview.md) | 1.3.0 | Social graph, social media content types, and social user data — a subspecification of Core |

### Associated Specifications

| Name | Version | Description |
| --- | --- | --- |
| [Activity Content](ActivityContent/Overview.md) | 1.3.0 | Content format for DSNP-referenced media (subset of W3C Activity Streams 2.0) |
| [Verifiable Credentials](VerifiableCredentials/Overview.md) | 1.3.0 | Use of W3C Verifiable Credentials and DIDs with DSNP |

### System Specifications

| Consensus System | DSNP System Specification |
| --- | --- |
| [Frequency](https://frequency.xyz) | [DSNP Over Frequency](Frequency/Overview.md) |

## Versioning

DSNP specification versions follow [Semantic Versioning 2.0](https://semver.org/) for releases.

## Contributions

Development occurs on [GitHub](https://github.com/LibertyDSNP/spec).
All interactions must follow the
[Code of Conduct](https://github.com/LibertyDSNP/spec/blob/main/CODE_OF_CONDUCT.md) and
[Contribution Guidelines](https://github.com/LibertyDSNP/spec/blob/main/CONTRIBUTING.md).

## Learning More

In addition to this document, more resources regarding the project can be found at
[DSNP.org](https://www.dsnp.org), including the blog, forum, code repositories, and other
supporting software libraries and examples.
