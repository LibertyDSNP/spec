# Serializations

Serialization is how the value should be stringified for signing and for transfer between systems.
Most serializations use outside standards, but some require additional clarifications, provided here.

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

## hexadecimal

Used to represent bytes.

- MUST use 0-9,a-f representation
- MUST be lowercase
- MUST be prefixed with a `0x`
- MUST NOT have spaces or separators
- MUST have two characters per byte in addition to the `0x` characters

| Bytes | Invalid | Valid |
| --- | --- | --- |
| 2 | `0x123` | `0x0123` |
| 2 | `123h` | `0x0123` |
| 2 | `0x0ABC` | `0x0abc` |
| 8 | `0xabc` | `0x0000000000000abc` |
| 32 | `0x3e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e` | `0x00003e34c4325f4461b9355027b314f3eb56d31af549f7da7bd9ef1ce951651e` |
