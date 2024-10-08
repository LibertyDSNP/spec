# Batch Publications

A Batch Publication is an [Apache Parquet](https://github.com/apache/parquet-format) file with a collection of [Announcements](Announcements.md).

## Implementation Requirements

### Discoverable

Implementations MUST have publicly discoverable Batch Publications.

### Validity

Implementations MUST be able to validate Parquet file contents.
Validity MUST be immutable.

### Historical

Implementations MUST retain proof of existence of a Batch Publication.

### Transparent Chain of Delegation

All Announcements in a Batch file MUST be able to be proven to be from or have a chain of delegation to the publisher of the Batch.


## File Requirements

Batch files are stored and transferred in Apache Parquet format.

- Batch files MUST match the spec for a single [Announcement Type](Announcements.md).
- Batch files MUST have Bloom filters set in accordance with the Announcement Type Spec.
- Batch files MUST have NO MORE THAN 128*1024 rows.

### Bloom Filter

- A Bloom filter MUST be a [Split Block Bloom filter](https://github.com/apache/parquet-format/blob/apache-parquet-format-2.9.0/BloomFilter.md).
- The false-positive rate MUST be 0.001.

Calculation for filter bits is different and is nearly a factor of 10 lower than for a standard Bloom filter:
128*1024 rows with a 0.001 false-positive rate results in around 29,000 bits for a Split Block Bloom filter.

Bloom filters are ONLY added to some fields.
See also [Announcement Types](Announcements.md).

#### Columns with Bloom Filters

| Column | Primitive Type | Logical Type | Converted Type (deprecated) |
| ------ | ---- | ---- | --- |
| contentHash | `BYTE_ARRAY` | `STRING` | `UTF8` |
| emoji | `BYTE_ARRAY` | `STRING` | `UTF8` |
| fromId | `INT64` | `INT(64, false)` | `UINT_64` |
| inReplyTo | `BYTE_ARRAY` | `STRING` | `UTF8` |
| targetContentHash | `BYTE_ARRAY` | `STRING` | `UTF8` |

## Non-Normative

### Design Requirements

Batch files need to be quickly and easily searchable.
Minimal storage size and fast, simple querying are preferred over guarantees of no false positives or advanced data manipulation and column relationships.
The files are parseable by client applications, web views, or browsers running pure JavaScript without needing to convert the format.

Applications need to know if a given Batch file has any information of interest without downloading the file first.

### Why Parquet?

1. Parquet is a **column-oriented format**. Since DSNP Batch Message data will have a very small column-to-row ratio compared to a typical web application database, it makes sense to prefer a column-oriented format.
1. Parquet format **has been field tested under extreme network conditions**. It has broad support in cloud storage solutions, with libraries in multiple languages.
1. **Bloom filters are already supported** in the Parquet specification, which allows for fast and accurate searching (with caveats for proper configuration).
1. **Amazon S3 support**: We anticipate that some Batch Announcers (and possibly Archivists) will store Batch files on Amazon S3. Amazon Athena also supports storage in Parquet, and its API supports SQL-like queries.
1. Parquet also **allows references to the same column across files**, which could enable multi-file querying in the future.
1. Parquet **supports compression formats** such as Brötli, which is already a browser standard and offers a demonstrated improvement in compression speed and file size over older formats.
1. Parquet **files can be transferred directly** to clients, which can parse the files in the app or browser. No conversion to a serialization format is necessary. This eliminates an entire class of bugs and makes both fetching and querying faster.
1. Parquet **uses schemas**, which additionally reduce file size.

### Rejected Alternatives

1. Cassandra, RocksDB, CouchDB, MongoDB, and HBASE were rejected since DSNP data needs neither a database for storage nor the overhead of one. Each of these was designed for use cases ranging from somewhat different to drastically different from the DSNP network.
1. JSON, BSON, and SQLite, while sometimes used for storage, are intended for serialization. They are schemaless, which results in redundant information and therefore a larger size than formats with schemas. They also don't support Bloom filters; thus, indexing would be required, or new batches would need to be downloaded entirely.  The exception is SQLite, which does support more advanced queries. However, SQLite was designed for in-memory storage.

### Batch Validity and Order

Batch validity is immutable and is usually based (in part) on the validation of the delegation of authors listed inside the batch to the publisher.
Due to the nature of distributed systems, it is possible that a race condition occurs such that a user's delegation revocation presents before a Batch that contains a message from that user via the revoked delegate.
While those individual messages should be considered invalid, a window of time for historical testing is suggested before considering the entire batch invalid.
This is analogous to the idea of a [confirmation time](https://en.bitcoin.it/wiki/Confirmation), but only applies to the past rather than the future.
