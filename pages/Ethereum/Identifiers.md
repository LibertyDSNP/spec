# Identifiers

The [identity registry](/Ethereum/Registry.md) is the source of building and maintaining a unique DSNP User Id.

## Creating and Retrieving a DSNP User Id

1. Create an entry in the [Identity Registry](/Ethereum/Registry.md) contract.
1. Use the `DSNPRegistryUpdate` log event or the `resolveRegistration` function to retrieve the uint64 `id`
1. That `id` value is the DSNP User Id and can be used to generate the [DSNP User URI](/DSNP/Identifiers.md#dsnp-user-uri).
