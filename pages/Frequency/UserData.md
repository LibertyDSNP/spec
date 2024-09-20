# Frequency User Data

On Frequency, User Data is mapped to Schemas which use [Stateful Storage](https://frequency-chain.github.io/frequency/pallet_stateful_storage/index.html) for storage and retrieval of the data.

## User Data Sets

<!-- Update ./Overview.md if a Schema Id is updated -->

| User Data Set | Deployed Schema Ids | Frequency Model Type | Frequency Payload Location | Settings |
| --- | --- | --- | --- | --- |
| [Public Key (Key Agreement)](../DSNP/Types/PublicKeyUserData.md) | Mainnet: 7<br />Testnet (Paseo): 7 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) | [Append Only](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.AppendOnly), [Signature Required](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.SignatureRequired) |
| [Public Follows](../DSNP/Graph.md#public-follows) | Mainnet: 8<br />Testnet (Paseo): 8 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |
| [Private Follows](../DSNP/Graph.md#private-follows) | Mainnet: 9<br />Testnet (Paseo): 9 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |
| [Private Connections](../DSNP/Graph.md#private-connections) | Mainnet: 10<br />Testnet (Paseo): 10 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Paginated`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Paginated) | None |
| [Public Key (Assertion Method)](../DSNP/Types/PublicKeyUserData.md) | Mainnet: 14 <br />Testnet (Paseo): 14 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) | [Signature Required](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.SchemaSetting.html#variant.SignatureRequired) |
| [Profile Resources](../DSNP/Types/ProfileResource.md) | Mainnet: 15 <br />Testnet (Paseo): 15 | [`AvroBinary`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) | None |

Private Connection [Pseudonymous Relationship Identifiers](./../DSNP/Graph.md#pseudonymous-relationship-identifiers) (PRIds) are stored alongside Private Connections in the same Stateful Storage page.

For historical reasons, bytes for the Public Key (Key Agreement) schema are serialized to the corresponding Avro `bytes` field without the leading multicodec identifier.
Readers should prepend or assume leading `0xec 0x01` bytes (indicating the `x25519-pub` multicodec).
Writers should omit these leading bytes when inserting new items.

Source code for each schema is located in the [LibertyDSNP/schemas](https://github.com/LibertyDSNP/schemas) repository.

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
