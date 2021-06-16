---
name: Ordering
route: /Messages/Ordering
menu: Messages
---

# Messages Ordering

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Describe a standard for ordering DSNP messages and resolving conflicts in DSNP message with time dependent context.

## Assumptions

* All assumptions from [DSNP Messages](/Messages/Overview)

## Ordering

DSNP messages must be ordered at the highest level by the block number of the block in which a message's batch is announced with higher block numbers indicating more recent messages and lower block numbers representing older ones.
After block number, announcements published in the same block must be ordered by the transaction index of the block with higher transaction indices indicating more recent messages and lower transaction indices indicating older ones.
After transaction index, announcements within the same transaction must be ordered by log index with higher log indices representing more recent messages and lower log indices indicating older ones.
After log index, batch files announced in the same announcement must be ordered in the reverse order of how they appear in the `announce` solidity method call with batch files appearing first being the oldest and last being the most recent.
After announcement order, messages must be sorted as they appear in a batch file with higher row numbers indicating more recent messages and lower row numbers indicating older ones.
