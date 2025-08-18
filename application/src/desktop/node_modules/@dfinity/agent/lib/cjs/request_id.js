"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashValue = hashValue;
exports.requestIdOf = requestIdOf;
exports.hashOfMap = hashOfMap;
const candid_1 = require("@dfinity/candid");
const errors_ts_1 = require("./errors.js");
const buffer_ts_1 = require("./utils/buffer.js");
const utils_1 = require("@noble/hashes/utils");
const sha2_1 = require("@noble/hashes/sha2");
/**
 *
 * @param value unknown value
 * @returns Uint8Array
 */
function hashValue(value) {
    if (typeof value === 'string') {
        return hashString(value);
    }
    else if (typeof value === 'number') {
        return (0, sha2_1.sha256)((0, candid_1.lebEncode)(value));
    }
    else if (value instanceof Uint8Array || ArrayBuffer.isView(value)) {
        return (0, sha2_1.sha256)((0, buffer_ts_1.uint8FromBufLike)(value));
    }
    else if (Array.isArray(value)) {
        const vals = value.map(hashValue);
        return (0, sha2_1.sha256)((0, utils_1.concatBytes)(...vals));
    }
    else if (value && typeof value === 'object' && value._isPrincipal) {
        return (0, sha2_1.sha256)(value.toUint8Array());
    }
    else if (typeof value === 'object' &&
        value !== null &&
        typeof value.toHash === 'function') {
        return hashValue(value.toHash());
        // TODO This should be move to a specific async method as the webauthn flow required
        // the flow to be synchronous to ensure Safari touch id works.
        // } else if (value instanceof Promise) {
        //   return value.then(x => hashValue(x));
    }
    else if (typeof value === 'object') {
        return hashOfMap(value);
    }
    else if (typeof value === 'bigint') {
        // Do this check much later than the other bigint check because this one is much less
        // type-safe.
        // So we want to try all the high-assurance type guards before this 'probable' one.
        return (0, sha2_1.sha256)((0, candid_1.lebEncode)(value));
    }
    throw errors_ts_1.InputError.fromCode(new errors_ts_1.HashValueErrorCode(value));
}
const hashString = (value) => {
    const encoded = new TextEncoder().encode(value);
    return (0, sha2_1.sha256)(encoded);
};
/**
 * Get the RequestId of the provided ic-ref request.
 * RequestId is the result of the representation-independent-hash function.
 * https://sdk.dfinity.org/docs/interface-spec/index.html#hash-of-map
 * @param request - ic-ref request to hash into RequestId
 */
function requestIdOf(request) {
    return hashOfMap(request);
}
/**
 * Hash a map into a Uint8Array using the representation-independent-hash function.
 * https://sdk.dfinity.org/docs/interface-spec/index.html#hash-of-map
 * @param map - Any non-nested object
 * @returns Uint8Array
 */
function hashOfMap(map) {
    const hashed = Object.entries(map)
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => {
        const hashedKey = hashString(key);
        const hashedValue = hashValue(value);
        return [hashedKey, hashedValue];
    });
    const traversed = hashed;
    const sorted = traversed.sort(([k1], [k2]) => {
        return (0, candid_1.compare)(k1, k2);
    });
    const concatenated = (0, utils_1.concatBytes)(...sorted.map(x => (0, utils_1.concatBytes)(...x)));
    const result = (0, sha2_1.sha256)(concatenated);
    return result;
}
//# sourceMappingURL=request_id.js.map