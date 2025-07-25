"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uint8FromBufLike = uint8FromBufLike;
exports.uint8ToBuf = uint8ToBuf;
exports.uint8Equals = uint8Equals;
/**
 * Returns a true Uint8Array from an ArrayBufferLike object.
 * @param bufLike a buffer-like object
 * @returns Uint8Array
 */
function uint8FromBufLike(bufLike) {
    if (!bufLike) {
        throw new Error('Input cannot be null or undefined');
    }
    if (bufLike instanceof Uint8Array) {
        return bufLike;
    }
    if (bufLike instanceof ArrayBuffer) {
        return new Uint8Array(bufLike);
    }
    if (Array.isArray(bufLike)) {
        return new Uint8Array(bufLike);
    }
    if ('buffer' in bufLike) {
        return uint8FromBufLike(bufLike.buffer);
    }
    return new Uint8Array(bufLike);
}
/**
 * Returns a true ArrayBuffer from a Uint8Array, as Uint8Array.buffer is unsafe.
 * @param {Uint8Array} arr Uint8Array to convert
 * @returns ArrayBuffer
 */
function uint8ToBuf(arr) {
    const buf = new ArrayBuffer(arr.byteLength);
    const view = new Uint8Array(buf);
    view.set(arr);
    return buf;
}
/**
 * Compares two Uint8Arrays for equality.
 * @param a The first Uint8Array.
 * @param b The second Uint8Array.
 * @returns True if the Uint8Arrays are equal, false otherwise.
 */
function uint8Equals(a, b) {
    if (a.length !== b.length)
        return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i])
            return false;
    }
    return true;
}
//# sourceMappingURL=buffer.js.map