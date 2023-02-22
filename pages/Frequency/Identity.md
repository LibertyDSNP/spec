# Frequency Identity

## Identity
- **Name**:  Message Source Account or MSA
- **Representation**:
The following data that constitute a Message Source Account are stored in the MSA pallet:
  * The DSNP Id associated with this MSA
  * Delegation relationships to Providers 
  * Schema permissions granted to Providers
  * MSA user state (Profile, Graph)
  * [Control keys](#control-keys)

## Identifiers
- **Name**:  Message Source Account Identifier, or MSA Id. 
- **Data Type**: `uint64` 
- **Description**:
At least one public key MUST be associated with an MSA Id.

## Control Keys
- **Name**: `public_key`
- **Data Type**:  `AccountId`, Schnorrkel/Ristretto x25519 ("sr25519") derived cryptographic public key
- **Description**: See [Cryptography on Polkadot](https://wiki.polkadot.network/docs/learn-cryptography). 
A public key MUST NOT be associated with more than one MSA at a time.

## Delegation
- **Name**: `delegation`
- **Representation**:
  The following data storage relates necessary information for retrieving and validating delegations:
    * Provider registry (msa pallet)
    * Delegations (msa pallet)
    * Schema permissions granted to Providers

### User
- **Name**: Delegator
- **Representation**: MSA Id

### Delegate
- **Name**: Provider
- **Representation**: MSA Id
- **Description**:
A Provider MUST already have an MSA Id (via `pallet_msa::create`) and be approved as a Provider (via `pallet_msa::propose_to_be_provider`).

## Related Operations
* [Create Identifier](Operations.md#create-identifier)
* [Retire Identifier](Operations.md#retire-identifier)
* [Define Delegation](Operations.md#define-delegation)
* [Revoke Delegation](Operations.md#revoke-delegation)
* [Add Control Key](Operations.md#add-control-key)
* [Remove Control Key](Operations.md#remove-control-key)

