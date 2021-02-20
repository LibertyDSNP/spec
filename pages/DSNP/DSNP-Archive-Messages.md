## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Proposed |

## Purpose
1. Specify the Archivist message format

## Archive Entry
|field|description|type|
|---|---|---|
| dsnpType | DSNP message type |number/enum |
| message | DSNP message data | see fields in [DSNP Messages](/DSNP/DSNP-Messages) |
| fromAddress| social identity of message sender | bytes | 
| author | social identity of author of the content. may be different if fromAddress is a delegated sender. | bytes |
| messageID | keccak-256 hash of content stored at uri |  bytes32
| signatures | list of additional signatures referencing this message | array of Signatures |
| blockHeight | the block number this message was included in | number |
| transactionIndex | the index of the transaction this message is associated with | number
| logIndex | the index within the logs of this message | number

## Batch
A _Batch_ is data that is referenced by a Batch Announcement.

|field|description|type|
|---|---|---|
| messageID | keccak-256 hash of content stored at uri |  bytes32
| fromAddress| social identity of batch announcer,i.e. message sender | bytes |
| signature | announcer's signature | Signature |

*  List of Validated Announcements
    * announcementID  = Keccak256 hash of the content found at uri →
        * Announcement archival data
        * ServiceNodeID-1 -> signature, result
        * ServiceNodeID-2 -> signature, result
        * …
        * ServiceNodeID-N -> signature, result

## Archive Segment
An archive segment is a clump of data that is archived. It consists of a map of messageIDs pointing to either:
* A list of announcements from 1 or more batches
* Independently posted announcements


