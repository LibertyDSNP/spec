# Frequency Identity

## Identity
- **Name**: Message Source Account or MSA
- **Docs**: [`MSA Pallet`](https://frequency-chain.github.io/frequency/pallet_msa/index.html)
- **Representation**:
The following data that constitute a Message Source Account are stored in the MSA pallet:
  * The DSNP User Id associated with this MSA
  * Delegation relationships to Providers
  * Schema permissions granted to Providers
  * MSA user state (Profile, Graph, etc...)
  * [Control keys](#control-keys)

## DSNP User Identifier
- **Name**: Message Source Account Identifier, or MSA Id.
- **Data Type**: `uint64`
- **Docs**: [`MessageSourceId`](https://frequency-chain.github.io/frequency/common_primitives/msa/type.MessageSourceId.html)
- **Mapping**: The MSA Id is able to be used directly as the DSNP User Id
- **Description**:
At least one public key MUST be associated with an MSA Id for it to be considered active.

## Control Keys
- **Name**: Referred to as: `public_key`, `provider_key`, or `delegator_key`
- **Data Type**: `AccountId`, Schnorrkel/Ristretto X25519 ("sr25519") derived cryptographic public key
- **Docs**: [`AccountId`](https://frequency-chain.github.io/frequency/common_primitives/node/type.AccountId.html)
- **Description**: See [Cryptography on Polkadot](https://wiki.polkadot.network/docs/learn-cryptography) and [Polkadot Protocol Specification](https://spec.polkadot.network/#defn-account-key).
A public key CANNOT be associated with more than one MSA at a time.

## Delegation
- **Name**: `delegation`
- **Docs**: [`Delegation`](https://frequency-chain.github.io/frequency/pallet_msa/types/struct.Delegation.html)
- **Representation**:
  The following data storage relates necessary information for retrieving and validating delegations:
    * Provider registry
    * Delegations
    * Schema permissions granted to Providers

### User
- **Name**: Delegator
- **Representation**: MSA Id

### Delegate
- **Name**: Provider
- **Representation**: MSA Id
- **Description**:
A Provider MUST already have an MSA Id (via `msa::create()`) and be approved as a Provider (via `msa::propose_to_be_provider()`).

## Related Operations
* [Create Identifier](Operations.md#create-identifier)
* [Retire Identifier](Operations.md#retire-identifier)
* [Define Delegation](Operations.md#define-delegation)
* [Revoke Delegation](Operations.md#revoke-delegation)
* [Add Control Key](Operations.md#add-control-key)
* [Remove Control Key](Operations.md#remove-control-key)

