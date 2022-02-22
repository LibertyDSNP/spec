---
name: Identity
route: /DSNP/Identity
menu: "DSNP"
---

# Identity

This specification is intended to cover the concept of identity within the protocol and how we represent it.

## Requirements

* Identifier: An identity MUST have a consistent identifier.
* Ownership: An identity MUST default full control to the owner.
* Pseudo Anonymity: An identity MUST default to being disconnected from a real world identity.

## Identifier

The DSNP Identifiers form the basis for pseudo-anonymous streams of content. Graph connections are formed through the DSNP User Id.

TODO: [Link to Identifiers](/DSNP/Identifiers).

## Ownership

TODO Write up about Ownership.

- Why does ownership matter?
- Ownership is the control of an identifier
  - Who can announce content associated with that identifier
  - Who can permission others to announce content on their behalf

### Multiple Keys

- Does this need to be a DSNP requirement?
- Users can have more than one ownership key
- No requirement to share keys across devices
- Allow others to manage social media accounts (does this require permissions?)

Ownership is managed through using permissions.
While at least one owner is required, additional public keys may be considered to have ownership and may remove or add other owners.

### Delegation

* Delegation: An owner MUST be able to delegate permission to announce on their behalf to other parties.

- Delegation is the ability to announce messages on behalf of a DSNP Identity

Delegation allows adding public keys that are allowed to sign announcements or perform other actions in addition to the "owner" public key.

Why do we want delegation?
- We believe users are lazy
- We don't think that constantly going to a separate wallet application is secure
- We don't want applications to default to building in a wallet because that would lead to the possibility that applications would lock users into them.
- We don't want users to have to deal with blockchain
- We don't want users to have to deal with money on the blockchain
- Batching is only efficient with delegation (means DSNP only really works with delegation)

## Pseudo Anonymity

While some users may choose to link or otherwise expose their real world identity, DSNP implementations MUST NOT require such data exposure for account creation.

TODO: Why is this important?

- Privacy
- Security
- Censorship
- Safety
