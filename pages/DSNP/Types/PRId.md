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

<table>
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>

[`crypto_box_keypair`](https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation)`(&a_public, &a_secret);`

[`crypto_box_keypair`](https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#key-pair-generation)`(&b_public, &b_secret);`

</td><td>

<code>(A<sub>public</sub>, A<sub>secret</sub>) &#8592; <abbr title="Key Generation Function">KGF</abbr>()</code>

<code>(B<sub>public</sub>, B<sub>secret</sub>) &#8592; <abbr title="Key Generation Function">KGF</abbr>()</code>

</td></tr></table>

2. When Alice wants to interact with Bob, she looks up Bob's public key and performs an X25519 Elliptic-curve Diffie-Hellman key exchange operation using her secret key and Bob's public key, generating a root shared secret.

<table>
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>

[`crypto_box_beforenm`](https://libsodium.gitbook.io/doc/public-key_cryptography/authenticated_encryption#precalculation-interface)`(&root_shared_secret, b_public, a_secret);`

</td><td>

<code>RootSharedSecret<sub>AB</sub> &#8592; <abbr title="Elliptic-curve Diffie-Hellman">ECDH</abbr>(B<sub>public</sub>, A<sub>secret</sub>)</code>

</td></tr></table>

3. Alice derives a context-specific subkey <code>CtxSharedSecret<sub>Bob</sub></code> from the shared secret `RootSharedSecret` as the master key, Bob's DSNP User Id as the 64-bit key identifier, and the ASCII encoding of the [PRId Context](#contexts) string (`"PRIdCtx0"` for connections).

<table>
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>

[`crypto_kdf_derive_from_key`](https://libsodium.gitbook.io/doc/key_derivation)

<code>(ctx_shared_secret,
  32,
  b_user_id,
  "PRIdCtx0",
  root_shared_secret);</code>

</td><td>

<code>CtxSharedSecret<sub>A→B</sub> = Blake2b<sub>256</sub>(
  key=RootSharedSecret<sub>AB</sub>,
  message={},
  salt=UserId<sub>B</sub> || {0}, 
  personal="PRIdCtx0" || {0})</code>

</td></tr></table>

4. Alice uses Bob's DSNP User Id to form a 8-byte little-endian message.
Alice encrypts this message using [XSalsa20](http://cr.yp.to/snuffle/xsalsa-20110204.pdf) with the PRId key <code>CtxSharedSecret<sub>A→B</sub></code> and a nonce of her own User Id (little-endian) followed by 16 zero bytes.

<table>
<tr><th>Libsodium</th><th>Algorithm</th></tr>
<tr><td>

<code>char nonce[24] = {0};
int i;
for (i = 0; i < 8; i++) {
 nonce[i] = (user_id_a >> (i*8)) & 0xff;
}
</code>

[`crypto_secretbox_detached`](https://libsodium.gitbook.io/doc/secret-key_cryptography/secretbox#detached-mode)
<code>(&prid,
  &mac_unused,
  user_id_b,
  8,
  nonce,
  ctx_shared_secret);</code>

* <i>Alice's act of publishing provides authentication, so the <abbr title="Message Authentication Code">MAC</abbr> is unused.</i>

</td><td>

<code>Msg<sub>A→B</sub> = UserId<sub>B</sub></code>

<code>Nonce<sub>A→B</sub> = Padded24BytesLE(UserId<sub>A</sub>)</code>

<code>PRId<sub>A→B,C</sub> = XSalsa20(Msg<sub>A→B</sub>, CtxSharedSecret<sub>A→B</sub>, Nonce<sub>A→B</sub>)</code>

</td></tr></table>

6. Alice adds the generated PRId to the relevant list of PRIds and publishes an updated copy via the [Replace User Data](../UserData.md#replace-user-data-operation) Operation.

Similarly, Bob can calculate the same root shared secret `RootSharedSecret` using <code>Alice<sub>public</sub></code> and <code>Bob<sub>secret</sub></code> and derive the same <code>PRId<sub>A→B,C</sub></code> in order to check if it is in Alice's published PRIds.
Bob can also derive the PRId subkey for Alice's DSNP User Id and encrypt Alice's User Id, using his own as the nonce, to generate the Bob-to-Alice PRId (<code>PRId<sub>B→A,C</sub></code>), and then publish it to his own list, if desired.

If Alice or Bob wants to prove to a third party that their PRIds are in each other's PRId list, they can provide the third party with their own subkey <code>CtxSharedSecret<sub>A→B</sub></code> or <code>CtxSharedSecret<sub>B→A</sub></code>.
The third party can repeat the encryption step using Alice and Bob's User Ids, and check that the output is present in the published set of PRIds. The root shared secret `RootSharedSecret` (used as a master key in this algorithm) should _not_ be divulged.
