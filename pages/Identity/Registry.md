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

## Graph Connection Ids

Ethereum contract addresses are currently 160 bit values which is much larger than needed for unique identification.
Graph connections can be reduced to just 64 bit identifiers.

## EIP 721

While the NFT standard is not necessary to support, it provides standard ownership transfer and management tools.

## Rejected Alternatives

* Why not the Ethereum Name Service ([ENS](https://ens.domains/))?
  * Overly complex and expensive for the simple use case of handles
  * Support can be added later through a custom ENS resolver
  * Didn't provide a numerical id for efficient graph storage


## Discussion Points

* Should the interface support reverse resolutions? (id -> handle, address -> id/handle)
  * YES
* Should we still match the ENS Resolver spec [EIP 137](https://eips.ethereum.org/EIPS/eip-137#resolver-specification)?
  * NO, stay away so that the future can implement it if wanted
* Should we name this registry or resolver or split?
  * NO 
* Do we need the uint64 id or should we just use the handle?
  * YES
* Are we going to hash the handle (ENS style) client side?
  * NO, we will store the strings
* Can more than one handle point to the same social identity?
  * NO
* Are we case sensitive / normalizing?
  * Strings are UTF-8
  * Add a new story to investigate and a note that it is an open question

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
    function registerByEIP712Sig(bytes32 r, bytes32 s, uint32 v, address addr, string handle) external;

    /**
     * @dev Alter a handle resolution
     * @param newAddr New address for the handle to point at
     * @param handle The handle to alter
     * 
     * MUST be called by someone who is authorized on the contract via `EIP 1271(oldAddr).isValidSignature`
     * TODO: FIX THE ISSUE OF newAddr not being a part of the creation
     * MUST emit DSNPHandleOwnershipChange
     */
    function setAddr(address newAddr, string handle) external;

    /**
     * @dev Register a new handle By EIP-712 Signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param newAddr New address for the handle to point at
     * @param handle The handle to alter
     * 
     * MUST be signed by someone who is authorized on the contract via `EIP 1271(oldAddr).isValidSignature`
     * MUST emit DSNPHandle
     */
    function setAddrSignature(bytes32 r, bytes32 s, uint32 v, address newAddr, string handle) external;

    /**
     * @dev Resolve a handle to a contract address
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolveHandleToAddress(string handle) view external returns (address);


    /**
     * @dev Resolve a handle to the id
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns The uint64 id for the handle
     */
    function resolveHandleToId(string handle) view external returns (uint64);

    /**
     * @dev Resolve an id to a contract address
     * @param id The id to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolveIdToAddress(uint64 id) view external returns (address);
}
```
