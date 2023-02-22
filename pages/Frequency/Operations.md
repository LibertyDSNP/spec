# Operations
## Method of execution
Since DSNP Operations change state, DSNP operations are executed on Frequency via on-chain transactions, also known as extrinsic calls.
An extrinsic is a type of function defined in a Substrate Pallet.  A Pallet is a Substrate runtime module and also a Cargo crate.

### msa pallet
Responsible for DSNP Identity operations and Delegation management

### messages pallet
Responsible for DSNP Announcement operations.

## List of Operations

| Operation                                             | Principal(s)      | Pallet::Extrinsic                                                                      | State Change Record                                                     |
|-------------------------------------------------------|-------------------|----------------------------------------------------------------------------------------|-------------------------------------------------------------------------|
| <a id="create-identifier">Create Identifier</a>       | None              | `pallet_msa::create`, `pallet_msa::create_sponsored_account_with_delegation`           | [Identifier Creation Record](Records.md#identifier-creation)            |
| <a id="retire-identifier">Retire Identifier</a>       | User              | `pallet_msa::retire_msa`                                                               | [Identifier Retirement Record](Records.md#identifier-retirement)        |
| <a id="define-delegation">Define Delegation</a>       | User AND Delegate | `pallet_msa::grant_delegation`, `pallet_msa::create_sponsored_account_with_delegation` | [Delegation Definition Record](Records.md#delegation-definition)        |
| <a id="revoke-delegation">Revoke Delegation</a>       | User              | `pallet_msa::revoke_delegation_by_delegator`                                           | [Delegation Revocation Record](Records.md#delegation-revocation)        |
| <a id="revoke-delegation">Revoke Delegation</a>       | Delegate          | `pallet_msa::revoke_delegation_by_provider`                                            | [Delegation Revocation Record](Records.md#delegation-revocation)        |
| <a id="add-control-key">Add Control Key</a>           | User              | `pallet_msa::add_public_key_to_msa`                                                    | [Control Key Addition Record](Records.md#control-key-addition)          |
| <a id="remove-control-key">Remove Control Key</a>     | User              | `pallet_msa::delete_msa_public_key`                                                    | [Control Key Removal Record](Records.md#control-key-removal)            |
| <a id="publish-announcement">Publish Announcement</a> | User OR Delegate  | `pallet_messages::add_onchain_message`                                                 | [Announcement Published Record](Records.md#announcement-published)      |
| <a id="publish-batch">Publish Batch</a>               | User OR Delegate  | `pallet_messages::add_ipfs_message`                                                    | [Batch Published Record](Records.md#batch-published)                    |

