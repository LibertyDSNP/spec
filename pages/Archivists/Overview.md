---
name: Overview
route: /Archivists/Overview
menu: Archivists

---
# DSNPArchives Overview

The job of an Archivist is to permanently store Batch content and DSNPMessages in a format that is easily validated and retrieved.

The Archivist must be able to access chain data and all DSNP Message URLs.

## Validations that Archivists could perform

* Signature validation - proof that author provided a real signature
* Signature authentication - proof that the From address is the signer, or that signer is a valid delegate  (proof of authorship)
* There is retrievable content at the URL given in the DSNP message
* The content hash is valid - that is, the URL serves the claimed data

All signatures for the announcement are included in the batch regardless of how the signature was requested (or not)
