# Identity Registry

A registry allows for distinct user identifiers and human-readable discovery of network members.
The DSNP User Id Registry is a simple contract that allows switching handles, identity contracts, and chain migration while maintaining all graph connections, both public and private.

## Purpose

1. Describes how the Identity Registry resolves a DSNP User Id to an identity contract address.
1. Describes how the Identity Registry allows for handle resolution.
1. Presents the interface for the Identity Registry.
1. Describes rejected alternatives.

## Assumptions

* Ids will need to be moved from Betanet to Mainnet.
* Handles are for display and discovery purposes only.

## Discovery via DSNP Handles

* Contract addresses or numerical ids are not easy to remember.
* Most networks rely on text based handles for discovery of users on a network.
* DSNP handles are an easy way to allow user lookup.

### Handles

* Handles are simple UTF-8 strings.
* No limitations are placed on length or contents, although some clients may not have support for the full unicode set.
* A user MAY NOT register multiple handles that point to the same DSNP User Id.
* Handles must be unique.

### Homograph Attack Mitigation

UTF-8 support for handles opens handle users up to [homograph attacks](https://en.wikipedia.org/wiki/IDN_homograph_attack), not to mention case-sensitivity issues.
Discussion is ongoing both for the DSNP as well as for ICANN domain names and other projects working with internationalization support.

Because the DSNP User Id is stable, attacks would only be successful in cases where the DSNP User Id were unknown.
[Punycode](https://en.wikipedia.org/wiki/Punycode) is used by some software to prevent homographs by encoding all non-Latin characters into Latin characters.
However, this means Punycode does not properly present non-Latin characters and thus fails to reach the level of internationalization support desired by the DSNP.

#### Current Mitigation Strategies

Clients resolving handles MUST implement a method to detect potential homographs, check both user settings, and potentially check the registry for additional potential matching DSNP User Ids.

### EIP 712 Methods, Replay Attacks and Nonces

The Registry supports EIP 712 methods to permit a second party to pay gas costs for address and handle changes.
Once an EIP 712 transaction is made, anyone may replay that action without further authorization.
This breaks DSNP's security guarantees when the registration owner has made additional changes to either address or handle.
To mitigate this, the Registry contract MUST store a nonce for every registration.
When it receives an EIP 712 transaction, it MUST check that the nonce parameter matches the stored nonce, and it MUST increment the stored nonce if the transaction succeeds.

If a handle is changed, the registry MUST preserve the stored nonce for the old handle.

## DSNP User Ids

Ethereum contract addresses are currently 160-bit values which are much larger than needed for unique identification.
Identification can be reduced to 64-bit identifiers with the registry and enable contract changing.

**Remember:** Only DSNP User Ids are safe for long term data connections.

* DSNP Identity contract addresses are not guaranteed long term for upgrade and migration reasons.
* Handles can change.

## Resolutions

Resolutions are possible between any of the three pieces of data: Handle, DSNP User Id, and Contract Address.
While a utility method is provided for ease of moving from handle to the contract address,
the other resolutions require using contract log events.

### Current Handle -> Current DSNP User Id and Contract Address

`IRegistry.resolveRegistration` provides easy access to the current registration for the given handle.

### Current Handle -> Nonce

`IRegistry.resolveHandleToNonce` is the only method for discovery of the next nonce to use.

### Other Lookups & Historical Values

The `DSNPRegistryUpdate` event is provided to resolve DSNP User Ids, handles, and contract addresses.
The DSNP User Id and contract address are indexed in the event, and thus utilize a log search using the event and the search data as topics.

A search by contract address may produce more than one result--meaning that the contract address is currently or previously attached to other DSNP User Ids.
To test for the current value, the query would need to be run again with each of the resulting DSNP User Ids retrieving the most recent `DSNPRegistryUpdate` event.

A search by DSNP User Id will retrieve the history of all handles and contract addresses that have been connected to that DSNP User Id.
The most recent event (the one with the highest block number) will give the current handle and contract address for the given DSNP User Id.

Handles may be reused if a DSNP User Id changes to a new handle.
While time consuming, discovering previous owners of a given handle requires locally filtering all `DSNPRegistryUpdate` events for events with the given handle.

## EIP 721

DSNP support for the NFT standard [EIP 721](https://eips.ethereum.org/EIPS/eip-721) for handles is under consideration.

### NFT Concerns

* The EIP 721 standard has its own ownership and permission system that is too limited for use across the DSNP.
* Supporting two ownership systems adds needless complexity.
* Identity contract ownership would require additional complexity to receive and transfer 721 tokens.

## Rejected Alternatives

* Why not the Ethereum Name Service ([ENS](https://ens.domains/))?
  * Overly complex and expensive for the simple use case of handles.
  * Support can be added later through custom ENS resolution.
  * Doesn't provide a numerical id for efficient graph storage.
  * Still subject to homograph attacks.

## Contract Interface

```solidity
/**
 * @dev DSNP Registry Interface
 * @dev Suggested data storage implementation:
 *   uint64 internal currentIdSequenceMarker = 0x1; // Must not start at 0
 *   mapping(string => [id, address]) internal handleToIdAndAddress;
 */
interface IRegistry {
    struct AddressChange {
        uint32 nonce;
        address addr;
        string handle;
    }

    struct HandleChange {
        uint32 nonce;
        string oldHandle;
        string newHandle;
    }

    /**
     * @dev Log when a resolution address is changed
     * @param id The DSNP User Id
     * @param addr The address the DSNP User Id is pointing at
     * @param handle The actual UTF-8 string used for the handle
     */
    event DSNPRegistryUpdate(uint64 indexed id, address indexed addr, string handle);

    /**
     * @dev Register a new DSNP User Id
     * @param addr Address for the new DSNP User Id to point at
     * @param handle The handle for discovery
     *
     * MUST reject if the handle is already in use
     * MUST emit DSNPRegistryUpdate
     * MUST check that addr implements IDelegation interface
     * @return id for new registration
     */
    function register(address addr, string calldata handle) external returns (uint64);

    /**
     * @dev Alter a DSNP User Id resolution address
     * @param newAddr Original or new address to resolve to
     * @param handle The handle to modify
     *
     * MUST be called by someone who is authorized on the contract
     *      via `IDelegation(oldAddr).isAuthorizedTo(oldAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     * MUST check that newAddr implements IDelegation interface
     */
    function changeAddress(address newAddr, string calldata handle) external;

    /**
     * @dev Alter a DSNP User Id resolution address by EIP-712 Signature
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param change Change data containing nonce, new address and handle
     *
     * MUST be signed by someone who is authorized on the contract
     *      via `IDelegation(oldAddr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST check that newAddr implements IDelegation interface
     * MUST emit DSNPRegistryUpdate
     */
    function changeAddressByEIP712Sig(uint8 v, bytes32 r, bytes32 s, AddressChange calldata change) external;

    /**
     * @dev Alter a DSNP User Id handle
     * @param oldHandle The previous handle for modification
     * @param newHandle The new handle to use for discovery
     *
     * MUST NOT allow a registration of a handle that is already in use
     * MUST be called by someone who is authorized on the contract
     *      via `IDelegation(oldHandle -> addr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     */
    function changeHandle(string calldata oldHandle, string calldata newHandle) external;

    /**
     * @dev Alter a DSNP User Id handle by EIP-712 Signature
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param change Change data containing nonce, old handle and new handle
     *
     * MUST NOT allow a registration of a handle that is already in use
     * MUST be signed by someone who is authorized on the contract
     *      via `IDelegation(handle -> addr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     */
    function changeHandleByEIP712Sig(uint8 v, bytes32 r, bytes32 s, HandleChange calldata change) external;

    /**
     * @dev Resolve a handle to a DSNP User Id and contract address
     * @param handle The handle to resolve
     *
     * Returns zeros if not found
     * @return A tuple of the DSNP User Id and the Address of the contract
     */
    function resolveRegistration(string calldata handle) view external returns (uint64, address);

    /**
     * @dev Resolve a handle to a EIP 712 nonce
     * @param handle The handle to resolve
     *
     * rejects if not found
     * @return expected nonce for next EIP 712 update
     */
    function resolveHandleToNonce(string calldata handle) view external returns (uint32);
}
```
