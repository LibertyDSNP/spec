---
menu: Batch Publications
name: Validation
route: /BatchPublications/Validation
---

# Batch Publication Validation

## Publication Hash Validation

1. Hash the batch publication file using using [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).
2. Retrieve the published hash for the given file from the [DSNPBatchPublication](/BatchPublications/Publishing) Event.
3. The file hash MUST match the retrieved hash from the `DSNPBatchPublication` Event.

## Announcement Schema & Type Validation

- Every batch file MUST contain only one type of [Announcement](/Announcements/Overview#announcement-types).
- Batch file columns MUST match the Announcement Type Columns.
- Column order is NOT guaranteed
