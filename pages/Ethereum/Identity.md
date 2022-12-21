# Identity

## Purpose

1. Provide the interface for a DSNP Identity.
1. Specify the delegation model and related interface.
1. Specify the ownership model and related interface.
1. Provide the list of EIPs that must be supported by a DSNP-compatible identity.

## Details

## Ownership

Ownership of an identity on Ethereum is determined by the address of the signer of the content.

Creation of any new identity MUST be authorized by the owner's address.
The official [Identity Factory](IdentityFactory.md) is provided for initial creation of a new identity.

Creation of an identity on behalf of someone is described in the [Identity Factory](IdentityFactory.md).

### Permissioned Owners

Ownership is managed through using permissions.
While at least one owner is required, additional public keys may be considered to have ownership and may remove or add other owners.

## Delegation

Delegation allows adding additional public keys, to the owner public key(s).
These delegated keys are allowed to perform certain actions on behalf of the owner based on the delegate's "role".

### Interface

```solidity
/**
 * @dev DSNP Identity Interface for managing delegates
 */
interface IDelegation {

    struct DelegateAdd {
        uint32 nonce;
        address delegateAddr;
        Role role;
    }

    struct DelegateRemove {
        uint32 nonce;
        address delegateAddr;
    }

    /**
     * @dev Enumerated Permissions
     *      Roles have different permissions
     *      APPEND ONLY
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
     *      APPEND ONLY
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
     */
    event DSNPRemoveDelegate(address delegate);

    /**
     * @dev Add or change permissions for delegate
     * @param newDelegate Address to delegate new permissions to
     * @param role Role for the delegate
     *
     * MUST be called by owner or other delegate with permissions
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegate(address newDelegate, Role role) external;

    /**
     * @dev Add or change permissions for delegate by EIP-712 signature
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param change Change data containing new delegate address, role, and nonce
     *
     * MUST be signed by owner or other delegate with permissions (implementation specific)
     * MUST consider newDelegate to be valid from the beginning to time
     * MUST emit DSNPAddDelegate
     */
    function delegateByEIP712Sig(
        uint8 v,
        bytes32 r,
        bytes32 s,
        DelegateAdd calldata change
    ) external;

    /**
     * @dev Remove Delegate
     * @param addr Address to remove all permissions from
     *
     * MUST be called by the delegate, owner, or other delegate with permissions
     * MUST store the block.number as the endBlock for response in isAuthorizedToAnnounce (exclusive)
     *
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemove(address addr) external;

    /**
     * @dev Remove Delegate By EIP-712 Signature
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param change Change data containing new delegate address and nonce
     *
     * MUST be signed by the delegate, owner, or other delegate with permissions
     * MUST store the block.number as the endBlock for response in isAuthorizedToAnnounce (exclusive)
     * MUST emit DSNPRemoveDelegate
     */
    function delegateRemoveByEIP712Sig(
        uint8 v,
        bytes32 r,
        bytes32 s,
        DelegateRemove calldata change
    ) external;

    /**
     * @dev Checks to see if address is authorized with the given permission
     * @param addr Address that is used to test
     * @param permission Level of permission check. See Permission for details
     * @param blockNumber Check for authorization at a particular block number, 0x0 reserved for endless permissions
     * @return boolean
     *
     * @dev Immutable assuming operating on confirmed blocks
     */
    function isAuthorizedTo(
        address addr,
        Permission permission,
        uint256 blockNumber
    ) external view returns (bool);

    /**
     * @dev Get a delegate's nonce
     * @param addr The delegate's address to get the nonce for
     *
     * @return nonce value for delegate
     */
    function getNonceForDelegate(address addr) external view returns (uint32);
}
```

## Upgrade Interface

It is an open question whether a standard set of upgrade interfaces should be required.

## Additional Required Interfaces

### EIP 165

[EIP 165](https://eips.ethereum.org/EIPS/eip-165) provides standard interface detection.
It is required to support optional interfaces and upgrade expansion.

## Additional Optional Interfaces

### EIP 173

[EIP 173](https://eips.ethereum.org/EIPS/eip-173) provides methods that confirm ownership and provide methods to transfer ownership.
Implementations that choose to use this interface will need to consider that transferring ownership should revoke all existing delegations, or at a minimum all delegates at `Role.OWNER`.

### EIP 897

[EIP 897](https://eips.ethereum.org/EIPS/eip-897) is for DSNP identity contracts
that are proxies such as those produced by the default [Identity Factory](IdentityFactory.md).

### EIP 1271

[EIP 1271](https://eips.ethereum.org/EIPS/eip-1271) allows the identity contract to validate a signature.
To support delegation, this interface allows a contract to validate against the signature of the owner.

Unlike `IDelegation.isAuthorizedToAnnounce` which supports permission levels and end block number, `isValidSignature` will only respond to currently permissioned addresses at the owner level.

**REMEMBER**: Implementation *MUST ONLY* return true for active owner level.

### Identity Requirements

| Interface | Required |
|-----------|----------|
| `IDelegation` | Required |
| [EIP 165](https://eips.ethereum.org/EIPS/eip-165) | Required |
| [EIP 897](https://eips.ethereum.org/EIPS/eip-897) | Proxy Contracts Only |
| [EIP 173](https://eips.ethereum.org/EIPS/eip-173) | Optional |
| [EIP 1271](https://eips.ethereum.org/EIPS/eip-1271) | Optional |

## Rejected Solutions

* Centralized smart contract maintaining identifiers and owners
  * Top Rejection Reasons:
    * A centralized contract must either be controlled by the foundation, a DAO, or be non-upgradable.
    * Does not allow for complete flexibility in ownership.
* Using a single public key as an identifier
  * Top Rejection Reasons:
    * Does not allow for flexibility in ownership.
    * Completely dependent on off-chain software and processing for verification of delegation.
* Using a single owner model
  * A single owner (as well as the existing EIP 173 to manage it) was considered as opposed to the multi-owner role system.
  * Top Rejection Reasons:
    * Does not allow for flexibility in ownership.
    * Single-owner increases the likelihood of users using choosing less secure key management practices.
    * Multi-owner pairs better with a permissioned system.
* Using a simple two-tier permission model
  * Owner level and "everything" else
  * Top Rejection Reasons:
    * Limits options for future specific roles such as social recovery.
    * Cost savings were minimal when paired with a role-based system.
