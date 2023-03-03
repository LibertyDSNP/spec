# State Change Records

State Change Records constitute the observable output of a DSNP system.
Frequency uses a combination of on chain data to store and Events to notify for Records.

## Frequency Transaction Identifier

Frequency uses the hash of the [Operation](Operations.md) transaction to then request a node report the transaction status and any Events related to that hash.
(Client libraries usually have this built in.)

## Frequency Records

Frequency produces three types of data that map or point to DSNP Records.

### Events

Events are generated on each block and may contain a pointer to the Record data instead of the entire Record.

Events are referenced by `pallet::EventName`.

### Messages

Frequency Messages store Announcements or Batch Publication Records.
It uses the [Messages Pallet](https://libertydsnp.github.io/frequency/pallet_messages/).

Messages are retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

### State

Frequency State stores data associated with an [Identity](Identity.md).
It can also be used to look up the state of prior Records related to an Identity.

State data is retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

## Record Mappings

| Record Type | Record Pointer/Location |
| --- | --- |
| <a id="identifier-creation">Identifier Creation Record</a> | Event: `msa::MsaCreated`<br/>State: `msa.publicKeyToMsaId` |
| <a id="identifier-retirement">Identifier Retirement Record</a> | Event: `msa::MsaMsaRetired` |
| <a id="delegation-definition">Delegation Definition Record</a> | Event: `msa::DelegationGranted`, `msa::DelegationUpdated`<br />RPC: `msa.checkDelegations()`, `msa.getGrantedSchemasByMsaId()` |
| <a id="delegation-revocation">Delegation Revocation Record</a> | Event: `msa::DelegationRevoked`<br />RPC: `msa.checkDelegations()` |
| <a id="control-key-addition">Control Key Addition Record</a> | Event: `msa::PublicKeyAdded`<br />State: `msa.publicKeyToMsaId` |
| <a id="control-key-removal">Control Key Removal Record</a> | Event: `msa::PublicKeyDeleted`<br />State: `msa.publicKeyToMsaId` |
| <a id="announcement-published">Announcement Published Record</a> | Event: `messages::MessagesStored`<br />RPC: `messages.getBySchemaId()` |
| <a id="batch-published">Batch Published Record</a> | Event: `messages::MessagesStored`<br />RPC: `messages.getBySchemaId()` |
| <a id="failure">Failure Record</a> | Transaction hash will not appear in block |
