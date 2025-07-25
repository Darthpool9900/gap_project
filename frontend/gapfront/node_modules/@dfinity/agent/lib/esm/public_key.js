import { ED25519_OID, unwrapDER, wrapDER } from "./der.js";
import { DerDecodeErrorCode, InputError } from "./errors.js";
export class Ed25519PublicKey {
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
        return wrapDER(publicKey, ED25519_OID);
    }
    static derDecode(key) {
        const unwrapped = unwrapDER(key, ED25519_OID);
        if (unwrapped.length !== this.RAW_KEY_LENGTH) {
            throw InputError.fromCode(new DerDecodeErrorCode('An Ed25519 public key must be exactly 32 bytes long'));
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
            throw InputError.fromCode(new DerDecodeErrorCode('An Ed25519 public key must be exactly 32 bytes long'));
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
//# sourceMappingURL=public_key.js.map