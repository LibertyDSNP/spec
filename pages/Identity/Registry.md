---
name: Registry
route: /Identity/Registry
menu: Identity
---

# Identity Registry

A single contract is required for uniqueness of handles across the DSNP.
Additionally the registry allows for shorter ids in a graph
and allows switching identity contracts while maintaining all graph connections, public and private.       

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose
1. Describes how an Identity Registry resolves a name or number to an identity contract address

## Assumptions

* Handles will need to be moved from Betanet to Mainnet 

## Discovery

Contract addresses are not easy to remember and while some networks have had success with just numbers,
it is most common to think of text based handles for finding other people on a network.

## Graph Connections

Ethereum contract addresses are currently 160 bit values which is much larger than needed for unique identification.
Graph connections can be reduced to just 64 bit identifiers.

## EIP 721

This needs to be evaluated and discussed for inclusion/exclusion.

While the NFT standard is not necessary to support, it provides standard ownership transfer and management tools.

## Rejected Alternatives

* Why not the Ethereum Name Service ([ENS](https://ens.domains/))?
  * Overly complex and expensive for the simple use case of handles
  * Support can be added later through a custom ENS resolver
  * Didn't provide a numerical id for efficient graph storage


## Discussion Points

* Should the interface support reverse resolutions? (id -> handle, address -> id/handle)
* Should we still match the ENS Resolver spec [EIP 137](https://eips.ethereum.org/EIPS/eip-137#resolver-specification)?
* Should we name this registry or resolver or split?
* Do we need the uint64 id or should we just use the handle?
* Are we going to hash the handle (ENS style) and should that happen on the client side?

## Contract Interface

```solidity
/**
 * @dev DSNP Registry Interface
 */
interface IRegistry {
    
    /**
     * @dev Log when a new handle is registered
     * @param addr The address the handle is pointing at
     * @param id The numerical id for use with the graph
     * @param handle The actual UTF-8 string used for the handle 
     */
    event DSNPHandle(address addr, uint64 id, string handle);

    /**
     * @dev Log when a the handle address is changed
     * @param addr The new address the handle is pointing at
     * @param id The numerical id for reference 
     */
    event DSNPHandleChange(address addr, uint64 id);

    /**
     * @dev Resolve a handle to a contract address
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolve(string handle) view external returns (address);

    /**
     * @dev Resolve a handle to a contract address
     * @param id The id to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolveById(uint64 id) view external returns (address);

    /**
     * @dev Resolve a handle to the id
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns The uint64 id for the handle
     */
    function resolveToId(string handle) view external returns (uint64);

    /**
     * @dev Register a new handle
     * @param addr Address for the handle to point at
     * @param handle The handle for the address
     * 
     * MUST be called by someone who is authorized on the contract via `EIP 1271(addr).isValidSignature`
     * MUST emit DSNPHandle
     */
    function register(address addr, string handle) external;

    /**
     * @dev Register a new handle By EIP-712 Signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param addr Address for the handle to point at
     * @param handle The handle for the address
     * 
     * MUST be signed by someone who is authorized on the contract via `EIP 1271(addr).isValidSignature`
     * MUST emit DSNPHandle
     */
    function registerBySignature(bytes32 r, bytes32 s, uint32 v, address addr, string handle) external;

    /**
     * @dev Alter a handle resolution
     * @param newAddr New address for the handle to point at
     * @param handle The handle to alter
     * 
     * MUST be called by someone who is authorized on the contract via `EIP 1271(oldAddr).isValidSignature`
     * MUST emit DSNPHandleOwnershipChange
     */
    function setAddr(address newAddr, string handle) external;

    /**
     * @dev Register a new handle By EIP-712 Signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param addr Address for the handle to point at
     * @param handle The handle for the address
     * 
     * MUST be signed by someone who is authorized on the contract via `EIP 1271(addr).isValidSignature`
     * MUST emit DSNPHandle
     */
    function registerBySignature(bytes32 r, bytes32 s, uint32 v, address addr, string handle) external;
}
```
