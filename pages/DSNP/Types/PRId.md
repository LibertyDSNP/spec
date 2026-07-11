# PRId

A Pseudonymous Relationship Identifier is represented by the PRId object type.

In DSNP 1.4, a new, post-quantum approach to PRIds has been introduced.
The prior approach is documented and referred to below as a "Classical PRId", and remains for backward compatibility.
Implementations are encouraged to migrate to the post-quantum algorithm as soon as possible when adopting 1.4, but will require a migration period where both approaches co-exist.

## Serialization

### Classical PRId

PRId object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "PRId",
    "type": "fixed",
    "size": 8,
    "doc": "Pseudonymous Relationship Identifier"
}
```

### Post-Quantum PRId Accumulator

When using the [post-quantum algorithm](#post-quantum-algorithm), the on-chain record is a `PRIdAccumulator` rather than a flat list of `PRId` values.
`PRIdAccumulator` object serialization MUST conform to the following [Avro](https://avro.apache.org) schema:

```
{
    "namespace": "org.dsnp",
    "name": "PRIdAccumulator",
    "type": "record",
    "doc": "On-chain post-quantum PRId commitment: Merkle root over PRId set and content address of encrypted witness data",
    "fields": [
        {
            "name": "merkleRoot",
            "type": {
                "type": "fixed",
                "name": "MerkleRoot",
                "size": 32
            },
            "doc": "SHA2-256 Merkle root over the sorted set of PRId leaf hashes"
        },
        {
            "name": "witnessCid",
            "type": "bytes",
            "doc": "CIDv1 content address of the Parquet witness file containing per-relationship encrypted witness records"
        }
    ]
}
```

### Post-Quantum PRId Witness Schema

The witness Parquet file referenced by `witnessCid` MUST conform to the following schema, with records in randomized order:

```
message PRIdWitnessRecord {
    required binary ciphertext;
}
```

Each `ciphertext` field encodes a self-contained encrypted witness record as described in [Witness Record Encryption](#witness-record-encryption).

## Generation

PRIds are generated cryptographically to represent a relationship from one user to another within a specified context, in a privacy-preserving manner.

### Contexts

The following context values are currently defined for PRIds. All other values are reserved for future use.

| Context Id | Description | Context string | Algorithm |
| --- | --- | --- | --- |
| 0 | Connection | `PRIdCtx0` | [Classical](#classical-algorithm) |
| 1 | Connection (post-quantum) | `PRIdCtx1` | [Post-Quantum](#post-quantum-algorithm) |

### Classical Algorithm

In the following section, the Alice to Bob identifier for context C is called PRId<sub>A→B,C</sub>, and the corresponding Bob to Alice identifier is called PRId<sub>B→A,C</sub>.

A PRId is derived from Alice and Bob's `keyAgreement` key pairs, using a key exchange protocol as follows. To illustrate the cryptographic operations required, the relevant functions from [libsodium](https://libsodium.org) are noted. Sodium is a stable, fast, free, and cross-platform cryptography library, and supports all encryption algorithms used in the DSNP specification out of the box.

Definitions:
* <code>Id<sub>A</sub> = _DSNP User Id of A (little-endian)_</code>
* <code>Id<sub>B</sub> = _DSNP User Id of B (little-endian)_</code>

Algorithm:

1. Both Alice and Bob generate an asymmetric key pair for use with X25519 <abbr title="Elliptic Curve Integrated Encryption Scheme">ECIES</abbr>.
   Each uses the [Replace User Data](../UserData.md#replace-user-data-operation) Operation to publish their generated public key in `keyAgreementPublicKeys`.

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt>
<pre>
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation" target="_blank">crypto_box_keypair</a>(
  &a_public,
  &a_secret);
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation" target="_blank">crypto_box_keypair</a>(
  &b_public, 
  &b_secret);
  </pre>
</tt>

</td><td>
<tt><pre>
(A<sub>public</sub>, A<sub>secret</sub>) &#8592; <abbr title="Key Generation Function">KGF</abbr>()
(B<sub>public</sub>, B<sub>secret</sub>) &#8592; <abbr title="Key Generation Function">KGF</abbr>()
</tt></pre>

</td></tr></table>

2. When Alice wants to interact with Bob, she looks up Bob's public key and performs an X25519 Elliptic-curve Diffie-Hellman key exchange operation using her secret key and Bob's public key, generating a root shared secret.

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt><pre>
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#precalculation-interface" target="_blank">crypto_box_beforenm</a>(
  &root_shared_secret,
  b_public,
  a_secret);
</pre></tt>
</td><td>
<tt><pre>
RootSharedSecret<sub>AB</sub> &#8592;
  <abbr title="Elliptic-curve Diffie-Hellman">ECDH</abbr>(B<sub>public</sub>, A<sub>secret</sub>)
</pre></tt>
</td></tr></table>

3. Alice derives a context-specific subkey <code>CtxSharedSecret<sub>A→B</sub></code> from the shared secret <code>RootSharedSecret<sub>AB</sub></code> as the master key, Bob's DSNP User Id as the 64-bit key identifier, and the ASCII encoding of the [PRId Context](#contexts) string (`"PRIdCtx0"` for connections).

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt><pre>
<a href="https://libsodium.gitbook.io/doc/key_derivation" target="_blank">crypto_kdf_derive_from_key</a>(
  ctx_shared_secret,
  32,
  b_user_id,
  "PRIdCtx0",
  root_shared_secret);
</pre></tt>
</td><td>
<tt><pre>
CtxSharedSecret<sub>A→B,C</sub> &#8592
  Blake2b<sub>256</sub>(
    key = RootSharedSecret<sub>AB</sub>,
    message = {},
    salt = Id<sub>B</sub> || {0},
    personal = "PRIdCtx0" || {0})
</pre></tt>
</td></tr></table>

4. Alice uses Bob's DSNP User Id to form an 8-byte little-endian message.
Alice encrypts this message using [XSalsa20](http://cr.yp.to/snuffle/xsalsa-20110204.pdf) with the PRId key <code>CtxSharedSecret<sub>A→B,C</sub></code> and a nonce of her own User Id (little-endian) followed by 16 zero bytes.

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt><pre>
char nonce[24] = {0};
int i;
for (i = 0; i < 8; i++) {
  nonce[i] = (user_id_a >> (i*8))
    & 0xff;
}<br>
<a href="https://libsodium.gitbook.io/doc/secret-key_cryptography/secretbox#detached-mode" target="_blank">crypto_secretbox_detached</a>(
  &prid,
  &mac_unused,
  user_id_b,
  8,
  nonce,
  ctx_shared_secret);
</pre></tt>

* <i>Alice's act of publishing provides authentication, so the <abbr title="Message Authentication Code">MAC</abbr> is unused.</i>

</td><td>
<tt><pre>
PRId<sub>A→B,C</sub> &#8592
  XSalsa20(
    message = Id<sub>B</sub>,
    key = CtxSharedSecret<sub>A→B,C</sub>,
    nonce = Padded24BytesLE(Id<sub>A</sub>)
  )
</pre></tt>
</td></tr></table>

6. Alice adds the generated PRId to the relevant list of PRIds and publishes an updated copy via the [Replace User Data](../UserData.md#replace-user-data-operation) Operation.

Similarly, Bob can calculate the same root shared secret `RootSharedSecret` using <code>Alice<sub>public</sub></code> and <code>Bob<sub>secret</sub></code> and derive the same <code>PRId<sub>A→B,C</sub></code> in order to check if it is in Alice's published PRIds.
Bob can also derive the PRId subkey for Alice's DSNP User Id and encrypt Alice's User Id, using his own as the nonce, to generate the Bob-to-Alice PRId (<code>PRId<sub>B→A,C</sub></code>), and then publish it to his own list, if desired.

If Alice or Bob wants to prove to a third party that their PRIds are in each other's PRId list, they can provide the third party with their own subkey <code>CtxSharedSecret<sub>A→B,C</sub></code> or <code>CtxSharedSecret<sub>B→A,C</sub></code>.
The third party can repeat the encryption step using Alice and Bob's User Ids, and check that the output is present in the published set of PRIds. The root shared secret `RootSharedSecret` (used as a master key in this algorithm) should _not_ be divulged.

### Test Vector

For the following inputs:

| Input | Value |
| --- | --- |
| <tt>A<sub>secret</tt> | `0xc9432ed5c0c5c24e8a4ff190619893918b4d1265a67d123895023fa7324b43e0` |
| <tt>A<sub>public</sub></tt> | `0x0fea2cafabdc83752be36fa5349640da2c828add0a290df13cd2d8173eb2496f` |
| <tt>B<sub>secret</sub></tt> | `0xdc106e1371293ee9536956e1253f43f8941d4a5c4e40f15968d24b75512b6920` |
| <tt>B<sub>public</sub></tt> | `0xd0d4eb21db1df63369c147e63b2573816dd4b3fe513e95bf87f7ed1835407e62` |
| <tt>Id<sub>A</sub></tt> | `42` |
| <tt>Id<sub>B</sub></tt> | `478` |
| <tt>Context</tt> | `PRIdCtx0` |

An implementation of the PRId generation algorithm should produce the following outputs:

| Output | Value |
| --- | --- |
| <tt>PRId<sub>A→B</sub></tt> | `0xace4d2995b1a829c` |
| <tt>CtxSharedSecret<sub>A→B,C</sub></tt> | `0x37cb1a870f0c1dce06f5116faf145ac2cf7a2f7d30136be4eea70c324932e6d2` |
| <tt>PRId<sub>B→A</sub></tt> | `0x1a53b02a26503600` |
| <tt>CtxSharedSecret<sub>B→A,C</sub></tt> | `0x32c45c49fcfe12f9db60e74fa66416c5a05832c298814d82032a6783a4b1fca0` |

### Post-Quantum Algorithm

The classical algorithm relies on X25519 Diffie-Hellman, which is broken by Shor's algorithm on a quantum computer.
The post-quantum algorithm replaces the ECDH-derived shared secret with a keyed hash function, producing Merkle leaf values that are fully deterministic and regenerable by Alice from her ML-KEM-768 secret key without any interaction.
Because the on-chain record is a Merkle root rather than a list of per-relationship values, the individual leaf values never appear on-chain and carry no size constraint.
Alice delivers each counterparty's leaf value and Merkle membership proof via an ML-KEM-encrypted record published to the content-addressable layer.
The on-chain footprint remains compact: a 32-byte Merkle root plus a content address, stored as a single `PRIdAccumulator` record in [`privateConnectionPRIdsPQ`](../UserData.md#private-connection-prids-pq).

This construction is secure under the hardness of SHA2-256 preimage finding (Merkle tree) and ML-KEM-768 (witness encryption), both of which are [NIST-approved](https://csrc.nist.gov/pubs/fips/203/final) and resistant to known quantum attacks.

#### PRId Master Key

Alice derives a 32-byte PRId master key from her ML-KEM-768 secret key using HKDF with SHA2-256:

<table style="table-layout:fixed">
<tr><th>Algorithm</th></tr>
<tr><td><tt><pre>
k<sub>A</sub> &#8592;
  HKDF-SHA2-256(
    ikm  = A<sub>mlkem,secret</sub>,
    salt = {},
    info = "DSNPPRIdMasterKey")
</pre></tt></td></tr></table>

`k_A` MUST NOT be shared or published. It is re-derivable at any time from Alice's ML-KEM-768 secret key.

#### Merkle Accumulator Construction

1. Compute a 32-byte leaf value for each connection Bob with DSNP User Id <code>Id<sub>B</sub></code> and context string <code>ctx</code>:

<table style="table-layout:fixed">
<tr><th>Algorithm</th></tr>
<tr><td><tt><pre>
L<sub>A&#8594;B,C</sub> &#8592;
  HMAC-SHA2-256(
    key     = k<sub>A</sub>,
    message = LE64(Id<sub>B</sub>) || ctx)
</pre></tt></td></tr></table>

Where `LE64(Id_B)` is Bob's DSNP User Id encoded as an 8-byte little-endian integer and `ctx` is the ASCII context string (e.g., `"PRIdCtx1"` for connections).

2. Sort leaf values in ascending byte order. Pad to the next power of two by appending the fixed constant `SHA2-256("DSNPPRIdPadding")` as needed.

3. Build the Merkle tree bottom-up using domain-separated internal nodes:

<table style="table-layout:fixed">
<tr><th>Algorithm</th></tr>
<tr><td><tt><pre>
N &#8592; SHA2-256(0x01 || left<sub>child</sub> || right<sub>child</sub>)
</pre></tt></td></tr></table>

The `0x01` prefix on internal nodes prevents second-preimage attacks; leaf values are HMAC outputs and are structurally distinct from SHA2-256 internal nodes.

4. The `merkleRoot` is the 32-byte root node value.

#### Witness Record Encryption

For each connection Bob, Alice constructs an encrypted witness record as follows:

1. Compute Bob's Merkle proof path: the sequence of `(sibling_hash: bytes[32], position: 0x00=left | 0x01=right)` pairs needed to reconstruct `merkleRoot` from Bob's leaf.

2. Encode the witness plaintext:

```
witness_plaintext =
    L_A→B,C (32 bytes, the leaf value)
    || proof_length (1 byte, number of proof steps)
    || for each step: sibling_hash (32 bytes) || position (1 byte)
