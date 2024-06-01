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
It uses the [Messages Pallet](https://frequency-chain.github.io/frequency/pallet_messages/).

Messages are retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

### State

Frequency State stores data associated with an [Identity](Identity.md).
It can also be used to look up the state of prior Records related to an Identity.

State data is retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

## Record Mappings

| Record Type | Record Pointer/Location |
| --- | --- |
| <a id="identifier-creation">Identifier Creation Record</a> | Event: [`msa::MsaCreated`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.MsaCreated)<br/>State: [`msa.publicKeyToMsaId`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/type.PublicKeyToMsaId.html) |
| <a id="identifier-retirement">Identifier Retirement Record</a> | Event: [`msa::MsaRetired`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.MsaRetired) |
| <a id="delegation-definition">Delegation Definition Record</a> | Event: [`msa::DelegationGranted`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.DelegationGranted), [`msa::DelegationUpdated`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.DelegationUpdated)<br />RPC: [`msa.checkDelegations()`](https://frequency-chain.github.io/frequency/pallet_msa_rpc/trait.MsaApiClient.html#method.check_delegations), [`msa.getGrantedSchemasByMsaId()`](https://frequency-chain.github.io/frequency/pallet_msa_rpc/trait.MsaApiServer.html#tymethod.get_granted_schemas_by_msa_id) |
| <a id="delegation-revocation">Delegation Revocation Record</a> | Event: [`msa::DelegationRevoked`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.DelegationRevoked)<br />RPC: [`msa.checkDelegations()`](https://frequency-chain.github.io/frequency/pallet_msa_rpc/trait.MsaApiClient.html#method.check_delegations) |
| <a id="control-key-addition">Control Key Addition Record</a> | Event: [`msa::PublicKeyAdded`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.PublicKeyAdded)<br />State: [`msa.publicKeyToMsaId`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/type.PublicKeyToMsaId.html) |
| <a id="control-key-removal">Control Key Removal Record</a> | Event: [`msa::PublicKeyDeleted`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/enum.Event.html#variant.PublicKeyDeleted)<br />State: [`msa.publicKeyToMsaId`](https://frequency-chain.github.io/frequency/pallet_msa/pallet/type.PublicKeyToMsaId.html) |
| <a id="announcement-published">Announcement Published Record</a> | Event: [`messages::MessagesStored`](https://frequency-chain.github.io/frequency/pallet_messages/pallet/enum.Event.html#variant.MessagesStored)<br />RPC: [`messages.getBySchemaId()`](https://frequency-chain.github.io/frequency/pallet_messages_rpc/trait.MessagesApiServer.html#tymethod.get_messages_by_schema_id) |
| <a id="batch-published">Batch Published Record</a> | Event: [`messages::MessagesStored`](https://frequency-chain.github.io/frequency/pallet_messages/pallet/enum.Event.html#variant.MessagesStored)<br />RPC: [`messages.getBySchemaId()`](https://frequency-chain.github.io/frequency/pallet_messages_rpc/trait.MessagesApiServer.html#tymethod.get_messages_by_schema_id) |
| <a id="failure">Failure Record</a> | See section on [Failure Handling](./Operations.md#failure-handling) |
| <a id="user-data-replaced">User Data Replaced Record</a> | Event: [`stateful_storage::ItemizedPageUpdated`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Event.html#variant.ItemizedPageUpdated), [`stateful_storage::ItemizedPageDeleted`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Event.html#variant.ItemizedPageDeleted), [`stateful_storage::PaginatedPageUpdated`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Event.html#variant.PaginatedPageUpdated), [`stateful_storage::PaginatedPageDeleted`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Event.html#variant.PaginatedPageDeleted)<br />RPC: [`statefulStorage.getPaginatedStorage()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiServer.html#tymethod.get_paginated_storage), [`statefulStorage.getItemizedStorage()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiServer.html#tymethod.get_itemized_storage)<br />See Also: [Read User Data](./UserData.md#read-operation-mapping) |
