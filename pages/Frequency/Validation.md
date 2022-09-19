# Announcement Validation

DSNP Announcements are validated differently depending on the type of Announcement.
Batched Announcements are off-chain and MUST be validated at read time.
Non-batched Announcements (example: Graph Change), are on-chain and are validated at write time and do not need to be re-validated at read time.

## On-chain Announcements

Creation of an Announcement as an on-chain Frequency Message requires that the delegation be validated before adding the message to the chain.
Thus, any Graph Change Announcements read from a trusted node, can be trusted to have been made by the DSNP identity or a delegate of the identity at the time the Frequency Message was sent.

### On-Chain Announcement Types
- Graph Change


## Batch Publication Announcements

DSNP Announcements that are in a Batch Publication MUST be validated at read time.

### Batched Announcement Types
- Tombstone
- Broadcast
- Reply
- Reaction
- Profile

<!-- Links to https://libertydsnp.github.io/frequency should be updated with links to docs.frequency.xyz when able to be -->

## Batch Publication Frequency Message Validation

The [Frequency Message](https://libertydsnp.github.io/frequency/common_primitives/messages/struct.MessageResponse.html) for a Batch Publication has several important fields for validation:

| Field | Description |
| ----- | ----------- |
| `provider_msa_id` | MSA Id of the provider sending the message |
| `cid` | The [Content IDentifier v1](https://github.com/multiformats/cid/) for IPFS content |
| `payload_length` | Expected length of the content from IPFS |
| `block_number` | Block number that the message was recorded on the chain. |

### File Validation

1. Retrieve the file from the IPFS network using the `cid`.
1. (Required for non-trusted IPFS nodes) Verify the file hash by [comparing it to the hash included in the `cid`](https://docs.ipfs.tech/concepts/hashing/).
1. Verify that the byte length of the retrieved file matches the `payload_length`.

### Publication Announcements Validation

1. Collect the unique set of `fromId` values.
1. Use the [Custom RPC `msa_checkDelegations`](https://libertydsnp.github.io/frequency/pallet_msa_rpc/trait.MsaApiClient.html#method.check_delegations) with the `fromId` values as the `delegator_msa_ids` and the `provider_msa_id` at the `block_number`.
1. The `fromId` values that `msa_checkDelegations` verifies as having a delegation at `block_number` are valid Announcements.

## Announcement Duplicates

Duplicate Announcements MUST be rejected or ignored.
