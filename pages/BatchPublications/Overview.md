---
menu: Batch Publications
name: Overview
route: /BatchPublications/Overview
---

# Batch Publications

The Batch Publication specifies how groups of Announcements are stored, communicated, retrieved, and validated.

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Collection of Announcements

Each Batch Publication is reference to a Batch File with a collections of a single type of [Announcement](/Messages/Overview).

## Batch File Format

The storage file format is [Apache Parquet](https://github.com/apache/parquet-format).
See [Batch File Format](/BatchPublications/FileFormat) for additional details and requirements.

## Batch File Retrieval

- Batch File URLs MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890).
- Batch File URLs MUST use one of the supported URL Schemes

### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC 2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |

## Publishing

Batch Publications are communicated to the network via an Ethereum Log Event: `DSNPBatchPublication`.
See [Publishing](/BatchPublications/Publish) for details and requirements.
