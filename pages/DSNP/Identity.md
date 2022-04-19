# Identity

This specification is intended to cover the concept of identity within the protocol and how we represent it.

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
* Announcements from a delegate MUST be able to be verified as to which delegate made the specific announcement.
