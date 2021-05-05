---
name: Registry
route: /Identity/Registry
menu: Identity
---

# Identity Registry

A registry allows for distinct user identifiers and human readable discovery of network members.
The DSNP Id Registry is a simple contract that allows switching handles, identity contracts, and chain migration
while maintaining all graph connections, public and private.

## Specification Status

| Version | Status |
---------- | ---------
| 0.3     | Tentative |

## Purpose
1. Describes how the Identity Registry resolves a DSNP Id to an identity contract address
1. Describes how the Identity Registry allows for handle resolution
1. Presents the interface for the Identity Registry
1. Describes rejected alternatives

## Assumptions

* Ids will need to be moved from Betanet to Mainnet
* Handles are for display and discovery purposes only

## Discovery via DSNP Handles

* Contract addresses or numerical ids are not easy to remember.
* Most networks rely on text based handles for discovery of users on a network.
* DSNP handles are an easy way to allow easy user lookup.

### Handles

* Handles are simple UTF-8 strings.
* No limitations are placed on length or contents, although different clients may not have support for the full unicode set.
* A user MAY NOT register multiple handles that point to the same DSNP Id.
* Handles must be unique.

### Homograph Attack Mitigation

UTF-8 support for handles opens handle users up to [homograph attacks](https://en.wikipedia.org/wiki/IDN_homograph_attack), not to mention case-sensitivity issues.
This issue is of ongoing discussion both for the DSNP as well as in for ICANN domain names and other projects working with internationalization support.

Because the DSNP Id is stable, attacks would only be successful in cases where the DSNP Id were unknown.
[Punycode](https://en.wikipedia.org/wiki/Punycode) is used by some software to prevent homographs by encoding all non-Latin characters into Latin characters.
So punycode does not properly present non-Latin characters which isn't reaching the level of internationalization support desired by the DSNP.

#### Current Mitigation Strategies

Clients resolving handles MUST implement a method to detect potential homographs and check both user settings and potentially check the registry for additional potential matching DSNP Ids.

### EIP 712 Methods, Replay Attacks and Nonces

The Registry supports EIP 712 methods to permit a second party to pay gas costs for address and handle changes.
Once an EIP 712 transaction is made, anyone may replay that action without further authorization.
This breaks our security guarantees when the registration owner has made an additional change to either address or handle.
To mitigate this, the Registry contract MUST store a nonce for every registration.
When it receives an EIP 712 transaction, it MUST check that the nonce parameter matches the stored nonce, and it MUST increment the stored nonce if the transaction succeeds.

If a handle is changed, the registry MUST preserve the stored nonce for the old handle.

## DSNP Ids

Ethereum contract addresses are currently 160 bit values which is much larger than needed for unique identification.
Identification can be reduced to just 64 bit identifiers with the registry and enable contract changing.

**Remember:** Only DSNP Ids are safe for long term data connections.

* DSNP Identity contract addresses are not guaranteed long term for upgrade and migration reasons
* Handles can change

## Resolutions

Resolutions are possible between any of the three pieces of data: Handle, DSNP Id, and Contract Address.
While a utility method is provided for ease of moving from handle to the contract address,
the other resolutions require using contract log events.

### Current Handle -> Current Contract Address

The `IRegistry.resolveHandleToAddress` method is the most efficient for discovery of current values.
To retrieve historical values, perform a log search using the `DSNPRegistryUpdate` event.

### Current Handle -> Current DSNP Id

The `IRegistry.resolveHandleToId` method is the most efficient for discovery of current values.
To retrieve historical values, perform a log search using the `DSNPRegistryUpdate` event.

### Current Handle -> Nonce

The `IRegistry.resolveHandleToNonce` method is the only method for discovery of the next nonce to use.

### Other Lookups & Historical Values

The `DSNPRegistryUpdate` event is provided to resolve DSNP Ids, handles, and contract addresses.
The DSNP Id, handle, and contract address are indexed in the event so use a log search using the event and the search data as topics.

A search by handle may produce more than one DSNP Id or contract address, meaning that a handle was previously attached to a different DSNP Id or contract address.
There is no guarantee that the searched handle will be currently attached to any of the DSNP Ids or contract addresses in the result.

A search by contract address may produce more than one result meaning that the contract address is currently or previously attached to other DSNP Ids.
To test for the current value, the query would need to be run again with each of the resulting DSNP Ids retrieving the most recent `DSNPRegistryUpdate` event.

A search by DSNP Id will retrieve the history of all handles and contract addresses that have been connected to that DSNP Id.
The most recent event (the one with the highest block number), will give the current handle and contract address for the given DSNP Id.

## EIP 721

DSNP support for the NFT standard [EIP 721](https://eips.ethereum.org/EIPS/eip-721) for handles is not available for [Betanet](/Networks).
It will be reconsidered for Mainnet.

### NFT Concerns

* The EIP 721 standard has its own ownership and permission system that is too limited for use across the DSNP
* Supporting two ownership systems adds unneeded complexity
* Identity contract ownership would require additional complexity to receive and transfer 721 tokens

## Rejected Alternatives

* Why not the Ethereum Name Service ([ENS](https://ens.domains/))?
  * Overly complex and expensive for the simple use case of handles
  * Support can be added later through a custom ENS resolver
  * Didn't provide a numerical id for efficient graph storage
  * Still subject to homograph attacks

## Contract Interface

```solidity
/**
 * @dev DSNP Registry Interface
 * @dev Suggested data storage implementation:
 *   uint64 internal currentIdSequenceMarker = 0x1; // Must not start at 0
 *   mapping(string => [id, address]) internal handleToIdAndAddress;
 */
interface IRegistry {

    /**
     * @dev Log when a resolution address is changed
     * @param id The DSNP Id 
     * @param addr The address the DSNP Id is pointing at
     * @param handle The actual UTF-8 string used for the handle 
     */
    event DSNPRegistryUpdate(uint64 indexed id, address indexed addr, string indexed handle);

    /**
     * @dev Register a new DSNP Id
     * @param addr Address for the new DSNP Id to point at
     * @param handle The handle for discovery
     * 
     * MUST reject if the handle is already in use
     * MUST emit DSNPRegistryUpdate
     * MUST check that addr implements IDelegation interface
     */
    function register(address addr, string handle) external returns (uint64);

    /**
     * @dev Alter a DSNP Id resolution address
     * @param newAddr Original or new address to resolve to
     * @param handle The handle to modify
     * 
     * MUST be called by someone who is authorized on the contract
     *      via `IDelegation(oldAddr).isAuthorizedTo(oldAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     * MUST check that newAddr implements IDelegation interface
     */
    function changeAddress(address newAddr, string handle) external;

    /**
     * @dev Alter a DSNP Id resolution address by EIP-712 Signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param newAddr New address for the DSNP Id to point at
     * @param handle The handle to modify
     * @param nonce The expected nonce for this update (must match return value of resolveHandleToNonce())
     * 
     * MUST be signed by someone who is authorized on the contract
     *      via `IDelegation(oldAddr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST check that newAddr implements IDelegation interface
     * TODO: FIX THE ISSUE OF newAddr not being a part of the creation
     * MUST emit DSNPRegistryUpdate
     */
    function changeAddressByEIP712Sig(bytes32 r, bytes32 s, uint32 v, address newAddr, string handle, uint32 nonce) external;

    /**
     * @dev Alter a DSNP Id handle
     * @param oldHandle The previous handle for modification
     * @param newHandle The new handle to use for discovery
     * 
     * MUST NOT allow a registration of a handle that is already in use
     * MUST be called by someone who is authorized on the contract
     *      via `IDelegation(oldHandle -> addr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     */
    function changeHandle(string oldHandle, string newHandle) external;

    /**
     * @dev Alter a DSNP Id handle by EIP-712 Signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param oldHandle The previous handle for modification
     * @param newHandle The new handle to use for discovery
     * @param nonce The expected nonce for this update (must match return value of resolveHandleToNonce())
     * 
     * MUST NOT allow a registration of a handle that is already in use
     * MUST be signed by someone who is authorized on the contract
     *      via `IDelegation(handle -> addr).isAuthorizedTo(ecrecovedAddr, Permission.OWNERSHIP_TRANSFER, block.number)`
     * MUST emit DSNPRegistryUpdate
     */
    function changeHandleByEIP712Sig(bytes32 r, bytes32 s, uint32 v, string oldHandle, string newHandle, uint32 nonce) external;

    /**
     * @dev Resolve a handle to a contract address
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolveHandleToAddress(string handle) view external returns (address);

    /**
     * @dev Resolve a handle to a DSNP Id
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns DSNP Id
     */
    function resolveHandleToId(string handle) view external returns (uint64);

    /**
     * @dev Resolve a handle to a EIP 712 nonce
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns expected nonce for next EIP 712 update
     */
    function resolveHandleToNonce(string handle) view external returns (uint32);
}
```
