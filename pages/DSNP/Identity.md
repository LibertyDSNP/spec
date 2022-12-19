# Identity

This specification is intended to cover the concept of identity and how identity is represented within the protocol.

## Identifiers

DSNP [Identifiers](Identifiers.md) form the basis for pseudo-anonymous streams of content.
While some users may choose to link or expose their real-world identity, DSNP implementations MUST NOT require such data exposure for account creation.
The [social graph](Graph.md) is formed using this identifier so that a user's connections maintain integrity regardless of changes in any user's client choices or access changes.

### Pseudo Anonymity

* An identifier MUST default to being disconnected from a real-world identity.
* An identifier MUST be unique to the implementation.

## Ownership

A user's ownership of their identity is expressed via ownership and control of their pseudo-anonymous identifier(s).
Control entails the power to announce content associated with the identifier and
the ability to delegate permission to others to announce content on the user's behalf.

### Delegation

* An owner MUST be able to delegate permission to announce on their behalf to other parties.
* A user MUST be able to revoke delegated permissions.
* Announcements from a delegate MUST be able to be verify which delegate made the specific announcement.
* Delegation revocation MUST NOT be retroactive.


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
