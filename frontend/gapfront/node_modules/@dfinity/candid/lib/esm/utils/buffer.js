/**
 * Concatenate multiple Uint8Arrays.
 * @param uint8Arrays The Uint8Arrays to concatenate.
 */
export function concat(...uint8Arrays) {
    const result = new Uint8Array(uint8Arrays.reduce((acc, curr) => acc + curr.byteLength, 0));
    let index = 0;
    for (const b of uint8Arrays) {
        result.set(b, index);
        index += b.byteLength;
    }
    return result;
}
/**
 * A class that abstracts a pipe-like Uint8Array.
 */
export class PipeArrayBuffer {
    /**
     * Save a checkpoint of the reading view (for backtracking)
     */
    save() {
        return this._view;
    }
    /**
     * Restore a checkpoint of the reading view (for backtracking)
     * @param checkPoint a previously saved checkpoint
     */
    restore(checkPoint) {
        if (!(checkPoint instanceof Uint8Array)) {
            throw new Error('Checkpoint must be a Uint8Array');
        }
        this._view = checkPoint;
    }
    /**
     * Creates a new instance of a pipe
     * @param buffer an optional buffer to start with
     * @param length an optional amount of bytes to use for the length.
     */
    constructor(buffer, length = buffer?.byteLength || 0) {
        if (buffer && !(buffer instanceof Uint8Array)) {
            try {
                buffer = uint8FromBufLike(buffer);
            }
            catch {
                throw new Error('Buffer must be a Uint8Array');
            }
        }
        if (length < 0 || !Number.isInteger(length)) {
            throw new Error('Length must be a non-negative integer');
        }
        if (buffer && length > buffer.byteLength) {
            throw new Error('Length cannot exceed buffer length');
        }
        this._buffer = buffer || new Uint8Array(0);
        this._view = new Uint8Array(this._buffer.buffer, 0, length);
    }
    get buffer() {
        // Return a copy of the buffer.
        return this._view.slice();
    }
    get byteLength() {
        return this._view.byteLength;
    }
    /**
     * Read `num` number of bytes from the front of the pipe.
     * @param num The number of bytes to read.
     */
    read(num) {
        const result = this._view.subarray(0, num);
        this._view = this._view.subarray(num);
        return result.slice();
    }
    readUint8() {
        if (this._view.byteLength === 0) {
            return undefined;
        }
        const result = this._view[0];
        this._view = this._view.subarray(1);
        return result;
    }
    /**
     * Write a buffer to the end of the pipe.
     * @param buf The bytes to write.
     */
    write(buf) {
        if (!(buf instanceof Uint8Array)) {
            throw new Error('Buffer must be a Uint8Array');
        }
        const offset = this._view.byteLength;
        if (this._view.byteOffset + this._view.byteLength + buf.byteLength >= this._buffer.byteLength) {
            // Alloc grow the view to include the new bytes.
            this.alloc(buf.byteLength);
        }
        else {
            // Update the view to include the new bytes.
            this._view = new Uint8Array(this._buffer.buffer, this._view.byteOffset, this._view.byteLength + buf.byteLength);
        }
        this._view.set(buf, offset);
    }
    /**
     * Whether or not there is more data to read from the buffer
     */
    get end() {
        return this._view.byteLength === 0;
    }
    /**
     * Allocate a fixed amount of memory in the buffer. This does not affect the view.
     * @param amount A number of bytes to add to the buffer.
     */
    alloc(amount) {
        if (amount <= 0 || !Number.isInteger(amount)) {
            throw new Error('Amount must be a positive integer');
        }
        // Add a little bit of exponential growth.
        const b = new Uint8Array(((this._buffer.byteLength + amount) * 1.2) | 0);
        const v = new Uint8Array(b.buffer, 0, this._view.byteLength + amount);
        v.set(this._view);
        this._buffer = b;
        this._view = v;
    }
}
/**
 * Returns a true Uint8Array from an ArrayBufferLike object.
 * @param bufLike a buffer-like object
 * @returns Uint8Array
 */
export function uint8FromBufLike(bufLike) {
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
 *
 * @param u1 uint8Array 1
 * @param u2 uint8Array 2
 * @returns number - negative if u1 < u2, positive if u1 > u2, 0 if u1 === u2
 */
export function compare(u1, u2) {
    if (u1.byteLength !== u2.byteLength) {
        return u1.byteLength - u2.byteLength;
    }
    for (let i = 0; i < u1.length; i++) {
        if (u1[i] !== u2[i]) {
            return u1[i] - u2[i];
        }
    }
    return 0;
}
/**
 * Checks two uint8Arrays for equality.
 * @param u1 uint8Array 1
 * @param u2 uint8Array 2
 * @returns boolean
 */
export function uint8Equals(u1, u2) {
    return compare(u1, u2) === 0;
}
/**
 * Helpers to convert a Uint8Array to a DataView.
 * @param uint8 Uint8Array
 * @returns DataView
 */
export function uint8ToDataView(uint8) {
    if (!(uint8 instanceof Uint8Array)) {
        throw new Error('Input must be a Uint8Array');
    }
    return new DataView(uint8.buffer, uint8.byteOffset, uint8.byteLength);
}
//# sourceMappingURL=buffer.js.map