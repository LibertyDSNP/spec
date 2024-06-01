# Batch Publication Validation

<!-- Links to https://frequency-chain.github.io/frequency should be updated with links to docs.frequency.xyz when able to be -->

The [Frequency Message](https://frequency-chain.github.io/frequency/common_primitives/messages/struct.MessageResponse.html) for a Batch Publication has several important fields for validation:

| Field | Description |
| ----- | ----------- |
| `provider_msa_id` | MSA Id of the provider sending the message |
| `cid` | The [Content IDentifier v1](https://github.com/multiformats/cid/) for IPFS content |
| `payload_length` | Expected length of the content from IPFS |
| `block_number` | Block number that the message was recorded on the chain. |

## File Validation

1. Retrieve the file from the IPFS network using the `cid`.
1. Verify the file hash by [comparing it to the hash included in the `cid`](https://docs.ipfs.tech/concepts/hashing/). (Required for non-trusted IPFS nodes.)
1. Verify that the byte length of the retrieved file matches the `payload_length`.

## Publication Announcements Validation

1. Collect the unique set of `fromId` values.
1. Use the [Custom RPC `msa.checkDelegations()`](https://frequency-chain.github.io/frequency/pallet_msa_rpc/trait.MsaApiClient.html#method.check_delegations) with the `fromId` values as the `delegator_msa_ids` and the `provider_msa_id` at the `block_number`.
1. The `fromId` values that `msa.checkDelegations()` verifies as having a delegation at `block_number` are valid Announcements.
1. Set the `schema_id` parameter to the Schema Id used in the Frequency Message

## Announcement Duplicates

Duplicate Announcements MUST be rejected or ignored.
