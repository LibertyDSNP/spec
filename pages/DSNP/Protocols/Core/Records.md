# State Change Records

State Change Records constitute the observable output of a DSNP system.
Implementations MUST specify how applications can translate implementation-specific output into State Change Records.

Each Record is associated with a Transaction Identifier, which allows [Operations](Operations.md) to be asynchronously associated with their results.

Records consists of one or more fields.

<!-- Raw HTML is required to do rowspans -->
<div class="table-wrapper">
<table>
<thead>

<tr>
<th align="left">Record Type</th>
<th>Field</th>
<th>Field Data Type</th>
</tr>

</thead>
<tbody>

<tr>
<td rowspan="2"><a id="identifier-creation">Identifier Creation Record</a></td>
<td>Control Key</td>
<td><i>Implementation dependent</i></td>
</tr>
<tr>
<td>Control Key Ownership Proof</td>
<td><i>Implementation dependent</i></td>
</tr>

<tr>
<td rowspan="1"><a id="identifier-retirement">Identifier Retirement Record</a></td>
<td>User's Identifier</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>

<tr>
<td rowspan="4"><a id="delegation-definition">Delegation Definition Record</a></td>
<td>User Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Delegate Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Allowed Announcement Types</td>
<td>List of <a href="Announcements.html#announcement-types">enum values</a></td>
</tr>
<tr>
<td>Allowed User Data Types</td>
<td>List of <a href="UserData.html">enum values</a></td>
</tr>

<tr>
<td rowspan="2"><a id="delegation-revocation">Delegation Revocation Record</a></td>
<td>User Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Delegate Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>

<tr>
<td rowspan="3"><a id="control-key-addition">Control Key Addition Record</a></td>
<td>User Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Key</td>
<td><i>Implementation dependent</i></td>
</tr>
<tr>
<td>Key Ownership Proof</td>
<td><i>Implementation dependent</i></td>
</tr>

<tr>
<td rowspan="2"><a id="control-key-removal">Control Key Removal Record</a></td>
<td>User Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Key</td>
<td><i>Implementation dependent</i></td>
</tr>

<tr>
<td rowspan="1"><a id="announcement-published">Announcement Published Record</a></td>
<td>Announcement</td>
<td><i>One of the types described in</i> <a href="Announcements.html">Announcements</a></td>
</tr>

<tr>
<td rowspan="4"><a id="batch-published">Batch Published Record</a></td>
<td>From Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>Announcement Type</td>
<td><a href="Announcements.html#announcement-types">Enum value</a></td>
</tr>
<tr>
<td>URL</td>
<td>String</td>
</tr>
<tr>
<td>Content Hash</td>
<td><a href="Identifiers.html#dsnp-content-hash">DSNP Content Hash</a></td>
</tr>

<tr>
<td rowspan="1"><a id="failure">Failure Record</a></td>
<td>Message</td>
<td>String</td>
</tr>

<tr>
<td rowspan="2"><a id="user-data-replaced">User Data Replaced Record</a></td>
<td>User Id</td>
<td><a href="Identifiers.html#dsnp-user-id">DSNP User Id</a></td>
</tr>
<tr>
<td>User Data Types</td>
<td>Set of <a href="UserData.html#user-data-types">User Data Types</a></td>
</tr>

</tbody>
</table>
</div>