```

3. Encapsulate to Bob's ML-KEM-768 public key and encrypt with AES-256-GCM:

<table style="table-layout:fixed">
<tr><th>Algorithm</th></tr>
<tr><td><tt><pre>
(kem_ct, ss) &#8592;
  ML-KEM-768.Encapsulate(B<sub>mlkem,public</sub>)
nonce &#8592; random 12 bytes
encrypted &#8592;
  AES-256-GCM(
    key     = ss,
    nonce   = nonce,
    message = witness_plaintext)
ciphertext = kem_ct || nonce || encrypted
</pre></tt></td></tr></table>

`kem_ct` is 1,088 bytes; `encrypted` includes a 16-byte GCM authentication tag.
The final `ciphertext` field stored in the Parquet witness file is `kem_ct || nonce || encrypted`.

#### Publishing

1. Generate all witness records as above.
2. Serialize as a Parquet file conforming to the [witness schema](#post-quantum-prid-witness-schema), with records in **randomized order** so that record position reveals no relationship information.
3. Upload to the content-addressable layer (e.g., IPFS) and obtain a `CIDv1`.
4. Publish a single `PRIdAccumulator` Avro record containing `merkleRoot` and `witnessCid` via the [Replace User Data](../UserData.md#replace-user-data-operation) Operation for [`privateConnectionPRIdsPQ`](../UserData.md#private-connection-prids-pq).

Alice SHOULD regenerate and republish the witness file — using a fresh random ordering of records each time — whenever her [`privateConnections`](../UserData.md#private-connections) list changes.
The previous witness file MAY be unpinned from the content-addressable layer once the new accumulator is published on-chain, as the witness data is fully regenerable (see [Regenerability](#regenerability)).

#### Verification by Bob

To verify his relationship is represented in Alice's `privateConnectionPRIdsPQ`:

1. Retrieve Alice's `PRIdAccumulator` from the on-chain User Data.
2. Fetch the Parquet witness file using `witnessCid`.
3. For each record in the witness file, attempt decryption:
   - Extract `kem_ct = ciphertext[0:1088]`
   - `ss = ML-KEM-768.Decapsulate(B_mlkem_secret, kem_ct)` (implicit rejection on failure)
   - Attempt `AES-256-GCM.Decrypt(key=ss, remaining bytes)` — if the GCM tag verifies, the record is Bob's
4. From the decrypted plaintext, extract the leaf value `L_A→B,C` and the Merkle proof path.
5. Verify: apply the proof path to `L_A→B,C` and confirm the result equals Alice's published `merkleRoot`.

Bob SHOULD cache his decrypted witness plaintext to avoid re-scanning the witness file on subsequent checks.

#### Regenerability

The witness Parquet file is fully regenerable by Alice at any time from:
- Her ML-KEM-768 secret key (to re-derive `k_A` and all leaf values)
- Her [`privateConnections`](../UserData.md#private-connections) User Data (to enumerate connection User Ids)
- Each connection's published ML-KEM-768 public key (to re-encrypt witness records)

The witness file therefore does not require the strongest on-chain durability guarantees and is appropriate for the content-addressable layer.
If a witness file becomes unavailable, Alice can regenerate and republish it without any change to the on-chain `merkleRoot`.

#### Third-Party Proofs

To prove to a third party that Bob is in Alice's published connection set, Bob performs two steps:

1. **Prove DSNP identity.** Bob demonstrates that he is the holder of his DSNP User Id, for example by signing a verifier-supplied challenge with his ML-DSA-65 key. This establishes which published ML-KEM-768 public key is his, without reference to any relationship.

2. **Prove Merkle membership.** Bob reveals his leaf value `L_A→B,C` and its Merkle proof path. The third party verifies the proof against Alice's published `merkleRoot`, confirming the leaf is in Alice's accumulator.

The third party accepts the combination: the person who completed step 1 holds a leaf that is included in Alice's published set.

Bob's active participation is required for each proof instance. The leaf value `L_A→B,C` is only accessible to Bob (via his ML-KEM-768 secret key decapsulating the witness record), so no third party can construct or reuse this proof without Bob's involvement.