---
name: Overview
route: /Identity/Overview
menu: Identity
---

# Identity

This specification is intended to cover the concept of identity within the protocol and how we represent it.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose

1. Provide the interface for a DSNP identity
1. Specify the delegation model and related interface
1. Specify the ownership model and related interface
1. Provide the list of EIPs that must be supported by a DSNP compatible identity 

## Assumptions

* Identity is on Ethereum for Betanet
* Identity will need to be moved from Betanet to Mainnet

## Details

Identity is comprised of several parts:

* Ownership
* Delegation
* Identification
* Discovery

Additional constraints were placed upon any solution:

* Pseudo Anonymity: A consistent identifier that defaults to disconnected from real world identity 
* Flexibility: An interface that can produce multiple solutions
* Extensibility: A default implementation that can be updated over time as DSNP changes

## Ownership

On the blockchain ownership is determined by the ability to sign messages.
To this end, ownership of an identity is also determined by the address of the creator.
(Options for allowing a delegate to create an identity on behalf of someone is described in the [Identity Factory](/Identity/Factory).)

Creation of any new identity MUST be authorized by the owner's address.
The official [Identity Factory](/Identity/Factory) must be used for initial creation of a new identity.


## Option 1: Single Owner

Each identity contract may only have one owner, although delegations may provide for other methods of transferring ownership. 

