# Announcement Publishing

On Frequency, [Announcements](../DSNP/Announcements.md) are mapped to Schemas which in turn publish Frequency Messages or Stateful Storage changes.
Frequency Messages are either individual Announcements from a particular user, or a Batch Publication with a multitude of possible users.
Frequency Stateful Storage is either direct Announcements from a particular user or [User Data](./UserData.md) changes.

<!-- Links to https://libertydsnp.github.io/frequency should be updated with links to docs.frequency.xyz when able to be -->

<!-- Update ./Overview.md if a Schema Id is updated -->

| Enum | Announcement | Type | Deployed Schema Id | Frequency Model Type | Frequency Payload Location |
| :--: | --- | --- | --- | --- | --- |
| 0 | [Tombstone](../DSNP/Types/Tombstone.md) | Batched | Mainnet: 1<br />Testnet (Paseo): 1<br />Testnet (Rococo): 1 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 2 | [Broadcast](../DSNP/Types/Broadcast.md) | Batched | Mainnet: 2<br />Testnet (Paseo): 2<br />Testnet (Rococo): 2 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 3 | [Reply](../DSNP/Types/Reply.md) | Batched | Mainnet: 3<br />Testnet (Paseo): 3<br />Testnet (Rococo): 3 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 4 | [Reaction](../DSNP/Types/Reaction.md) | Batched | Mainnet: 4<br />Testnet (Paseo): 4<br />Testnet (Rococo): 4 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 5 | [Profile](../DSNP/Types/Profile.md) | Batched | Mainnet: 6<br />Testnet (Paseo): 6<br />Testnet (Rococo): 5 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 6 | [Update](../DSNP/Types/Update.md) | Batched | Mainnet: 5<br />Testnet (Paseo): 5<br />Testnet (Rococo): 6 | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 7 | [Public Key](../DSNP/Types/PublicKey.md) | [Stateful](./UserData.md#announcements) | Mainnet: 7<br />Testnet (Paseo): 7<br />Testnet (Rococo): 18 | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`Itemized`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.Itemized) |

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

Frequency nodes provide an RPC interface [`messages.getBySchemaId()`](https://libertydsnp.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) with paginated responses that differ based on the Schema.

Frequency nodes can provide a websocket interface that will emit an event for each block that has one or more messages of a given schema in that block.
The [`messages::MessagesStored`](https://libertydsnp.github.io/frequency/pallet_messages/pallet/enum.Event.html#variant.MessagesStored) event can be used to know when to call the RPC interface to retrieve the messages.

See the [Frequency Documentation](https://libertydsnp.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) for more details on Message retrieval.
