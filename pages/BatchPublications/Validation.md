---
menu: Batch Publications
name: Validation
route: /BatchPublications/Validation
---

# Batch Publication Validation

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |

## Publication Hash Validation

1. Hash the batch publication file using using [keccak-256](https://en.wikipedia.org/wiki/SHA-3).
2. Retrieve the published hash for the given file from the [DSNPBatchPublication](/BatchPublications/Publishing) Event.
3. The file hash MUST match the retrieved hash from the `DSNPBatchPublication` Event.

## Announcement Schema & Type Validation

- Every batch file MUST contain only one type of [Announcement](/Messages/Overview#dsnp-announcement-formats).
- Batch file columns MUST match the Announcement Type Columns.
- Column order is NOT guaranteed
