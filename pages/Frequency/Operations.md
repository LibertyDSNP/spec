# Operations
## Method of execution
DSNP Operations are executed on Frequency via on-chain transactions, also known as extrinsic calls.
An extrinsic is a type of function defined in a [Substrate](https://substrate.io/) Pallet.
A Pallet is a Substrate runtime module and also a Cargo crate.

### MSA Pallet
Responsible for DSNP Identity Operations and Delegation management.

### Schema Pallet
Responsible for managing the data structures for DSNP Announcements and User Data.

### Messages Pallet
Responsible for most DSNP Announcement Operations (see [Publishing](./Publishing.md)).

### Stateful Storage Pallet
Responsible for DSNP User Data (see [User Data](./UserData.md)) and select Announcement Operations (see [Publishing](./Publishing.md)).

### Documentation Links
- [Frequency Documentation](https://docs.frequency.xyz)
- [Frequency Rust Documentation](https://frequency-chain.github.io/frequency)

## Principals

Every Frequency transaction for DSNP is accompanied by an Schnorrkel/Ristretto X25519 ("sr25519") derived cryptographic signature and associated public key.
When the transaction occurs, the signature is validated and the [MSA Id](./Identity.md#identity) is retrieved.

| DSNP Term | Frequency Term |
| --- | --- |
| User | [User / Delegator](./Identity.md#user) |
| Delegate | [Provider](./Identity.md#delegate) |

## Failure Handling

Frequency has a variety of errors that fall into these classes:

- Timeout: A transaction with an unknown status after a set time.
- Node Rejection: Public nodes may reject transactions from unknown parties.
- Node Validation Error: A node will reject malformed or invalid transactions when possible.
- Execution Error: A transaction that was included in a block but failed upon execution.

Transactions are not automatically resubmitted.
Check with the [Frequency Documentation](https://docs.frequency.xyz) for more information regarding errors.

## List of Operations

Write operations are via Transactions (also called Extrinsics): `pallet::extrinsic()`

| Operation | Principal(s) | Pallet::Extrinsic | State Change Record |
| --- | --- | --- | --- |
| <a id="create-identifier">Create Identifier</a>       | None              | [`msa::create()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.create), [`msa::create_sponsored_account_with_delegation()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.create_sponsored_account_with_delegation)           | [Identifier Creation Record](Records.md#identifier-creation)            |
| <a id="retire-identifier">Retire Identifier</a>       | User              | [`msa::retire_msa()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.retire_msa)                                                               | [Identifier Retirement Record](Records.md#identifier-retirement)        |
| <a id="define-delegation">Define Delegation</a>       | User AND Delegate | [`msa::grant_delegation()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.grant_delegation), [`msa::create_sponsored_account_with_delegation()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.create_sponsored_account_with_delegation) | [Delegation Definition Record](Records.md#delegation-definition)        |
| <a id="revoke-delegation">Revoke Delegation</a>       | User              | [`msa::revoke_delegation_by_delegator()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.revoke_delegation_by_delegator)                                           | [Delegation Revocation Record](Records.md#delegation-revocation)        |
| <a id="revoke-delegation">Revoke Delegation</a>       | Delegate          | [`msa::revoke_delegation_by_provider()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.revoke_delegation_by_provider)                                            | [Delegation Revocation Record](Records.md#delegation-revocation)        |
| <a id="add-control-key">Add Control Key</a>           | User              | [`msa::add_public_key_to_msa()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.add_public_key_to_msa)                                                    | [Control Key Addition Record](Records.md#control-key-addition)          |
| <a id="remove-control-key">Remove Control Key</a>     | User              | [`msa::delete_msa_public_key()`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Call.html#variant.delete_msa_public_key)                                                    | [Control Key Removal Record](Records.md#control-key-removal)            |
| <a id="publish-announcement">Publish Announcement</a> | User OR Delegate  | [`messages::add_onchain_message()`](https://frequency-chain.github.io/frequency/pallet_messages/pallet/enum.Call.html#variant.add_onchain_message)                                                 | [Announcement Published Record](Records.md#announcement-published)      |
| <a id="publish-batch">Publish Batch</a>               | User OR Delegate  | [`messages::add_ipfs_message()`](https://frequency-chain.github.io/frequency/pallet_messages/pallet/enum.Call.html#variant.add_ipfs_message)                                                    | [Batch Published Record](Records.md#batch-published)                    |
| <a id="get-user-data">Get User Data</a> | Any | See [User Data: Read Operation Mapping](./UserData.md#read-operation-mapping) | - |
| <a id="replace-user-data">Replace User Data</a> | User OR Delegate | See [User Data: Write Operation Mapping](./UserData.md#write-operation-mapping) | [User Data Replaced Record](Records.md#user-data-replaced) |
