export type CborValue<T = any> = ReplacedCborValue<T> | T;
export type ReplacedCborValue<T = any> = CborNumber | string | ArrayBuffer | Uint8Array | CborValue<T>[] | CborMap<T> | CborSimple;
/**
 * The tag number `55799`, the self-described tag for CBOR.
 * The serialization of this tag's head is `0xd9d9f7`.
 * @see {@link https://www.rfc-editor.org/rfc/rfc8949.html#section-3.4.6}
 */
export declare const CBOR_SELF_DESCRIBED_TAG = 55799;
export type CborNumber = number | bigint;
export declare const CBOR_STOP_CODE: unique symbol;
export type CborSimple = boolean | null | undefined | typeof CBOR_STOP_CODE;
export declare enum CborSimpleType {
    False = 20,
    True = 21,
    Null = 22,
    Undefined = 23,
    Break = 31
}
export type CborMap<T = any> = {
    [key: string]: CborValue<T>;
} | {
    [key: string | number]: CborValue<T>;
} | {
    [key: string | symbol]: CborValue<T>;
} | {
    [key: string | number | symbol]: CborValue<T>;
};
export declare enum CborMajorType {
    UnsignedInteger = 0,
    NegativeInteger = 1,
    ByteString = 2,
    TextString = 3,
    Array = 4,
    Map = 5,
    Tag = 6,
    Simple = 7
}
export declare const TOKEN_VALUE_MAX = 23;
export declare const ONE_BYTE_MAX = 255;
export declare const TWO_BYTES_MAX = 65535;
export declare const FOUR_BYTES_MAX = 4294967295;
/**
 * The maximum value that can be encoded in 8 bytes: `18446744073709551615n`.
 */
export declare const EIGHT_BYTES_MAX: bigint;
export declare enum CborMinorType {
    Value = 23,
    OneByte = 24,
    TwoBytes = 25,
    FourBytes = 26,
    EightBytes = 27,
    Indefinite = 31
}
