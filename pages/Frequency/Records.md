# State Change Records

State Change Records constitute the observable output of a DSNP system.
Frequency uses a combination of on chain data to store and Events to notify for Records.

## Frequency Transaction Identifier

Frequency uses the hash of the [Operation](Operations.md) transaction to then request a node report the transaction status and any Events related to the that hash.
(Client libraries usually have this built in.)

## Frequency Records

Frequency produces three types of Records.
- Events
- Messages
- State

### Events

Events are generated on each block and may contain a pointer to the Record data instead of the entire Record.

Events are reference by `pallet::EventName`.

### Messages

Frequency Messages store Announcements or Batch Publication Records.
It uses the [Messages Pallet](https://libertydsnp.github.io/frequency/pallet_messages/).

Messages are retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

### State

Frequency State stores data associated with an [Identity](Identity.md).
It can also be used to lookup the state of prior Records related to an Identity.

State data is retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpc_call()`).

## Record Mappings

| Record Type | Record Pointer/Location |
| --- | --- |
| <a id="identifier-creation">Identifier Creation Record</a> | Event: `pallet_msa::MsaCreated`<br/>State: `pallet_msa.publicKeyToMsaId` |
| <a id="identifier-retirement">Identifier Retirement Record</a> | Event: `pallet_msa::MsaMsaRetired` |
| <a id="delegation-definition">Delegation Definition Record</a> | Event: `pallet_msa::DelegationGranted`, `pallet_msa::DelegationUpdated`<br />RPC: `pallet_msa.check_delegations()`, `pallet_msa.get_granted_schemas_by_msa_id()` |
| <a id="delegation-revocation">Delegation Revocation Record</a> | Event: `pallet_msa::DelegationRevoked`<br />RPC: `pallet_msa.check_delegations()` |
| <a id="control-key-addition">Control Key Addition Record</a> | Event: `pallet_msa::PublicKeyAdded`<br />State: `pallet_msa.publicKeyToMsaId` |
| <a id="control-key-removal">Control Key Removal Record</a> | Event: `pallet_msa::PublicKeyDeleted`<br />State: `pallet_msa.publicKeyToMsaId` |
| <a id="announcement-published">Announcement Published Record</a> | Event: `pallet_messages::MessagesStored`<br />RPC: `pallet_messages.get_messages_by_schema_id()` |
| <a id="batch-published">Batch Published Record</a> | Event: `pallet_messages::MessagesStored`<br />RPC: `pallet_messages.get_messages_by_schema_id()` |
| <a id="failure">Failure Record</a> | Transaction hash will not appear in block |
