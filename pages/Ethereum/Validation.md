# Announcement Validation

DSNP Announcements on Ethereum are validated at read time.

1. Read `DSNPBatchPublication` events.
2. Fetch and validate the Batch Publication.
3. Validate the chain of delegation from the Announcement's `fromId` to the sender of the transaction with the `DSNPBatchPublication` event.

## Batch Publication Validation

1. Hash the batch publication file using [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf).
2. Retrieve the published hash for the given file from the [`DSNPBatchPublication`](Publishing.md) Event.
3. The file hash MUST match the retrieved hash from the `DSNPBatchPublication` event.

## Announcement Validation

1. Get the Ethereum address of the sender for the transaction from the Batch (aka the Batch Publisher).
2. Find the [Identity Contract](Identity.md) for the Announcement's `fromId`.
2. Test the Batch Publisher's Ethereum address against the Identity Contract via `IDelegation.isAuthorizedTo` with the permission `ANNOUNCE` and the block number from the `DSNPBatchPublication` event.

## Announcement Duplicates

Duplicate Announcements MUST be rejected or ignored.
