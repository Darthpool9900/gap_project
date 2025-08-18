"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ed25519PublicKey = void 0;
const der_ts_1 = require("./der.js");
const errors_ts_1 = require("./errors.js");
class Ed25519PublicKey {
    static from(key) {
        return this.fromDer(key.toDer());
    }
    static fromRaw(rawKey) {
        return new Ed25519PublicKey(rawKey);
    }
    static fromDer(derKey) {
        return new Ed25519PublicKey(this.derDecode(derKey));
    }
    // The length of Ed25519 public keys is always 32 bytes.
    static { this.RAW_KEY_LENGTH = 32; }
    static derEncode(publicKey) {
        return (0, der_ts_1.wrapDER)(publicKey, der_ts_1.ED25519_OID);
    }
    static derDecode(key) {
        const unwrapped = (0, der_ts_1.unwrapDER)(key, der_ts_1.ED25519_OID);
        if (unwrapped.length !== this.RAW_KEY_LENGTH) {
            throw errors_ts_1.InputError.fromCode(new errors_ts_1.DerDecodeErrorCode('An Ed25519 public key must be exactly 32 bytes long'));
        }
        return unwrapped;
    }
    #rawKey;
    get rawKey() {
        return this.#rawKey;
    }
    #derKey;
    get derKey() {
        return this.#derKey;
    }
    // `fromRaw` and `fromDer` should be used for instantiation, not this constructor.
    constructor(key) {
        if (key.byteLength !== Ed25519PublicKey.RAW_KEY_LENGTH) {
            throw errors_ts_1.InputError.fromCode(new errors_ts_1.DerDecodeErrorCode('An Ed25519 public key must be exactly 32 bytes long'));
        }
        this.#rawKey = key;
        this.#derKey = Ed25519PublicKey.derEncode(key);
    }
    toDer() {
        return this.derKey;
    }
    toRaw() {
        return this.rawKey;
    }
}
exports.Ed25519PublicKey = Ed25519PublicKey;
//# sourceMappingURL=public_key.js.map