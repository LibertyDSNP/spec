# Announcement Publishing

On Frequency, [Announcements](../DSNP/Announcements.md) are mapped to Schemas which in turn publish Frequency Messages.
Frequency Messages are either individual Announcements from a particular user, or a Batch Publication with a multitude of possible users.

<!-- Links to https://frequency-chain.github.io/frequency should be updated with links to docs.frequency.xyz when able to be -->

<!-- Update ./Overview.md if a Schema Id is updated -->

| Enum | Announcement | Type | Deployed Schema Id | Frequency Model Type | Frequency Payload Location |
| :--: | --- | --- | --- | --- | --- |
| 0 | [Tombstone](../DSNP/Types/Tombstone.md) | Batched | Mainnet: 16<br />Testnet (Paseo): 16 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 2 | [Broadcast](../DSNP/Types/Broadcast.md) | Batched | Mainnet: 17<br />Testnet (Paseo): 17 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 3 | [Reply](../DSNP/Types/Reply.md) | Batched | Mainnet: 18<br />Testnet (Paseo): 18 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 4 | [Reaction](../DSNP/Types/Reaction.md) | Batched | Mainnet: 4<br />Testnet (Paseo): 4 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 6 | [Update](../DSNP/Types/Update.md) | Batched | Mainnet: 19<br />Testnet (Paseo): 19 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 8 | [User Attribute Set](../DSNP/Types/UserAttributeSet.md) | Batched | Mainnet: 11 <br />Testnet (Paseo): 11 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 9 | [DSNP Content Attribute Set](../DSNP/Types/DSNPContentAttributeSet.md) | Batched | Mainnet: 12 <br />Testnet (Paseo): 12 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 10 | [External Content Attribute Set](../DSNP/Types/ExternalContentAttributeSet.md) | Batched | Mainnet: 13 <br />Testnet (Paseo): 13 | [`Parquet`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://frequency-chain.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |

Source code for each schema is located in the [LibertyDSNP/schemas](https://github.com/LibertyDSNP/schemas) repository.

## Batch Publications

Frequency uses [DSNP Batch Publications](../DSNP/BatchPublications.md) for some types of Announcements.
Parquet files are stored on [IPFS](https://ipfs.io/), but are discovered through Frequency Messages.

DSNP Batch Publications [MUST be validated](./Validation.md) upon fetching to ensure data and permission integrity.

## Announcement Validation

DSNP Announcements are validated differently depending on the type of Announcement.
Non-batched Announcements are on chain, are validated at write time, and do not need to be re-validated at read time.
Batched Announcements are off chain and MUST be validated at read time (See: [Validation](./Validation.md)).

## Ordering Announcements

Frequency Messages are well ordered:

1. Frequency: Block number ascending
2. Frequency: Block index ascending (unique)
3. DSNP Standard: Order Announcements in a Batch Publication File by row appearance order.

### Human Order

Due to the asynchronous nature of networks and batching, it is possible that the canonical ordering of Announcements is wrong from a human viewpoint.
With dependent Announcements, where one Announcement refers to another Announcement, the order may be inferred differently than the canonical ordering.
It is left to user interfaces to handle these situations.

## Retrieval

Frequency nodes provide an RPC interface [`messages.getBySchemaId()`](https://frequency-chain.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) with paginated responses that differ based on the Schema.

Frequency nodes can provide a websocket interface that will emit an event for each block that has one or more messages of a given schema in that block.
The [`messages::MessagesStored`](https://frequency-chain.github.io/frequency/pallet_messages/pallet/enum.Event.html#variant.MessagesStored) event can be used to know when to call the RPC interface to retrieve the messages.

See the [Frequency Documentation](https://frequency-chain.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) for more details on Message retrieval.
