# Operations

DSNP implementations perform well-defined DSNP Operations and generate DSNP State Change Records.

## Control Keys and Proofs

Each invocation of a DSNP Operation MUST have verifiable approval of the acting principal(s) via a Control Key Ownership Proof.
The precise data type and representation of both the Control Key and the Control Key Ownership Proof MUST be defined by each DSNP implementation.
For example, an implementation might use the public key of an asymmetric key pair as a control key, and provide a proof for each operation by producing a cryptographic signature of the user's DSNP Identifier and some nonce value.

Where operations are listed as using control keys or ownership proofs as input parameters, this indicates that these keys or proofs should be provided in addition to those needed for invocation authentication.

## Transaction Identifiers

Each invocation of a DSNP Operation should be associated with a Transaction Identifier.
Transaction Identifiers are used to associate Operation invocations with asynchronously emitted State Change Records.
It MUST be possible to associate a DSNP State Change Record with a Transaction Identifier from a particular DSNP Operation invocation.
Transaction Identifiers MUST be unique within an implementation.
Transaction Identifiers MUST be serializable as a string.

## Failure Handling

Compliant implementations may respond to error conditions either synchronously, as a response to the invocation request, or asynchronously, by emitting a [Failure Record](Records.md#failure).

## List of Operations

| Operation | Optional? | Principal(s) | Inputs | State Change Record or Output |
|---------- |---------- |------------- |------- |-------------- |
| <a id="create-identifier">Create Identifier</a> | no | None | Control Key, Control Key Ownership Proof | [Identifier Creation Record](Records.md#identifier-creation) |
| <a id="retire-identifier">Retire Identifier</a> | no | User | None | [Identifier Retirement Record](Records.md#identifier-retirement) |
| <a id="define-delegation">Define Delegation</a> | no | User AND Delegate | User's Identifier, Delegate's Identifier, Set of Allowed [Announcement Types](Announcements.md#announcement-types), Set of Allowed [User Data Types](UserData.md) | [Delegation Definition Record](Records.md#delegation-definition) |
| <a id="revoke-delegation">Revoke Delegation</a> | no | User OR Delegate | User's Identifier, Delegate's Identifier | [Delegation Revocation Record](Records.md#delegation-revocation) |
| <a id="add-control-key">Add Control Key</a> | YES | User | Key, Key Ownership Proof | [Control Key Addition Record](Records.md#control-key-addition) |
| <a id="remove-control-key">Remove Control Key</a> | YES | User | Key | [Control Key Removal Record](Records.md#control-key-removal) |
| <a id="publish-announcement">Publish Announcement</a> | no* | User OR Delegate | [Announcement](Announcements.md) | [Announcement Published Record](Records.md#announcement-published) |
| <a id="publish-batch">Publish Batch</a> | no* | User OR Delegate | [Announcement Type](Announcements.md#announcement-types), [Batch Publication](BatchPublications.md) URL, Batch Publication Content Hash | [Batch Published Record](Records.md#batch-published) |
| <a id="get-user-data">Get User Data</a> | no | Any | User's Identifier, Set of Requested [User Data Types](UserData.md#user-data-types) | Map of [User Data Types](UserData.md#user-data-types) to [Data Chunks](UserData.md#data-chunks) with optional key identifiers of encryption keys for each chunk |
| <a id="replace-user-data">Replace User Data</a> | no | User OR Delegate | User's Identifier, [Key Identifier](Types/PublicKey.md#keyid), Map of [User Data Types](UserData.md#user-data-types) to [Data Chunks](UserData.md#data-chunks) | [User Data Replaced Record](Records.md#user-data-replaced) |

\* For each Announcement Type, an implementation may support one or both of these operations.
Implementations MUST document which of the operations is available for each Announcement Type.
