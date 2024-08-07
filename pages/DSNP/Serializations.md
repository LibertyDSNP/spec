# Serializations

Serialization is how the value should be stringified for signing and for transfer between systems.
Most serializations use outside standards, but some requiring additional clarifications are provided here.

## decimal

Used to represent integers.
Strings are used to avoid issues with different implementations of numbers.

- MUST use 0-9 representation
- MUST NOT have spaces or separators
- MUST be a string

| Invalid | Why | Valid |
| --- | --- | --- |
| `0x123` | Must be decimal | `"291"` |
| 291 | Must be a string | `"291"` |
| `291n` | `BigInt(291)` serialization appends an `n`  | `"291"` |

## base32 multibase

Used to represent bytes.
A base32 multibase string is self-identifying and always begins with the `b` character.
The [Multibase Table](https://github.com/multiformats/multibase?tab=readme-ov-file#multibase-table) describes this encoding as "RFC4648 case-insensitive - no padding".

- MUST use [RFC4648](https://datatracker.ietf.org/doc/html/rfc4648) §6 alphabet `abcdefghijklmnopqrstuvwxyz234567`
- MUST be lowercase
- MUST be prefixed with `b`
- MUST NOT have spaces or separators
- MUST NOT end with or contain padding characters (`=`)

| Invalid | Why | Valid |
| --- | --- | --- |
| `BDYQDUA4T` | Must user lowercase | `bdyqdua4t` |
| `dyqdua4t` | Missing `b` prefix | `bdyqdua4t` |
| `b3og3k0sj` | Wrong alphabet (`base32hex` was used) | `bdyqdua4t` |
| `bdyqdua4t=` | Must not have padding characters | `bdyqdua4t` |
