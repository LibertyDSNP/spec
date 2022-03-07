---
menu: "DSNP: Ethereum"
name: Announcement Validation
route: /Ethereum/Validation
---

# Announcement Validation

DSNP Announcements on Ethereum are validated at read time.

1. Read `DSNPBatchPublication` events.
2. Fetch and validate the Batch Publication.
3. Recover and validate the Ethereum address from the Announcement.

## Batch Publication Validation

1. Hash the batch publication file using using [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).
2. Retrieve the published hash for the given file from the [DSNPBatchPublication](/Ethereum/Publishing) Event.
3. The file hash MUST match the retrieved hash from the `DSNPBatchPublication` event.

## Announcement Signature Validation

1. Recover the Ethereum address from the [signature](/DSNP/Signatures).
2. Find the [Identity Contract](/Ethereum/Identity) for the given `fromId`.
3. Test the recovered Ethereum address against the Identity Contract via `IDelegation.isAuthorizedTo` with the permission `ANNOUNCE` and the block number from the `DSNPBatchPublication` event.

## Announcement Duplicates

Duplicates may be identified as any Announcements that match a previous Announcement's signature field (per the [Announcement Order](/Ethereum/Publishing#ordering)).
Duplicate Announcements MUST be rejected or ignored.
