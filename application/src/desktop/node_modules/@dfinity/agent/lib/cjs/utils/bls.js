"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = void 0;
exports.blsVerify = blsVerify;
const bls12_381_1 = require("@noble/curves/bls12-381");
const utils_1 = require("@noble/hashes/utils");
/**
 *
 * @param pk primary key: Uint8Array
 * @param sig signature: Uint8Array
 * @param msg message: Uint8Array
 * @returns boolean
 */
function blsVerify(pk, sig, msg) {
    const primaryKey = typeof pk === 'string' ? pk : (0, utils_1.bytesToHex)(pk);
    const signature = typeof sig === 'string' ? sig : (0, utils_1.bytesToHex)(sig);
    const message = typeof msg === 'string' ? msg : (0, utils_1.bytesToHex)(msg);
    return bls12_381_1.bls12_381.verifyShortSignature(signature, message, primaryKey);
}
//# sourceMappingURL=bls.js.map