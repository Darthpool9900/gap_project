# CBOR encoder/decoder

[![NPM Version](https://img.shields.io/npm/v/%40dfinity%2Fcbor)](https://www.npmjs.com/package/@dfinity/cbor)
![Libraries.io dependency status for latest release](https://img.shields.io/librariesio/release/npm/%40dfinity%2Fcbor)

[![Test](https://github.com/dfinity/cbor-js/actions/workflows/test.yml/badge.svg)](https://github.com/dfinity/cbor-js/actions/workflows/test.yml)
[![Lint](https://github.com/dfinity/cbor-js/actions/workflows/lint.yml/badge.svg)](https://github.com/dfinity/cbor-js/actions/workflows/lint.yml)

A small implementation of Concise Binary Object Representation (CBOR) in pure JavaScript.

> Note: this package is not 100% compatible with the [CBOR specification](https://www.rfc-editor.org/rfc/rfc8949.html). See the [Not implemented](#not-implemented) section for more details.

## Installation

Using `npm`:

```bash
npm install @dfinity/cbor
```

Using `pnpm`:

```bash
pnpm add @dfinity/cbor
```

Using `yarn`:

```bash
yarn add @dfinity/cbor
```

## Usage

Simple:

```ts
import { encode, decode } from '@dfinity/cbor';

const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
const decoded = decode(encoded); // returns `true`
```

With replacer/reviver:

```ts
import { encode, decode, type Replacer, type Reviver } from '@dfinity/cbor';

const value = { a: 1, b: 2 };

// Encoding with replacer
const replacer: Replacer = val => (typeof val === 'number' ? val * 2 : val);
const result = encode(value, replacer);
decode(result); // { a: 2, b: 4 }

// Decoding with reviver
const bytes = encode(value);
const reviver: Reviver = val => (typeof val === 'number' ? val * 2 : val);
decode(bytes, reviver); // { a: 2, b: 4 }
```

## API

<!-- TSDOC_START -->

## :toolbox: Functions

- [decode](#gear-decode)
- [encode](#gear-encode)
- [encodeWithSelfDescribedTag](#gear-encodewithselfdescribedtag)

### :gear: decode

Decodes a CBOR byte array into a value.
See {@link Reviver} for more information.

| Function | Type                                                                                                    |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `decode` | `<T extends unknown = any>(input: Uint8Array<ArrayBufferLike>, reviver?: Reviver<T> or undefined) => T` |

Parameters:

- `input`: - The CBOR byte array to decode.
- `reviver`: - A function that can be used to manipulate the decoded value.

Examples:

Simple

```ts
const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
const decoded = decode(encoded); // returns `true`
```

Reviver

```ts
const bytes = ...; // Uint8Array corresponding to the CBOR encoding of `{ a: 1, b: 2 }`
const reviver: Reviver = val => (typeof val === 'number' ? val * 2 : val);
decode(bytes, reviver); // returns `{ a: 2, b: 4 }`
```

### :gear: encode

Encodes a value into a CBOR byte array.

| Function | Type                                                                                                 |
| -------- | ---------------------------------------------------------------------------------------------------- |
| `encode` | `<T = any>(value: CborValue<T>, replacer?: Replacer<T> or undefined) => Uint8Array<ArrayBufferLike>` |

Parameters:

- `value`: - The value to encode.
- `replacer`: - A function that can be used to manipulate the input before it is encoded.

Examples:

Simple

```ts
const value = true;
const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
```

Replacer

```ts
const replacer: Replacer = val => (typeof val === 'number' ? val * 2 : val);
encode({ a: 1, b: 2 }, replacer); // returns the Uint8Array corresponding to the CBOR encoding of `{ a: 2, b: 4 }`
```

### :gear: encodeWithSelfDescribedTag

Encodes a value into a CBOR byte array (same as {@link encode}), but prepends the self-described CBOR tag (55799).

| Function                     | Type                                                                                                 |
| ---------------------------- | ---------------------------------------------------------------------------------------------------- |
| `encodeWithSelfDescribedTag` | `<T = any>(value: CborValue<T>, replacer?: Replacer<T> or undefined) => Uint8Array<ArrayBufferLike>` |

Parameters:

- `value`: - The value to encode.
- `replacer`: - A function that can be used to manipulate the input before it is encoded.

Examples:

```ts
const value = true;
const encoded = encodeWithSelfDescribedTag(value); // returns the Uint8Array [217, 217, 247, 245] (which is "D9D9F7F5" in hex)
```

## :wrench: Constants

- [CBOR_SELF_DESCRIBED_TAG](#gear-cbor_self_described_tag)
- [CBOR_STOP_CODE](#gear-cbor_stop_code)
- [TOKEN_VALUE_MAX](#gear-token_value_max)
- [ONE_BYTE_MAX](#gear-one_byte_max)
- [TWO_BYTES_MAX](#gear-two_bytes_max)
- [FOUR_BYTES_MAX](#gear-four_bytes_max)
- [EIGHT_BYTES_MAX](#gear-eight_bytes_max)

### :gear: CBOR_SELF_DESCRIBED_TAG

The tag number `55799`, the self-described tag for CBOR.
The serialization of this tag's head is `0xd9d9f7`.

| Constant                  | Type    |
| ------------------------- | ------- |
| `CBOR_SELF_DESCRIBED_TAG` | `55799` |

### :gear: CBOR_STOP_CODE

| Constant         | Type            |
| ---------------- | --------------- |
| `CBOR_STOP_CODE` | `unique symbol` |

### :gear: TOKEN_VALUE_MAX

| Constant          | Type |
| ----------------- | ---- |
| `TOKEN_VALUE_MAX` | `23` |

### :gear: ONE_BYTE_MAX

| Constant       | Type  |
| -------------- | ----- |
| `ONE_BYTE_MAX` | `255` |

### :gear: TWO_BYTES_MAX

| Constant        | Type    |
| --------------- | ------- |
| `TWO_BYTES_MAX` | `65535` |

### :gear: FOUR_BYTES_MAX

| Constant         | Type         |
| ---------------- | ------------ |
| `FOUR_BYTES_MAX` | `4294967295` |

### :gear: EIGHT_BYTES_MAX

The maximum value that can be encoded in 8 bytes: `18446744073709551615n`.

| Constant          | Type     |
| ----------------- | -------- |
| `EIGHT_BYTES_MAX` | `bigint` |

## :factory: DecodingError

## :factory: EncodingError

## :nut_and_bolt: Enum

- [CborSimpleType](#gear-cborsimpletype)
- [CborMajorType](#gear-cbormajortype)
- [CborMinorType](#gear-cborminortype)

### :gear: CborSimpleType

| Property    | Type   | Description |
| ----------- | ------ | ----------- |
| `False`     | `0x14` |             |
| `True`      | `0x15` |             |
| `Null`      | `0x16` |             |
| `Undefined` | `0x17` |             |
| `Break`     | `0x1f` |             |

### :gear: CborMajorType

| Property          | Type | Description |
| ----------------- | ---- | ----------- |
| `UnsignedInteger` | `0`  |             |
| `NegativeInteger` | `1`  |             |
| `ByteString`      | `2`  |             |
| `TextString`      | `3`  |             |
| `Array`           | `4`  |             |
| `Map`             | `5`  |             |
| `Tag`             | `6`  |             |
| `Simple`          | `7`  |             |

### :gear: CborMinorType

| Property     | Type | Description |
| ------------ | ---- | ----------- |
| `Value`      | `23` |             |
| `OneByte`    | `24` |             |
| `TwoBytes`   | `25` |             |
| `FourBytes`  | `26` |             |
| `EightBytes` | `27` |             |
| `Indefinite` | `31` |             |

<!-- TSDOC_END -->

## Not implemented

- Custom tag encoding/decoding.
  - Custom tags allow for encoding and decoding of custom types.
  - We currently don't use this custom tags (although we probably should).
  - Since we don't directly encode developer provided data (that's encoded by Candid) then we can safely say we don't need the feature.
- Unit tests for text/byte strings with a length that does not fit in four bytes or less.
  - The "length" of the text string can be encoded with up to 8 bytes, which means the largest possible string length is `18,446,744,073,709,551,615`. The tests cover a string length that's encoded up to four 4 bytes, longer than this and the tests became extremely slow.
  - The largest number in 4 bytes is `2,147,483,647` which would represent the length of an ~2gb string, which is not possible to fit into a single IC message anyway.
- Indeterminite length encoding for text and byte strings
  - To encode a string length longer than the previously mentioned 8 byte limit, a string can be encoded with an "indeterminate" length.
  - Similar to the previous point, this would be impractical for the IC due to message limits.

## Contributing

Check out the [contribution guidelines](./.github/CONTRIBUTING.md).

### Setup

- Install [pnpm](https://pnpm.io/)
- Install [commitizen](https://commitizen-tools.github.io/commitizen/)
- Install [pre-commit](https://pre-commit.com/)
- Install dependencies:
  ```bash
  pnpm install
  ```

### Running tests

```bash
pnpm test
```

### Formatting

```bash
pnpm format
```

### Generating documentation

We use [tsdoc-markdown](https://github.com/peterpeterparker/tsdoc-markdown) to generate the documentation.

To update the documentation in the `README.md` file, run:

```bash
pnpm tsdoc
```

## License

This project is licensed under the [Apache License 2.0](./LICENSE).
