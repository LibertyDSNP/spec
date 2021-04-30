---
name: File Format 
route: /Batches/FileFormat
menu: Batch File Format
---

# Batch Storage
Batch files are stored and transferred in Apache Parquet format.

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Draft |

## Purpose
1. Specify the format for storing and transferring Batch files.
1. Specify recommended parameters of the Batch files
1. Describe reasons for the choice of format.

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)

## Details
Parameters for Batch file storage with Bloom filters are be chosen with client applications in mind; consumer devices must be able to query, download and sift through downloaded batch files without adversely affecting user experience by way of
long download times, heavy processing requirements which may quickly sap battery power, or by using lots of memory.

This has implications for row group size as well as configuring Bloom filters for the batch file, however, since it is possible to announce multiple batches in one announcement, the announcer can announce more data than  is in a single batch file.

## Bloom filter, row group size 
Optimal settings are still under investigation, however, the maximum row group size allowed in a Parquet file (128M rows) is far too large for a browser or small client application to handle in JavaScript. We are currently defaulting to 128k rows.  

In Parquet, the Bloom filter type is Split Block; the calculation for filter bits is different and nearly a factor of 10 lower than for the normal Bloom filter.  128k rows with a 0.001 false positive rate results in approximately 29k bits for a Split Block Bloom filter.

Absent benchmarks, the False Positive Rate currently defaults to 0.001.
 
## API
Batch announcements will be done via the SDK API for Announcements.  Bloom filter settings will be set as described above in the SDK.  This may be configurable without changing the source code at a later date.  

## Benchmarks
TBD

## Justifications

### Requirements
Batch files need to be quickly and easily searchable. Minimal storage size and fast, simple querying, identification and transfer are preferred to guarantees of no false positives or advanced data manipulation and column relationships.  The files ideally are parseable by client applications, web views or browsers running pure JavaScript without a need to convert the format.

DNSP doesn't need a database; the data is not relational. The columns:rows ratio will be  at most 1:1000, likely more at 1:10k, within one batch file. Applications need to know if a given Batch file has any information they are interested in without downloading the file first.

### Why Parquet?
1. Parquet is a **column-oriented format**. Since DSNP Batch Message data will have a very small column-to-row ratio compared to a typical web application database, it makes sense to prefer a column-oriented format.
1. Parquet format **has been field-tested under extreme network conditions**. It has broad support in cloud storage solutions, with libraries in multiple languages. 
1. **Bloom filters are already supported** in the Parquet specification, which allows for fast and accurate searching (with caveats for proper configuration).
1. **Amazon S3 support**: we anticipate that some Batch Announcers, and possibly Archivists, will store Batch files on Amazon S3. Amazon Athena also supports storage in Parquet, and its API supports SQL-like queries.
1. Parquet also **allows references to the same column across files**, which could enable multi-file querying in the future.
1. Parquet **supports compression formats** such as Brötli, which itself is already a browser standard and has a demonstrated improvement in compression speed and file size over older formats.
1. Parquet **files can be transferred directly** to clients, which can parse the files in the app or browser. No conversion to some serialization format is necessary. This eliminates an entire class of bugs as well as making both fetching and querying faster.
1. Parquet **uses schemas**, which additionally reduces file size.

### Rejected alternatives
1. Cassandra, RocksDB, CouchDB, MongoDB, HBASE were rejected since DSNP data needs neither a database for storage nor the overhead of one. Each of these was designed for use cases from somewhat to drastically different to DSNP.
1. JSON, BSON and SQLite, while used for storage sometimes, are intended for serialization. They are schemaless, which results in redundant information and therefore a larger size than formats with schemas. They also don't support Bloom filters; instead they'd have to be indexed somehow, or searched each time, which would be impractically slow or essentially mean using a database anyway.  The exception is SQLite, which does support more advanced queries, however, it was designed for in-memory storage.

