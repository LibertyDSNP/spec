# Stateful Data

On Frequency, User Data and select Announcements are mapped to Schemas which use [Stateful Storage](https://libertydsnp.github.io/frequency/pallet_stateful_storage/index.html) for storage and retrieval of the data.

## User Data Sets

| User Data Set | Schema Id Mainnet | Schema Id Rococo | Frequency Model Type | Frequency Payload Location |
| --- | --- | --- | --- | --- |
| [Public Follows](../DSNP/Graph.md#public-follows) | TBD | TBD | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) |
| [Private Follows](../DSNP/Graph.md#private-follows) | TBD | TBD | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) |
| [Private Connections](../DSNP/Graph.md#private-connections) | TBD | TBD | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) |

Source code for each schema is located in the [LibertyDSNP/schemas](https://github.com/LibertyDSNP/schemas) repository.

## Announcements

| Announcement | Schema Id Mainnet | Schema Id Rococo | Frequency Model Type | Frequency Payload Location | Settings |
| --- | --- | --- | --- | --- | --- |
| [Public Key](../DSNP/Types/PublicKey.md) | TBD | 7 (_v1.3.0+_) | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) | [Append Only](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.AppendOnly), [Signature Required](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.SignatureRequired) |


## Get User Data Operation Mapping

Stateful data is retrieved via state queries (`pallet.stateQuery`) or RPC calls (`pallet.rpcCall()`).

| Model Type | Query/Call |
| --- | --- |
| Itemized | [`stateful_storage.getItemizedStorage()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiClient.html#method.get_itemized_storage) |
| Paginated | [`stateful_storage.getPaginatedStorage()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage_rpc/trait.StatefulStorageApiClient.html#method.get_paginated_storage) |

## Replace User Data Operation Mapping

Write operations are via Transactions (also called Extrinsics): `pallet::extrinsic()`

| Model Type | Operation | Pallet::Extrinsic |
| --- | --- | --- |
| Itemized | Insert, Update, Delete | [`stateful_storage::apply_item_actions()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.apply_item_actions)<br/>[`stateful_storage::apply_item_actions_with_signature()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.apply_item_actions_with_signature) |
| Paginated | Insert, Update | [`stateful_storage::upsert_page()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.upsert_page)<br/>[`stateful_storage::upsert_page_with_signature()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.upsert_page_with_signature) |
| Paginated | Delete | [`stateful_storage::delete_page()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.delete_page)<br/>[`stateful_storage::delete_page_with_signature()`](https://libertydsnp.github.io/frequency/pallet_stateful_storage/pallet/enum.Call.html#variant.delete_page_with_signature) |


### Entity Tags

Frequency requires the hash of current state for any Stateful Storage change.
