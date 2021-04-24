---
name: File Format 
route: /Batches/FileFormat
menu: File Format
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

## Assumptions
* All assumptions from [DSNP Messages](/Messages/Overview)

## Details
Parameters for Batch file storage should be chosen with client applications in mind; consumer devices must be able
query, download and sift through downloaded batch files without adversely affecting user experience by way of
long download times, heavy processing requirements which may quickly sap battery power, or by using lots of memory.

This has implications for row group size as well as configuring bloom filters for the batch file.

Since it will be possible to announce multiple batches in one announcement, the announcer can announce more data than
is in a single batch file.

## Why Parquet?
DNSP doesn't need a database; the data is not relational, DSNP messages are not complicated, having just a few key-value pairs. Applications need to know if a given Batch file has any information they are interested in without downloading the file first. This naturally led to the thought of using Bloom filters.

1. Parquet is a **column-oriented format**. Since DSNP Batch Message data will have a very small column-to-row ratio, it makes sense to prefer a column-oriented format.
1. Parquet is a **proven format designed for enterprise level storage and transfer**. It has broad support in cloud storage solutions. 
1. **Bloom filters are already supported** in the Parquet specification, which allows for fast and accurate searching (with caveats for proper configuration).
1. **Amazon S3 support**: we anticipate that Batch Announcers and possibly archivists will store Batch files on Amazon S3. The JavaScript library we have forked and enhanced already had support for retrieving files from an S3 bucket.  Furthermore, Amazon Athena also supports storage in Parquet and its API allows direct querying using a SQL-like syntax.
1. Parquet also **allows references to the same column across files**, which could enable multi-file querying in the future.
1. Parquet **supports compression formats** such as Brötli, which itself is already a browser standard and a demonstrated improvement in compression speed and file size over older formats.
1. Parquet **files can be transferred directly** to clients which can parse the files themselves. No conversion to some serialization format is necessary. This eliminates an entire class of bugs as well as making fetching faster.
1. Parquet **uses schemas** which additionally reduces file size.

## Rejected alternatives
1. Cassandra, RocksDB, CouchDB, MongoDB, HBASE were rejected since DSNP data doesn't need a database for storage nor the overhead of one.
1. JSON, BSON and SQLite, while used for storage, are intended for serialization. They are schemaless, which means lots of redundant information and therefore a larger size than formats with a schema.

## Serialization
Using the same format/scheme for storage and transfer eliminates the need to choose a separate transfer format. The benchmark results we found studied numerous serialization schemes and found that using a good compression scheme all but eliminates the differences between string and binary formats. The takeaway here is to be sure to consider compression schemes carefully for Parquet files in the future.
