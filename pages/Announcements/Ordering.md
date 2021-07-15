---
name: Ordering
route: /Announcements/Ordering
menu: Announcements
---

# Messages Ordering

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Describe a standard for ordering DSNP messages and resolving conflicts in DSNP message with time dependent context.

## Assumptions

* All assumptions from [DSNP Messages](/Announcements/Overview)

## Ordering

DSNP messages must be ordered at the highest level by the block number of the block in which a message's batch is announced with higher block numbers indicating announcements that are sorted after announcements announced in lower block numbers.
After block number, announcements published in the same block must be ordered by the transaction index with higher transaction indices indicating announcements that are sorted after announcements in lower transaction indices.
After transaction index, announcements within the same transaction must be ordered by log index with higher log indices representing announcements that are sorted after announcements with lower log indices.
After announcement order, messages must be sorted as they appear in a batch file with higher row numbers indicating announcements that are sorted after announcements with lower row numbers.

1. Block Number Ascending
2. Transaction Index Ascending
3. Log Index Ascending
4. Batch File Row Index Ascending
