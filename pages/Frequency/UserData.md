# Frequency User Data

On Frequency, User Data and select Announcements are mapped to Schemas which use [Stateful Storage](https://frequency-chain.github.io/frequency/pallet_stateful_storage/index.html) for storage and retrieval of the data.

## User Data Sets

<!-- Update ./Overview.md if a Schema Id is updated -->

| User Data Set | Deployed Schema Ids | Frequency Model Type | Frequency Payload Location | Settings |
| --- | --- | --- | --- | --- |
| [Public Follows](../DSNP/Graph.md#public-follows) | Mainnet: 8<br />Testnet (Paseo): 8<br />Testnet (Rococo): 13 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |
| [Private Follows](../DSNP/Graph.md#private-follows) | Mainnet: 9<br />Testnet (Paseo): 9<br />Testnet (Rococo): 14 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |
| [Private Connections](../DSNP/Graph.md#private-connections) | Mainnet: 10<br />Testnet (Paseo): 10<br />Testnet (Rococo): 15 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |

[Pseudonymous Relationship Identifiers](./../DSNP/Graph.md#pseudonymous-relationship-identifiers) (PRIds) are stored along side Private Connections in the same Stateful Storage page.

Source code for each schema is located in the [LibertyDSNP/schemas](https://github.com/LibertyDSNP/schemas) repository.

## Announcements

| Announcement | Deployed Schema Ids | Frequency Model Type | Frequency Payload Location | Settings |
| --- | --- | --- | --- | --- |
| [Public Key](../DSNP/Types/PublicKey.md) | Mainnet: 7<br />Testnet (Paseo): 7<br />Testnet (Rococo): 7 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) | [Append Only](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.AppendOnly), [Signature Required](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.SignatureRequired) |

## Read Operation Mapping

Stateful data is retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

| Model Type | DSNP Properties | Query/Call |
| --- | --- | --- |
| Itemized | Entity Tag | [`stateful_storage.getItemizedStorage()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiClient.html#method.get_itemized_storage) |
| Paginated | Entity Tag, Chunked | [`stateful_storage.getPaginatedStorage()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiClient.html#method.get_paginated_storage) |

## Write Operation Mapping

Write operations are via Transactions (also called Extrinsics): `pallet::extrinsic()`

| Model Type | Operation | Pallet::Extrinsic |
| --- | --- | --- |
| Itemized | Insert, Update, Delete | [`stateful_storage::apply_item_actions()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.apply_item_actions)<br/>[`stateful_storage::apply_item_actions_with_signature()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.apply_item_actions_with_signature) |
| Paginated | Insert, Update | [`stateful_storage::upsert_page()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.upsert_page)<br/>[`stateful_storage::upsert_page_with_signature()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.upsert_page_with_signature) |
| Paginated | Delete | [`stateful_storage::delete_page()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.delete_page)<br/>[`stateful_storage::delete_page_with_signature()`](https://frequency-chain.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.delete_page_with_signature) |


### Entity Tags

Frequency requires the hash of current state for any Stateful Storage change.
