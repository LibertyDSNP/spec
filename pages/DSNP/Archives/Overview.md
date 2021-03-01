---
name: Overview
---

# Overview
The job of an Archivist is to permanently store Batch content and DSNPMessages in a format that is easily validated and retrieved.

The Archivist must be able to access chain data and all DSNP Message URIs.

## Validations that Archivists could perform
* Signature validation - proof that author provided a real signature
* Signature authentication - proof that the From address is the signer, or that signer is a valid delegate  (proof of authorship)
* Additional signatures from forum, service nodes must be validated in the same way as above
* There is retrievable content at the URI given in the DSNP message
* The content hash is valid - that is, the URI serves the claimed data

All signatures for the announcement are included in the batch regardless of how the signature was requested (or not)
