import { bls12_381 } from '@noble/curves/bls12-381';
import { bytesToHex } from '@noble/hashes/utils';
export let verify;
/**
 *
 * @param pk primary key: Uint8Array
 * @param sig signature: Uint8Array
 * @param msg message: Uint8Array
 * @returns boolean
 */
export function blsVerify(pk, sig, msg) {
    const primaryKey = typeof pk === 'string' ? pk : bytesToHex(pk);
    const signature = typeof sig === 'string' ? sig : bytesToHex(sig);
    const message = typeof msg === 'string' ? msg : bytesToHex(msg);
    return bls12_381.verifyShortSignature(signature, message, primaryKey);
}
//# sourceMappingURL=bls.js.map