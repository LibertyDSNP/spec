# Announcement Publishing

On Ethereum, all [Announcements](../DSNP/Announcements.md) are published via [Batch Publication Files](../DSNP/BatchPublications.md).
Publishing is accomplished via an Ethereum Log Event.

## Ethereum Log Event

The event topic for `DSNPBatchPublication` follows the standard Solidity event name to hash standard.
```
0xe63a4904ccacc079f71e52aad2cf99c00a7d4963566562a94d7c07610f1df576 = keccak-256("DSNPBatchPublication(int16,bytes32,string)")
```

### Log Event Data

| Field | Description | Type | Indexed |
| ------------- |------------- | ---- | --- |
| `announcementType` | The single announcement type in the given file | int16 | YES
| `fileHash` | [keccak-256](https://keccak.team/files/Keccak-submission-3.pdf) hash of the batch file | bytes32 | no
| `fileUrl` | URL to retrieve the referenced batch file via an [approved Schema](#batch-file-retrieval) | string | no

## Batch File Retrieval

- Batch File URLs MUST NOT refer to localhost or any reserved IP addresses as defined in [RFC6890](https://datatracker.ietf.org/doc/html/rfc6890).
- Batch File URLs MUST use one of the supported URL Schemes.

### Supported URL Schemes

| Scheme | Description | Reference | DSNP Version Added |
| ------ |------------ | --------- | ------------------ |
| HTTPS | Hypertext Transfer Protocol Secure | [RFC2818](https://datatracker.ietf.org/doc/html/rfc2818) | 1.0 |

## Ordering

The `DSNPBatchPublication` Ethereum events are ordered by information provided in the transaction.

1. `DSNPBatchPublication` Block number ascending
2. `DSNPBatchPublication` Transaction index ascending
3. `DSNPBatchPublication` Log index ascending
4. DSNP Standard: Order Announcements in a Batch Publication File by row appearance order

## Publisher Contract Requirements

Contracts that allow for generating `DSNPBatchPublication` are called publishers.
A standard interface is available for use.

| Interface | Required |
|-----------|----------|
| [`IPublish`](#ipublish-interface) | Required |
| [ERC165](https://eips.ethereum.org/EIPS/eip-165) | Optional |

## `IPublish` Interface

```solidity
interface IPublish {
    struct Publication {
        int16 announcementType;
        string fileUrl;
        bytes32 fileHash;
    }

    /**
     * @dev Log Event for each batch published
     * @param announcementType The type of Announcement in the batch file
     * @param fileHash The keccak hash of the batch file
     * @param fileUrl A url that resolves to the batch file
     */
    event DSNPBatchPublication(int16 indexed announcementType, bytes32 fileHash, string fileUrl);

    /**
     * @param publications Array of Batch struct to publish
     */
    function publish(Publication[] calldata publications) external;
}
```
