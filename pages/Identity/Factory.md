---
name: Factory
route: /Identity/Factory
menu: Identity
---

# Identity Factory

The least expensive way to create a new identity is through an identity factory.
Official contracts will provide one or more of these standard interfaces to easily generate an identity with different upgrade paths.

**Remember:** Using a factory or even a proxy is just an optimization and *NOT* required.
Any contract that matches the [DSNP Identity](/Identity/Overview) interfaces is valid.

## Specification Status

| Version | Status |
---------- | ---------
| 0.2     | Tentative |

## Purpose
1. Describe how an Identity Factory can create an identity
1. Describe how an Identity Factory can allow someone else to pay for the creation an identity
1. Restrict the creation of identities without owner permission

## Assumptions
* All assumptions from [DSNP Identity](/Identity/Overview)

## Proxy Contracts

While it is not required, most of the DSNP Identity compatible contracts are proxy contracts.
Proxy contracts are often created through a factory contract.
Here are the interfaces to be a DSNP compatible identity factory.

### What is a Proxy Contract?

Proxy contracts are used to limit the gas for deploying many contracts that all have the same logic,
but need different state. The state is maintained at the "proxy" contract
while the logic to alter the state is able to be in one "logic" contract.

__Remember: A Logic Contract has 100% control over the state of a smart contract.__
While a logic contract cannot have state that effects the execution of a proxy contract,
a logic contract's code can be written in such a way that allows for others to take control of a contract.
Never use logic contracts that you do not trust!

### What are the different types of Proxy Contracts?

[OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/api/proxy) has a great set of standard and audited proxy contracts.

While there may not be an identity factory interface for each type,
the documentation from OpenZeppelin gives good detail on the differences between the types.

### Can I switch from one type to another?

Switching types is possible, but difficult.
See [Identity Registry](/Identity/Registry) for more information on switching an identity contract.

### Data storage and EIP 1967

Due to the state management system that Ethereum uses, it can easily cause issues for upgradable contracts.
[EIP 1967](https://eips.ethereum.org/EIPS/eip-1967) provides for ways to safely use state that will not collide.
Implementations of upgradable proxies MUST use EIP 1967 style data storage.

## Factory

An identity factory will give easy methods to allow for the creation of proxy contracts that function as DSNP Identities.
Official implementation contract addresses will be published once deployed.

### Clone Interface

Clones follow [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167) for a **non-upgradeable** identity contract.

```solidity
/**
 * @dev DSNP Identity Factory Interface for creating identities via [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167)
 */
interface IIdentityCloneFactory {

    /**
     * @dev event to log the created proxy contract address
     */
    event ProxyCreated(address addr);

    /**
     * @dev Creates a new identity with the message sender as the owner
     * @dev [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167) Proxy 
     * @param logic The Logic address to use for identity creation
     * 
     * @returns The address of the newly created Identity
     */
    function createClone(address logic) public returns (address);

    /**
     * @dev Creates a new identity with the ecrecover address as the owner
     * @dev [EIP 1167](https://eips.ethereum.org/EIPS/eip-1167) Proxy
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param logic The Logic address to use for identity creation
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createCloneByEIP712Sig(uint8 v, bytes32 r, bytes32 s, address logic) external returns (address);
}
```

### Upgradable Proxy Interface

Upgradable Proxies can be upgraded by the owner or permissioned delegates.

```solidity
/**
 * @dev DSNP Identity Factory Interface for creating upgradable identities
 */
interface IIdentityUpgradableFactory {

    /**
     * @dev event to log the created proxy contract address
     */
    event ProxyCreated(address addr);

    /**
     * @dev Logs updates to the suggested logic contract
     * @dev MUST BE emitted when the contract changes the suggested logic address
     * @param newLogic The new address
     */
    event LogicUpdated(address newLogic);
    
    /**
     * @dev This may be upgradable by the owner of the factory
     *
     * @returns The current logic contract suggested by this factory
     */
    function getLogic() external view returns (address);

    /**
     * @dev Creates a new identity with the message sender as the owner
     *      and will be pointed at the default identity logic address.
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createUpgradable() external returns (address);
    
    /**
     * @dev Creates a new identity with the message sender as the owner
     * @param logic The Logic address to use for identity creation
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createUpgradable(address logic) external returns (address);

    /**
     * @dev Creates a new identity with the ecrecover address as the owner
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param logic The logic address to use for identity creation
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createUpgradableByEIP712Sig(uint8 v, bytes32 r, bytes32 s, address logic) external returns (address);
}
```

### Beacon Factory Interface

Beacon Proxies will use the beacon's logic address and will be upgraded when the beacon's logic address is changed.
This is the suggested factory for use on Betanet to remain up to date.

```solidity
/**
 * @dev DSNP Identity Factory Interface for creating beacon following identities
 */
interface IIdentityBeaconFactory {

    /**
     * @dev event to log the created proxy contract address
     */
    event ProxyCreated(address addr);
    
    /**
     * @dev This MUST NOT be upgradable by the owner of the factory
     *
     * @returns The current beacon contract suggested by this factory
     */
    function getBeacon() external view returns (address);

    /**
     * @dev Creates a new identity with the message sender as the owner
     *      Uses the beacon defined by getBeacon()
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createBeacon() external returns (address);
    
    /**
     * @dev Creates a new identity with the message sender as the owner
     * @param beacon The beacon address to use for identity creation
     * 
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createBeacon(address beacon) external returns (address);
    
    /**
     * @dev Creates a new identity with the ecrecover address as the owner
     * @param v EIP-155 calculated Signature v value
     * @param r ECDSA Signature r value
     * @param s ECDSA Signature s value
     * @param beacon The beacon address to use for identity creation
     *
     * @dev This MUST emit ProxyCreated with the address of the new proxy contract
     * @returns The address of the newly created identity proxy contract
     */
    function createBeaconByEIP712Sig(uint8 v, bytes32 r, bytes32 s, address beacon) external returns (address);
}
```

### Beacon Interface

A beacon contract follows the same interface as the OpenZeppelin 4 [IBeacon](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/proxy/beacon/IBeacon.sol).
Updating the beacon logic address is left to the implementation of the beacon, but the OpenZeppelin 4 [UpgradeableBeacon](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/proxy/beacon/UpgradeableBeacon.sol) is suggested.

```solidity
/**
 * @dev This is the interface that {BeaconProxy} expects of its beacon.
 */
interface IBeacon {
    /**
     * @dev Must return an address that can be used as a delegate call target.
     *      This follows the interface from OpenZeppelin 4.0.0 [IBeacon](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.0.0/contracts/proxy/beacon/IBeacon.sol)
     *
     * @return A contract address that implements the logic for the proxy
     */
    function implementation() external view returns (address);
}
```
