---
menu: Batch Publications
name: Publishing
route: /BatchPublications/Publishing
---

# Publishing Batch Publications

Publishing a Batch Publication is how to communicate new Announcements to the network.
Publishing is accomplished via an Ethereum Log Event

## Specification Status

| Version | Status   |
| ------  | -------- |
| 1.0     | Proposed |


## Ethereum Log Event

The event topic for `DSNPBatchPublication` follows the standard Solidity event name to hash standard.
```
0xe63a4904ccacc079f71e52aad2cf99c00a7d4963566562a94d7c07610f1df576 = keccak-256("DSNPBatchPublication(int16,bytes32,string)")
```

### Log Event Data

| field | description | type | indexed |
| ------------- |------------- | ---- | --- |
| `announcementType` | The single announcement type in the given file | int16 | YES
| `fileHash` | [keccak-256](https://en.wikipedia.org/wiki/SHA-3) hash of the batch file | bytes32 | no
| `fileUrl` | URL to retrieve the referenced batch file via an [approved schema](/BatchPublications/Overview#batch-file-retrieval) | string | no

## Publisher Contract Requirements

Contracts that allow for generating `DSNPBatchPublication` are called publishers.
A standard interface is available for use.

| Interface | Required |
|-----------|----------|
| [IPublish](/BatchPublications/Publishing#ipublish-interface) | Required |
| [ERC165](https://eips.ethereum.org/EIPS/eip-165) | Optional |

## IPublish Interface

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
