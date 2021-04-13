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
| 0.1     | Tentative |

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


### Permissioned Owners

Ownership is managed through using permissions.
While at least one owner is required, additional public keys may be considered to have ownership and may remove or add other owners.

## Delegation

Delegation allows adding public keys that are allowed to sign announcements
or perform other actions in addition to the "owner" public key.

### Interface

```solidity
/**
 * @dev DSNP Identity Interface for managing delegates
 */
interface IDelegation {

    /**
     * @dev Enumerated Permissions
     *      Roles have different permissions
     */
    enum Permission {
        /**
         * @dev 0x0 NONE reserved for no permissions 
         */
        NONE,

        /**
         * @dev 0x1 Announce any DSNP message
         */
        ANNOUNCE,

        /**
         * @dev 0x2 Add new delegate
         */
        OWNERSHIP_TRANSFER,

        /**
         * @dev 0x3 Add new delegates
         */
        DELEGATE_ADD,

        /**
         * @dev 0x4 Remove delegates
         */
        DELEGATE_REMOVE
    }

    /**
     * @dev Enumerated Roles
     *      Roles have different permissions 
     *      For example: 
     */
    enum Role {
        /**
         * @dev 0x0 NONE reserved for no permissions 
         */
        NONE,

        /**
         * @dev 0x1 OWNER:
         *      - Permission.*
         */
        OWNER,

        /**
         * @dev 0x2 ANNOUNCER:
         *      - Permission.ANNOUNCE
         */
        ANNOUNCER
    }

    /**
     * @dev Log for addition of a new delegate
     * @param delegate Address delegated
     * @param role Permission Role
     */
    event DSNPAddDelegate(address delegate, Role role);

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
    function delegate(address newDelegate, Role role) external;

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
    function delegateByEIP712Sig(bytes32 r, bytes32 s, uint32 v, address newDelegate, Role role) external;

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
    function delegateRemoveByEIP712Sig(bytes32 r, bytes32 s, uint32 v, address delegate, uint64 endBlock) external;

    /**
     * @dev Checks to see if address is authorized to announce messages
     * @param addr Address that is used to test with ecrecover
     * @param permission Level of permission check. See Permission for details
     * @param blockNumber Check for authorization at a particular block number
     * @return boolean 
     * 
     * @dev Return MAY change as deauthorization can revoke past messages
     */
    function isAuthorizedTo(address addr, Permission permission, uint64 blockNumber) external view returns (bool);
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
Implementations that choose to use this interface will need to consider that transferring ownership should revoke all existing delegations,
or at a minimum all delegates at `Role.OWNER`.

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
| [EIP 897](https://eips.ethereum.org/EIPS/eip-897) | Proxy Contracts Only |
| [EIP 173](https://eips.ethereum.org/EIPS/eip-173) | Optional |

## Rejected Solutions

* Centralized smart contract maintaining identifiers and owners
  * Top Rejection Reasons:
    * A centralized contract must either be controlled by the foundation, a DAO, or non-upgradable
    * Does not allow for complete flexibility in ownership
* Using a single public key as an identifier
  * Top Rejection Reasons:
    * Does not allow for flexibility in ownership
    * Completely dependent on off-chain software and processing for verification of delegation
* Using a single owner model
  * A single owner (as well as the existing EIP 173 to manage it) was considered as opposed to the multi-owner role system
  * Top Rejection Reasons:
    * Does not allow for flexibility in ownership
    * Single-owner increases the likelihood of users using choosing less secure key management practices
    * Multi-owner pairs better with a permissioned system
* Using a simple two-tier permission model
  * Owner level and "everything" else
  * Top Rejection Reasons:
    * Limits options for future specific roles such as social recovery
    * Cost savings were minimal when paired with a role based system