The contract MUST implement [EIP 173](https://eips.ethereum.org/EIPS/eip-173) which provides methods that confirm ownership and facilitate ownership transfer.

## Option 2: Permissioned Owners

Ownership is managed through using permissions.
While at least one owner is required, additional public keys may be considered to have ownership and may remove or add other owners.

A contract MAY implement [EIP 173](https://eips.ethereum.org/EIPS/eip-173) which provides standard methods that confirm ownership and facilitate ownership transfer.

## Delegation

Delegation allows adding public keys that are allowed to sign announcements
or perform other actions in addition to the "owner" public key. 

### Option 1: Single Permission

Delegates are assumed to all have the same permission, although that permission may be different than that of the owner.
Exact permissions are TBD, but MUST NOT include the ability to add additional delegates. 

```solidity
/**
 * @dev DSNP Identity Interface for managing delegates
 */
interface IDelegation {
    
    /**
     * @dev Log for addition of a new delegate
     * @param delegate Address delegated
     */
    event DSNPAddDelegate(address delegate);

    /**
     * @dev Log for removal of a delegate
     * @param delegate Address revoked 
     * @param endBlock Block number considered to be the end of the delegate permissions
     */
    event DSNPRemoveDelegate(address delegate, uint64 endBlock);

    /**
     * @dev Add Delegate (default permissions determined by implementation)
     * @param newDelegate Address to delegate new permissions to 
     * 
     * MUST be called by the owner
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegate(address newDelegate) external;

    /**
     * @dev Add Delegate By EIP-712 Signature (default permissions determined by implementation)
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param newDelegate Address to delegate new permissions to
     * 
     * MUST be signed by the owner
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegateBySignature(bytes32 r, bytes32 s, uint32 v, address newDelegate) external;

    /**
     * @dev Remove delegate
     * @param delegate Address to remove all permissions from
     * @param endBlock Block number to consider the permissions terminated (MUST be > 0x0). 
     * 
     * MUST be called from owner or the delegate  
     * MUST store endBlock for response in isAuthorizedToAnnounce
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemove(address delegate, uint64 endBlock) external;

    /**
     * @dev Remove delegate By EIP-712 signature (default permissions determined by implementation)
     * @param delegate Address to remove all permissions from
     * @param endBlock Block number to consider the permissions terminated (MUST be > 0x0).
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * 
     * MUST be signed by owner or by the delegate
     * MUST store endBlock for response in isAuthorizedToAnnounce
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemoveBySignature(bytes32 r, bytes32 s, uint32 v, address delegate, uint64 endBlock) external;

    /**
     * @dev Checks to see if address is authorized to announce messages
     * @param addr Address that is used to test against erecover
     * @param blockNumber Check for authorization at a particular block number
     * @return boolean 
     * 
     * @dev Return MAY change as deauthorization can revoke past messages
     */
    function isAuthorizedToAnnounce(address addr, uint64 blockNumber) external view returns (bool);
}
```

### Option 2: With Permissions

Specific permissions are granted when the delegate is added.

```solidity
/**
 * @dev DSNP Identity Interface for managing delegates
 */
interface IDelegation {

    /**
     * @dev Should we do a Bitwise permission system instead of enum?
     */
    enum Permission {
        NONE, OWNER, ANNOUNCER
    }
    
    /**
     * @dev Log for addition of a new delegate
     * @param delegate Address delegated
     * @param permission Level of permission granted
     */
    event DSNPAddDelegate(address delegate, Permission permission);

    /**
     * @dev Log for removal of a delegate
     * @param delegate Address revoked 
     * @param endBlock Block number considered to be the end of the delegate permissions
     */
    event DSNPRemoveDelegate(address delegate, uint64 endBlock);

    /**
     * @dev Add or change permissions for delegate 
     * @param newDelegate Address to delegate new permissions to
     * @param permission Permission level
     * 
     * MUST be called by owner or other delegate with permissions
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegate(address newDelegate, Permission permission) external;

    /**
     * @dev Add or change permissions for delegate by EIP-712 signature
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * @param newDelegate Address to delegate new permissions to
     * @param permission Permission level
     * 
     * MUST be signed by owner or other delegate with permissions (implementation specific)
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegateBySignature(bytes32 r, bytes32 s, uint32 v, address newDelegate, Permission permission) external;

    /**
     * @dev Remove Delegate
     * @param delegate Address to remove all permissions from
     * @param endBlock Block number to consider the permissions terminated (MUST be > 0x0). 
     * 
     * MUST be called by the delegate, owner, or other delegate with permissions
     * MUST store endBlock for response in isAuthorizedToAnnounce
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemove(address delegate, uint64 endBlock) external;

    /**
     * @dev Remove Delegate By EIP-712 Signature
     * @param delegate Address to remove all permissions from
     * @param endBlock Block number to consider the permissions terminated (MUST be > 0x0).
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param v EIP-155 calculated Signature v value
     * 
     * MUST be signed by the delegate, owner, or other delegate with permissions
     * MUST store endBlock for response in isAuthorizedToAnnounce
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemoveBySignature(bytes32 r, bytes32 s, uint32 v, address delegate, uint64 endBlock) external;

    /**
     * @dev Checks to see if address is authorized to announce messages
     * @param addr Address that is used to test against erecover
     * @param permission Level of permission check. See Permission for details
     * @param blockNumber Check for authorization at a particular block number
     * @return boolean 
     * 
     * @dev Return MAY change as deauthorization can revoke past messages
     */
    function isAuthorizedToAnnounce(address addr, Permission permission, uint64 blockNumber) external view returns (bool);
}
```


## Identification

In order to maintain chain level flexibility (see [Networks](/Networks) for more details),
an identifier outside of the contract address is needed to maintain the graph data integrity without need for a translation.
The `IIdentification` interface provides the mapping back to the identifier from the contract (see [Registry](/Identity/Registry) for more details) . 

```solidity
/**
 * @dev Easy way to map back to the identifier, but must be validated
 */
interface IIdentification {
    /**
     * @dev Returns the identifier for the contract.
     * @dev May be validated by testing against (TBD)
     * 
     * @return string 
     */
    function getId() external view returns (string);
}
```

## Upgrade Interface

It is an open question if we want to require a standard set of upgrade interfaces. 

## Additional Required Interfaces

### EIP 1271

[EIP 1271](https://eips.ethereum.org/EIPS/eip-1271) allows the identity contract to validate a signature.
To support delegation, this interface allows a contract to validate against the signature of the owner.

Unlike `IDelegation.isAuthorizedToAnnounce` which supports permission levels and end block number,
`isValidSignature` will only respond to currently permissioned addresses at the owner level.

**REMEMBER**: Implementation *MUST ONLY* return true for the owner level. 

### EIP 165

[EIP 165](https://eips.ethereum.org/EIPS/eip-165) provides standard interface detection.
It is required to support optional interfaces and upgrade expansion.

## Additional Optional Interfaces

### EIP 173

[EIP 173](https://eips.ethereum.org/EIPS/eip-173) provides methods that confirm ownership and provide methods to transfer ownership.

### EIP 897

[EIP 897](https://eips.ethereum.org/EIPS/eip-897) is for DSNP identity contracts
that are proxies such as those produced by the default [Identity Factory](/Identity/Factory).


### Identity Requirements

| Interface | Required |
|-----------|----------|
| IDelegation | Required |
| IIdentification | Required |
| [EIP 1271](https://eips.ethereum.org/EIPS/eip-1271) | Required |
| [EIP 165](https://eips.ethereum.org/EIPS/eip-165) | Required |
| [EIP 173](https://eips.ethereum.org/EIPS/eip-173) | Option 1: Required <br /> Option 2: Optional |
| [EIP 897](https://eips.ethereum.org/EIPS/eip-897) | Proxy Contracts Only |

## Rejected Solutions

* Centralized smart contract maintaining identifiers and owners
  * Top Rejection Reasons:
    * A centralized contract must either be controlled by the foundation, a DAO, or non-upgradable.
    * Does not allow for complete flexibility in ownership
* Using a single public key as an identifier
  * Top Rejection Reasons:
    * Does not allow for flexibility in ownership
    * Completely dependent on off-chain software and processing for verification of delegation  
