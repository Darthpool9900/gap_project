import { CborValue } from '../cbor-value';
/**
 * A function that can be used to manipulate the decoded value.
 * See {@link decode} for more information.
 * @param value - The value to manipulate.
 * @param key - The current key in a map, or the current stringified index in an array.
 * @returns The manipulated value.
 */
export type Reviver<K extends CborValue = CborValue> = (value: K, key?: K extends CborValue ? string : keyof K) => [K] extends [never] ? CborValue : K;
/**
 * Decodes a CBOR byte array into a value.
 * See {@link Reviver} for more information.
 * @param input - The CBOR byte array to decode.
 * @param reviver - A function that can be used to manipulate the decoded value.
 * @returns The decoded value.
 *
 * @example Simple
 * ```ts
 * const value = true;
 * const encoded = encode(value); // returns `Uint8Array [245]` (which is "F5" in hex)
 * const decoded = decode(encoded); // returns `true`
 * ```
 *
 * @example Reviver
 * ```ts
 * const bytes = ...; // Uint8Array corresponding to the CBOR encoding of `{ a: 1, b: 2 }`
 * const reviver: Reviver = val => (typeof val === 'number' ? val * 2 : val);
 * decode(bytes, reviver); // returns `{ a: 2, b: 4 }`
 * ```
 */
export declare function decode<T extends CborValue = CborValue>(input: Uint8Array, reviver?: Reviver<T>): T;
