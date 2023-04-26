# PRId

A Pseudonymous Relationship Identifier is represented by the PRId object type.

## Serialization

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

## Generation

PRIds are generated cryptographically to represent a relationship from one user to another within a specified context, in a privacy-preserving manner.

### Contexts

The following context values are currently defined for PRIds. All other values are reserved for future use.

| Context Id | Description | Context string |
| --- | --- | --- |
| 0 | Connection | `PRIdCtx0` |

### Algorithm

In the following section, the Alice to Bob identifier for context C is called PRId<sub>A→B,C</sub>, and the corresponding Bob to Alice identifier is called PRId<sub>B→A,C</sub>.

A PRId is derived from Alice and Bob's `keyAgreement` key pairs, using a key exchange protocol as follows. To illustrate the cryptographic operations required, the relevant functions from [libsodium](https://libsodium.org) are noted. Sodium is a stable, fast, free, and cross-platform cryptography library, and supports all encryption algorithms used in the DSNP specification out of the box.

Definitions:
* <code>Id<sub>A</sub> = _DSNP User Id of A (little-endian)_</code>
* <code>Id<sub>B</sub> = _DSNP User Id of B (little-endian)_</code>

Algorithm:

1. Both Alice and Bob generate an asymmetric key pair for use with X25519 <abbr title="Elliptic Curve Integrated Encryption Scheme">ECIES</abbr>.
   Each publishes a Public Key Announcement with their generated public key with a `keyType` value of `keyAgreement`.

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt>
<pre>
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation">crypto_box_keypair</a>(
  &a_public,
  &a_secret);
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation">crypto_box_keypair</a>(
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
<a href="https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#precalculation-interface">crypto_box_beforenm</a>(
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

3. Alice derives a context-specific subkey <code>CtxSharedSecret<sub>Bob</sub></code> from the shared secret `RootSharedSecret` as the master key, Bob's DSNP User Id as the 64-bit key identifier, and the ASCII encoding of the [PRId Context](#contexts) string (`"PRIdCtx0"` for connections).

<table style="table-layout:fixed">
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>
<tt><pre>
<a href="https://libsodium.gitbook.io/doc/key_derivation">crypto_kdf_derive_from_key</a>(
  ctx_shared_secret,
  32,
  b_user_id,
  "PRIdCtx0",
  root_shared_secret);
</pre></tt>
</td><td>
<tt><pre>
CtxSharedSecret<sub>A→B</sub> &#8592
  Blake2b<sub>256</sub>(
    key = RootSharedSecret<sub>AB</sub>,
    message = {},
    salt = Id<sub>B</sub> || {0},
    personal = "PRIdCtx0" || {0})
</pre></tt>
</td></tr></table>

4. Alice uses Bob's DSNP User Id to form an 8-byte little-endian message.
Alice encrypts this message using [XSalsa20](http://cr.yp.to/snuffle/xsalsa-20110204.pdf) with the PRId key <code>CtxSharedSecret<sub>A→B</sub></code> and a nonce of her own User Id (little-endian) followed by 16 zero bytes.

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
<a href="https://libsodium.gitbook.io/doc/secret-key_cryptography/secretbox#detached-mode">crypto_secretbox_detached</a>(
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
    key = CtxSharedSecret<sub>A→B</sub>,
    nonce = Padded24BytesLE(Id<sub>A</sub>)
  )
</pre></tt>
</td></tr></table>

6. Alice adds the generated PRId to the relevant list of PRIds and publishes an updated copy via the [Replace User Data](../UserData.md#replace-user-data-operation) Operation.

Similarly, Bob can calculate the same root shared secret `RootSharedSecret` using <code>Alice<sub>public</sub></code> and <code>Bob<sub>secret</sub></code> and derive the same <code>PRId<sub>A→B,C</sub></code> in order to check if it is in Alice's published PRIds.
Bob can also derive the PRId subkey for Alice's DSNP User Id and encrypt Alice's User Id, using his own as the nonce, to generate the Bob-to-Alice PRId (<code>PRId<sub>B→A,C</sub></code>), and then publish it to his own list, if desired.

If Alice or Bob wants to prove to a third party that their PRIds are in each other's PRId list, they can provide the third party with their own subkey <code>CtxSharedSecret<sub>A→B</sub></code> or <code>CtxSharedSecret<sub>B→A</sub></code>.
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
| <tt>CtxSharedSecret<sub>A→B</sub></tt> | `0x37cb1a870f0c1dce06f5116faf145ac2cf7a2f7d30136be4eea70c324932e6d2` |
| <tt>PRId<sub>B→A</sub></tt> | `0x1a53b02a26503600` |
| <tt>CtxSharedSecret<sub>B→A</sub></tt> | `0x32c45c49fcfe12f9db60e74fa66416c5a05832c298814d82032a6783a4b1fca0` |
