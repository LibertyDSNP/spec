# Identity

## Purpose

1. Specify how DSNP Identifiers map to Frequency.
1. Specify how the DSNP delegation maps to Frequency.
1. Detail how Frequency matches the ownership requirements of DSNP.

## Details

DSNP uses [Message Source Accounts (MSAs)](https://libertydsnp.github.io/frequency/pallet_msa/index.html) that map directly to a DSNP Identity.

## Identifier

MSAs each receive a unique unsigned 64 bit identifier that is used as the DSNP Id.
These MSAs are pseudo-anonymous identifiers that are associated with one or more public keys.
MSAs can be created by the user or on behalf of the user using a signed authorization.

### Creating a DSNP User Id

1. Generate a [compatible key pair](https://wiki.polkadot.network/docs/learn-keys) in your wallet.
1. Create a Message Source Account (MSA) on Frequency using one of the `create` extrinsics.
1. Wait for the transaction to process.

### Retrieving a DSNP User Id from a Public Key

1. Use the Frequency RPC call `msa_getMsaId` to retrieve the MSA Id from the public key generated in step 1.
1. The MSA Id is the DSNP Id and can be used to generate the [DSNP User URI](../DSNP/Identifiers.md#dsnp-user-uri).

## Ownership

Frequency has a strong ownership model for MSAs.
Ownership of an MSA is controlled by the associated keys.
MSAs are the source for [Messages](https://libertydsnp.github.io/frequency/pallet_messages/index.html) either directly or via delegation.

## Delegation

Frequency allows for delegation to others called [Providers](https://libertydsnp.github.io/frequency/pallet_msa/index.html).
Delegation comes with permissions that grant publishing of specific Schemas to a provider.
Since each [Announcement Type](../DSNP/Announcements.md) has a [set Schema Id](./Publishing.md), a user may permission specific Announcement Types.

When a user delegates to a Provider, that delegation is either validated on-chain or can be validated off-chain using the `msa_checkDelegations` RPC call.
Users can revoke a delegation at anytime without any fees, and revocation is locked to the point the transaction is included in a block.
