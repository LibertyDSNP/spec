# Identity

This specification is intended to cover the concept of identity and how identity is represented within the protocol.

## Identifiers

DSNP [Identifiers](Identifiers.md) form the basis for pseudo-anonymous streams of content.
While some users may choose to link or expose their real-world identity, DSNP implementations MUST NOT require such data exposure for account creation.
The [social graph](Graph.md) is formed using this Identifier so that a user's connections maintain integrity regardless of changes in any user's client choices or access changes.

### Pseudo Anonymity

* An Identifier MUST default to being disconnected from a real-world identity.
* An Identifier MUST be unique to the implementation.

## Ownership

A user's ownership of their identity is expressed via ownership and control of their pseudo-anonymous Identifier(s).
Control entails the power to invoke DSNP Operations including publishing [Announcements](Announcements.md) that create, update and delete (Tombstone) content associated with the Identifier, [delegating](#delegation) these powers to others, [managing keys](#key-management) associated with the Identifier, and [retiring](#retirement) the Identifier.

### Key Management

An initial control key must be created in order to acquire an Identifier.
Each distinct Identifier MUST have distinct control keys; that is, the same key MUST NOT be linked to multiple Identifiers.
Optionally, an implementation MAY allow the user to add and remove additional keys.
An implementation MUST NOT allow the user to remove the only or last remaining control key.

### Retirement

A user may choose to retire their Identifier at any time.
Once an Identifier is retired, an implementation MAY remove all state data associated with that Identifier, provided that an indication that the Identifier is retired remains, so it may not be reused in the future.
This means that all data previously sent from the Identifier, the keys associated with the Identifier, and the delegations (see next section) associated with the Identifier may be removed.

After an Identifier is retired, any existing or future [Announcements](Announcements.md) from the Identifier should be treated as if they have been [tombstoned](Types/Tombstone.md) (for Announcement Types that support tombstoning).
A retired Identifier MUST NOT be allowed to act as a principal for any additional DSNP [Operations](Operations.md).

### Delegation

* An owner MUST be able to delegate permission to announce on their behalf to other parties.
* A user MUST be able to revoke delegated permissions.
* Announcements from a delegate MUST be able to be verify which delegate made the specific Announcement.
* Delegation revocation MUST NOT be retroactive.

## Related Operations

* [Create Identifier](Operations.md#create-identifier)
* [Retire Identifier](Operations.md#retire-identifier)
* [Define Delegation](Operations.md#define-delegation)
* [Revoke Delegation](Operations.md#revoke-delegation)
* [Add Control Key](Operations.md#add-control-key)
* [Remove Control Key](Operations.md#remove-control-key)

## Non-normative

### Retroactive Revocation of Delegation

There are times when one might desire retroactive revocation of delegation, if for example, a key were found to have been compromised at an earlier time.
However, retroactive revocation is much more difficult from a caching and performance perspective.
Instead [reverting any undesirable Announcements](Announcements.md#reverting-an-announcement) via [Tombstones](Types/Tombstone.md) allows a user to choose which specific events need reverting and then notify the network of that change.

To this end, any [Batch Publications](BatchPublications.md) can always be validated from the perspective of the time they were published, and do not require re-validation at future read times.
The validity of a Batch is thus immutable.

1. Collect all the DSNP Ids used in a Batch.
2. Validate that each DSNP Id had delegated to the publisher of the Batch at the time of publishing.
3. Validate that any failures from step 2 were from DSNP Ids that revoked delegation within the acceptance window of prior blocks.
4. Record the batch as valid or invalid.
