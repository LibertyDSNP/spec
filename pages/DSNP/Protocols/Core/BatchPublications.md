# Batch Publications

A Batch Publication is an [Apache Parquet](https://github.com/apache/parquet-format) file
with a collection of [Announcements](Announcements.md).

## Implementation Requirements

### Discoverable

Implementations MUST have publicly discoverable Batch Publications.

### Validity

Implementations MUST be able to validate Parquet file contents.
Validity MUST be immutable.

### Historical

Implementations MUST retain proof of existence of a Batch Publication.

### Transparent Chain of Delegation

All Announcements in a Batch file MUST be able to be proven to be from or have a chain of
delegation to the publisher of the Batch.

## File Requirements

Batch files are stored and transferred in Apache Parquet format.

* Batch files MUST match the spec for a single [Announcement Type](Announcements.md).
* Batch files MUST have Bloom filters set in accordance with the Announcement Type Spec.
* Batch files MUST have NO MORE THAN 128\*1024 rows.

### Bloom Filter

* A Bloom filter MUST be a [Split Block Bloom filter](https://github.com/apache/parquet-format/blob/apache-parquet-format-2.9.0/BloomFilter.md).
* The false-positive rate MUST be 0.001.

Calculation for filter bits is different and is nearly a factor of 10 lower than for a
standard Bloom filter:
128\*1024 rows with a 0.001 false-positive rate results in around 29,000 bits for a Split
Block Bloom filter.

Bloom filters are ONLY added to some fields.
See also the Announcement Type definitions in the
[Social Networking specification](../Social/Overview.md#announcement-types).

#### Columns with Bloom Filters

| Column | Primitive Type | Logical Type | Converted Type (deprecated) |
| --- | --- | --- | --- |
| contentHash | `BYTE_ARRAY` | `STRING` | `UTF8` |
| emoji | `BYTE_ARRAY` | `STRING` | `UTF8` |
| fromId | `INT64` | `INT(64, false)` | `UINT_64` |
| inReplyTo | `BYTE_ARRAY` | `STRING` | `UTF8` |
| targetContentHash | `BYTE_ARRAY` | `STRING` | `UTF8` |

## Non-Normative

### Batch Validity and Order

Batch validity is immutable and is usually based (in part) on the validation of the delegation
of authors listed inside the batch to the publisher.
Due to the nature of distributed systems, it is possible that a race condition occurs such that
a user's delegation revocation presents before a Batch that contains a message from that user
via the revoked delegate.
While those individual messages should be considered invalid, a window of time for historical
testing is suggested before considering the entire batch invalid.
This is analogous to the idea of a
[confirmation time](https://en.bitcoin.it/wiki/Confirmation), but only applies to the past
rather than the future.
