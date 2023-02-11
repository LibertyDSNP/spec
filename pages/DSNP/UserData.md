# User Data

DSNP stores user-related data of well defined formats associated with a user's DSNP Identifier.
Data may be public or stored in encrypted form.
The [Avro](https://avro.apache.org) schema specification is used to define the binary representation of relevant data types.

## User Data Types

DSNP implementations MUST support the following user data types:

| System Name | Version | Encryption Algorithm | Compression Codec | Avro Object Type |
| --- | --- | --- | --- | --- |
| `publicFollows` | 1.2 | NONE | [`brotli`](https://brotli.org) | [GraphEdge](Graph.md#edges) |
| `privateFollows` | 1.2 | `curve25519xsalsa20poly1305` |  [`brotli`](https://brotli.org) | [GraphEdge](Graph.md#edges) |
| `privateConnections` | 1.2 | `curve25519xsalsa20poly1305` | [`brotli`](https://brotli.org) | [GraphEdge](Graph.md#edges) |
| `privateConnectionPRIds` | 1.2 | NONE | NONE | [PRId](Graph.md#pseudonymous-relationship-identifiers) |

Data for each data type is initially formatted as a stream of Avro objects that should conform to the schema specified.
Avro file- and block-level information (including in-stream schema) is omitted.
The Avro stream is then compressed (or not) and encrypted (or not) as specified.

`curve25519xsalsa20poly1305` (that is, x25519 key exchange, xsalsa20 encryption, and poly1305 message authentication) is the default authenticated encryption algorithm used in the [NaCl](https://nacl.cr.yp.to) ("Salt") library, and its successor [libsodium](https://libsodium.org). In the specification of cryptographic operations below, relevant methods from these libraries are noted. While these specific implementations are not required for DSNP compatibility, they are highly recommended.

## Data Chunks

Because blockchain systems often have specific limits to the amount of data that can be included in a given transaction, operations on user data deal with the data in discrete chunks.
As implementation strategies may vary, implementations MUST define their own maximum chunk size in bytes to be used in the operations described below.

## Entity Tags

To allow for application-layer caching and prevent race conditions between different applications attempting to update the same data, an implementation MUST provide an `etag` (entity tag) value with each chunk fetched, and update this for each replaced chunk.
An implementation MUST fail the Replace User Data Operation if the `etag` values supplied do not match the current `etag` values for all chunks of the specified data type.

## Replace User Data Operation

The Replace User Data Operation takes the following parameters:

* The DSNP User ID of the user who controls the data
  * Implementations MUST ensure that the principal invoking this Operation is this user or a transparent chain of delegation from the user to the principal exists.
* A map containing the set of data types to update, and the data chunks and entity tags for each included data type.

The operation is idempotent.
If the Operation is successful, any previous data associated with the user for each data type included in the input MUST be removed and replaced by the new data.

Data chunks should be generated for each included data type using the following sequence of operations:
* Generate the data records, in Avro binary format, according to the versioned schema.
* Divide the data records into one or more chunks, with each chunk containing a maximum byte count specified by the implementation.
  * Note that the combined chunks constitute a different, and smaller, binary than a complete Avro file, as they exclude the header information, schema, and any block-level metadata.
    Each chunk should start and end with a complete Avro object; in other words, chunk boundaries MUST NOT occur mid-record.
    Applications SHOULD try to include as many records as possible within the byte length limit, but because compression and encryption may alter the byte size versus the raw Avro binary records, they may wish to use a heuristic approach that sometimes produces non-optimal chunks.
* For each chunk generated, the application should then:
  * If the data type requires compression, apply the compression codec noted.
  * If the data type requires encryption,
    * Retrieve the user's active (most recently announced) `keyAgreement` public key, U<sub>public</sub>.
    If no key exists, one should be created and published as an Announcement before invoking the Operation.
    * Create a sealed box, as in the [libsodium](https://doc.libsodium.org/public-key_cryptography/sealed_boxes) function `crypto_box_seal`, using U<sub>public</sub>.
  * Include the previous `etag` value for the chunk. If the chunk is new, `etag` should be `null`.
  If any chunks are to be deleted, they should be included in the input as a chunk object with the existing `etag` and a `null` value for the data field.

If the Operation is invoked successfully it MUST (synchronously) return a new set of `etag` values for each data type replaced, corresponding to the updated state of the data.
Applications should not interpret this response as an indication that the operation was completed and a state change record emitted, as this typically occurs asynchronously.
However, this strategy allows applications to make the optimistic assumption that, in due course, the DSNP system will reflect the intended changes, without needing to wait for asynchronous confirmation.

If, on the other hand, an invocation of Replace User Data is rejected, the application should fetch the most current version of the relevant data with the Get User Data Operation, reapply any intended changes, and retry the operation.

The Replace User Data Operation MUST generate a [User Data Replaced Record](Records.md#user-data-replaced) containing the DSNP User Id and the set of updated user data types (but not the data itself).
If the implementation detects that no change has occurred, it SHOULD omit the relevant unchanged data types from the state change record.

# Get User Data Operation

The Get User Data Operation takes the following parameters:
* The DSNP User Id of the user who controls the data
  * Note: While _writing_ user data is reserved for the user and any delegates, any authenticated principal can read any user's data (though it may be encrypted).
* The user data types (by system name) that should be retrieved.

The operation returns a mapping of user data type to data chunks and entity tags (the same general structure as the input data for Replace User Data), for each requested data type.
If no chunks for a requested data type exist, an implementation MAY omit that data type from the response.

To transform the public data from the output to Avro binary records, a consumer should apply the following algorithm to each data type included:
* Determine the relevant encryption algorithm, compression codec, and object schema from the user data type and version noted.
* For each chunk,
  * If encryption is indicated, decrypt the chunk data using the user's secret key as in the [libsodium](https://doc.libsodium.org/public-key_cryptography/sealed_boxes) function `crypto_box_seal_open`.
  * If compression is required, uncompress the chunk data using the specified codec.
  * Append the chunk to the list of records for the data type.
  * Retain the chunk's `etag` value if needed for any updates.
