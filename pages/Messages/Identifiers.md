---
name: Identifiers
route: /Messages/Identifiers
menu: Messages
---

# Messages Identifiers

## Specification Status

| Version | Status |
---------- | ---------
| 0.1     | Tentative |

## Purpose

1. Describe a means of uniquely identifying DSNP content messages
1. Describe potential extensions of identifiers for the future

## Assumptions

* All assumptions from [DSNP Messages](/Messages/Overview)

## Identifiers

DSNP message identifiers at minimum consist of a string with three parts, a protocol, a user identifier and a content hash, like so:

```
dsnp://0123/456789abcdef0123
```

In this example, `dsnp://` is the protocol indicating that the latest version of this specification should be used.
`0123` is the identifier representing a user as described in the [Identity Registry](/Identity/Registry) specification.
`456789abcdef0123` is the hash of the content as described in the [Messages Serialization](/Messages/Serialization) specification.

### Protocol

The protocol section of an identifier can be used to indicate which version of the DSNP specification should be used to identify content.
If present, any number after the string `dsnp` should indicate the specific version.
For example, `dsnp1.2.1://` would indicate that version 1, subversion 2, patch release 1 of the specification should be used.

If the patch release or subversion number is omitted, the latest available subversion and patch release should be used.
For example, `dsnp2://` would indicate the most up to date subversion and patch release under version 2 of the DSNP should be used.

If no version number is provided at all, i.e. `dsnp://`, then the most recent available version of the spec should be used.

### User Identifier

The user identifier section of the identifier string should adhere to the relevant version of the [Identity Registry](/Identity/Registry) specification.
Generally, this will be a hexadecimal representation of the user's 64 bit registry identifier number.
For example, `2B02` would indicate user number 11,010.

### Content Hash

The content hash section of the identifier string should be a [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the content of the message as stored at the URI provided in the DSNP announcement.
This string should be identical to the `contentHash` field as described in the [Message Overview](/Messages/Overview).

## Optional Features

In addition to the specification above, several extensions of the identifier string may optionally be supported, however support is not yet guaranteed across all implementations.
Each of these extensions should be backward compatible in that clients may ignore the added functionality and treat the provided string like a basic message identifier.

### Alternative Formatting

By default, data sent and received generally throughout the DSNP, specifically including DSNP messages, will be in JSON format.
Optionally, indexers and archivists may choose to translate this JSON data into alternative formats, such as XML or BSON.
To indicate a preferred format, clients may include a format string at the end of a message identifier following a `.` character, like a file format.
However, clients should be aware that their requested format, or any alternative formats at all, may not be supported by the server, in which case the response may be in the default JSON or a not found error.

The following is an example of a identifier specifying a preference for an XML response:

```
dsnp://0123/456789abcdef0123.xml
```

### Additional Request Options

Further options may also be provided to the server at the end of the message identifier in the style of [URL parameters](https://developer.mozilla.org/en-US/docs/Web/API/URL/searchParams), like so:

```
dsnp://0123/456789abcdef0123?includeReplies=true
```

These options are largely dependent on the server implementation and what options the server operator chooses to make available, but in the interest of consistency, the following options are recommended for optional support:

Parameter Name | Potential Values     | Purpose
---------------|----------------------|--------------------------------------------------------------------------------------------------------------
fromBlock      | Any positive integer | Specify the earliest block to begin to searching for matching DSNP messages
toBlock        | Any positive integer | Specify the latest block to begin to searching for matching DSNP messages
timeout        | Any positive integer | Specify the amount of time, in seconds, to spend searching for a matching message before returning not found
includeReplies | `true` or `false`    | Indicate whether or not replies to the current message should be eager loaded
