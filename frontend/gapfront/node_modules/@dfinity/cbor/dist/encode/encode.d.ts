import { CborValue, ReplacedCborValue } from '../cbor-value';
/**
 * A function that can be used to manipulate the input before it is encoded.
 * See {@link encode} for more information.
 * @param value - The value to manipulate.
 * @param key - The current key in a map, or the current stringified index in an array.
 * @returns The manipulated value.
 */
export type Replacer<T = any> = (value: CborValue<T>, key?: string) => ReplacedCborValue<T>;
/**
 * Encodes a value into a CBOR byte array.
 * @param value - The value to encode.
 * @param replacer - A function that can be used to manipulate the input before it is encoded.
 * @returns The encoded value.
 *
 * @example Simple
 * ```ts
 * const value = true;
 * const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
 * ```
 *
 * @example Replacer
 * ```ts
 * const replacer: Replacer = val => (typeof val === 'number' ? val * 2 : val);
 * encode({ a: 1, b: 2 }, replacer); // returns the Uint8Array corresponding to the CBOR encoding of `{ a: 2, b: 4 }`
 * ```
 */
export declare function encode<T = any>(value: CborValue<T>, replacer?: Replacer<T>): Uint8Array;
/**
 * Encodes a value into a CBOR byte array (same as {@link encode}), but prepends the self-described CBOR tag (55799).
 * @param value - The value to encode.
 * @param replacer - A function that can be used to manipulate the input before it is encoded.
 * @returns The encoded value with the self-described CBOR tag.
 *
 * @example
 * ```ts
 * const value = true;
 * const encoded = encodeWithSelfDescribedTag(value); // returns the Uint8Array [217, 217, 247, 245] (which is "D9D9F7F5" in hex)
 * ```
 */
export declare function encodeWithSelfDescribedTag<T = any>(value: CborValue<T>, replacer?: Replacer<T>): Uint8Array;
