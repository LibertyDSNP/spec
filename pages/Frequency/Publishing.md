# Announcement Publishing

On Frequency, [Announcements](../DSNP/Announcements.md) are mapped to schemas which in turn publish Frequency Messages.
Frequency Messages are either direct Graph Changes from a particular user, or a Batch Publication with a multitude of users possible.

<!-- Links to https://libertydsnp.github.io/frequency should be updated with links to docs.frequency.xyz when able to be -->

| Announcement Type Enum | Announcement | Batched | Schema Id Mainnet | Schema Id Rococo | Frequency Model Type | Frequency Payload Location |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | [Tombstone](../DSNP/Types/Tombstone.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 1 | [Graph Change](../DSNP/Types/GraphChange.md) | no | TBD | TBD | [`AvroBinary`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.AvroBinary) | [`OnChain`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.OnChain) |
| 2 | [Broadcast](../DSNP/Types/Broadcast.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 3 | [Reply](../DSNP/Types/Reply.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 4 | [Reaction](../DSNP/Types/Reaction.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 5 | [Profile](../DSNP/Types/Profile.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |
| 6 | [Update](../DSNP/Types/Update.md) | YES | TBD | TBD | [`Parquet`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.ModelType.html#variant.Parquet) | [`IPFS`](https://libertydsnp.github.io/frequency/common_primitives/schema/enum.PayloadLocation.html#variant.IPFS) |

Source code for each schema is also located in the [LibertyDSNP/schemas](https://github.com/LibertyDSNP/schemas) repository.

## DSNP Non-Batched Announcements

Frequency uses an on-chain data structure for storage of `GraphChange` Announcements.
Each individual announcement is submitted using the [`add_onchain_message`](https://libertydsnp.github.io/frequency/pallet_messages/pallet/enum.Call.html#variant.add_onchain_message) extrinsic.

## DSNP Batched Announcements

Frequency uses [DSNP Batch Publications](../DSNP/BatchPublications.md) for Announcements that are batched.
The parquet file is stored on [IPFS](https://ipfs.io/), but it is discovered through the Frequency Message.

Frequency Messages maintain the metadata of where and when the Batch Publication was published and which Provider MSA published it.
It is the publisher's responsibility to maintain the [IPFS pin](https://docs.ipfs.tech/concepts/glossary/#pinning) so that the batch file is continuously available.

DSNP Batch Publications [MUST be validated](./Validation.md) upon fetching to ensure data and permission integrity.

## Ordering

Frequency Messages are well ordered within a Schema

1. Frequency: Block number ascending
2. Frequency: Block index ascending
3. DSNP Standard: Order Announcements in a Batch Publication File by row appearance order

### Ordering Across Schemas

Frequency provides complete ordering metadata for Messages across Schemas.
Block index is unique per Message within the same block.

### Human Order

Due to the asynchronous nature of networks and batching, it is possible that the canonical ordering of Announcements is wrong from a human viewpoint.
With dependent Announcements, where one Announcement refers to another Announcement, the order may be inferred differently than the canonical ordering.
It is left to user interfaces to handle these situations.


## Retrieval

Frequency nodes provide an RPC interface [`get_messages_by_schema`](https://libertydsnp.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) with paginated responses that differ based on the Schema.

Frequency nodes can provide a websocket interface that will emit an event for each block that has one or more messages of a given schema in that block.
The [`MessagesStored`](https://libertydsnp.github.io/frequency/pallet_messages/pallet/enum.Event.html#variant.MessagesStored) event can be used to know when to call the RPC interface to retrieve the messages.

See the [Frequency Documentation](https://libertydsnp.github.io/frequency/pallet_messages_rpc/trait.MessagesApiClient.html#method.get_messages_by_schema) for more details on Message retrieval.
