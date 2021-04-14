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

* Ids will need to be moved from Betanet to Mainnet
* Handles are for display and discovery purposes only

## Discovery

Contract addresses are not easy to remember and while some networks have had success with just numbers,
it is most common to think of text based handles for finding other people on a network.
DSNP handles are an easy way to allow easy user lookup.

## Homograph Attack Mitigation

UTF-8 support for handles opens handle users up to [homograph attacks](https://en.wikipedia.org/wiki/IDN_homograph_attack), not to mention case-sensitivity issues.
This issue is of ongoing discussion both for the DSNP as well as in for ICANN domain names and other projects working with internationalization support.

Because the DSNP Id is stable, attacks would only be successful in cases where the DSNP Id were unknown.
[Punycode](https://en.wikipedia.org/wiki/Punycode) would resolve some issues, but would require losing true internationalization.

### Current Mitigation Strategies

Clients resolving handles MUST implement a method to detect potential homographs and check both user settings and potentially check the registry for additional potential matching DSNP Ids.

## DSNP Ids

Ethereum contract addresses are currently 160 bit values which is much larger than needed for unique identification.
Graph connections can be reduced to just 64 bit identifiers.

**Remember:** Only DSNP Ids are safe for long term data connections.

* DSNP Identity contracts are not guaranteed long term for upgrade and migration reasons
* Handles are subject to homograph attacks


## EIP 721

While the NFT standard is not necessary to support, it provides standard ownership transfer and management tools.

TODO: Research the possibilities of EIP 721 support.

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
 */
interface IRegistry {
    
    /**
     * @dev Log when a new handle is registered
     * @param addr The address the handle is pointing at
     * @param id The numerical DSNP Id for storing references
     * @param handle The actual UTF-8 string used for the handle 
     */
    event DSNPHandle(address addr, uint64 id, string handle);

    /**
     * @dev Log when a the handle address is changed
     * @param addr The new address the handle is pointing at
     * @param id The numerical DSNP Id for reference 
     */
    event DSNPHandleChange(address addr, uint64 id);

    /**
     * @dev Register a new handle
     * @param addr Address for the handle to point at
     * @param handle The handle for the address
     * 
     * MUST NOT allow a registration of an addr that is already attached to a different handle
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
     * MUST NOT allow a registration of an addr that is already attached to a different handle
     * MUST be signed by someone who is authorized on the contract via `EIP 1271(addr).isValidSignature`
     * MUST emit DSNPHandle
     */
    function registerByEIP712Sig(bytes32 r, bytes32 s, uint32 v, address addr, string handle) external;

    /**
     * @dev Alter a handle resolution
     * @param newAddr New address for the handle to point at
     * @param handle The handle to alter
     * 
     * MUST NOT allow a registration of an newAddr that is already attached to a different handle
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
     * MUST NOT allow a registration of an addr that is already attached to a different handle
     * MUST be signed by someone who is authorized on the contract via `EIP 1271(oldAddr).isValidSignature`
     * TODO: FIX THE ISSUE OF newAddr not being a part of the creation
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
     * @dev Resolve a handle to the DSNP Id
     * @param handle The handle to resolve
     * 
     * @throws if not found
     * @returns The uint64 DSNP Id for the handle
     */
    function resolveHandleToId(string handle) view external returns (uint64);

    /**
     * @dev Resolve a DSNP Id to a contract address
     * @param id The DSNP Id to resolve
     * 
     * @throws if not found
     * @returns Address of the contract
     */
    function resolveIdToAddress(uint64 id) view external returns (address);
}
```
