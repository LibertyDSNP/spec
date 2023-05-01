# DSNP Specification
__Version pre-1.2.1__

DSNP (Decentralized Social Networking Protocol) is a social networking protocol designed to run on a blockchain.
It specifies a set of social primitives along with requirements for interoperability.
Go to [Systems](../Systems.md) for specifics on how DSNP is expressed on a specific blockchain.

## Overview

### What is a DSNP System?

A DSNP system is a state machine which generates an ongoing, publicly observable and verifiable stream of state change records in response to public input.
This specification defines a set of operations (the DSNP [Operations](Operations.md)) that a compliant DSNP system MUST make available.
For each DSNP Operation, the DSNP specification defines the data to be provided as input, the data that will be generated as output, and the state change records (the DSNP [State Change Records](Records.md)) that will be observable as a result of the Operation, depending on the input and prior state of the system.

The nature of blockchain technology means that all DSNP Operations are potentially asynchronous; that is, DSNP State Change Records need not be created immediately upon invoking a DSNP Operation, and may appear in the stream of state changes at any subsequent time.
A DSNP Operation can therefore only be confirmed to have completed successfully by observing the stream of newly-generated DSNP Records.

All DSNP Records MUST be publicly visible.
On a blockchain, for example, all nodes must share a common set of Records, and a DSNP system specification MUST define how external systems can subscribe to or otherwise view all state changes.
In practical terms, this means that all users of a given DSNP system exist conceptually within a single shared social graph, and a given user MUST have the ability at a protocol level to see and participate in all public discourse.
Note, however, that this is not an application-level requirement; an application that interacts with DSNP might choose to filter what content is shown.

Finally, to ensure decentralization, a DSNP system MUST avoid having any single point of failure (many nodes) and MUST avoid having any single entity that can override its consensus mechanisms (many operators).

### DSNP System Compliance

Compliant DSNP system specifications MUST document how each of the required DSNP Operations (for a given version of the DSNP specification) can be invoked, including, for example, what wire protocols should be used for discovery, authentication and operation execution, and how inputs and outputs will be serialized.

A compliant specification MUST specify a mapping from its system-specific state change data (for example, the events emitted by a blockchain) to the DSNP State Change Records that data represents.

<!--- Uncomment for pre-release changes and prefix the version with `pre-[next version]`
--->
## Prerelease Changelog 

[DIP-253](https://github.com/LibertyDSNP/spec/issues/253)

## Releases

DSNP system specifications MUST specify the version(s) of the DSNP specification that may be used.

| Version | Description | Release Date | Changelog |
| --- | --- | --- | --- |
| [1.2.0](https://github.com/LibertyDSNP/spec/tree/DSNP-v1.2.0) | DIP-210, DIP-216, DIP-220, DIP-225, DIP-226, DIP-227, DIP-228 | 2023-04-11 | [Changelog](https://github.com/LibertyDSNP/spec/releases/tag/DSNP-v1.2.0) |
| [1.1.0](https://github.com/LibertyDSNP/spec/tree/DSNP-v1.1.0) | DIP-148, DIP-149, DIP-150, DIP-165, DIP-180 | 2022-05-06 | [Changelog](https://github.com/LibertyDSNP/spec/releases/tag/DSNP-v1.1.0) |
| [1.0.0](https://github.com/LibertyDSNP/spec/tree/DSNP-v1.0.0) | Initial Release | 2021-09-09 | [Changelog](https://github.com/LibertyDSNP/spec/releases/tag/DSNP-v1.0.0) |
