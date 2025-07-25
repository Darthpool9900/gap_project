"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousIdentity = exports.SignIdentity = void 0;
exports.createIdentityDescriptor = createIdentityDescriptor;
const principal_1 = require("@dfinity/principal");
const request_id_ts_1 = require("./request_id.js");
const utils_1 = require("@noble/hashes/utils");
const constants_ts_1 = require("./constants.js");
/**
 * An Identity that can sign blobs.
 */
class SignIdentity {
    /**
     * Get the principal represented by this identity. Normally should be a
     * `Principal.selfAuthenticating()`.
     */
    getPrincipal() {
        if (!this._principal) {
            this._principal = principal_1.Principal.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
        }
        return this._principal;
    }
    /**
     * Transform a request into a signed version of the request. This is done last
     * after the transforms on the body of a request. The returned object can be
     * anything, but must be serializable to CBOR.
     * @param request - internet computer request to transform
     */
    async transformRequest(request) {
        const { body, ...fields } = request;
        const requestId = (0, request_id_ts_1.requestIdOf)(body);
        return {
            ...fields,
            body: {
                content: body,
                sender_pubkey: this.getPublicKey().toDer(),
                sender_sig: await this.sign((0, utils_1.concatBytes)(constants_ts_1.IC_REQUEST_DOMAIN_SEPARATOR, requestId)),
            },
        };
    }
}
exports.SignIdentity = SignIdentity;
class AnonymousIdentity {
    getPrincipal() {
        return principal_1.Principal.anonymous();
    }
    async transformRequest(request) {
        return {
            ...request,
            body: { content: request.body },
        };
    }
}
exports.AnonymousIdentity = AnonymousIdentity;
/**
 * Create an IdentityDescriptor from a @dfinity/identity Identity
 * @param identity - identity describe in returned descriptor
 */
function createIdentityDescriptor(identity) {
    const identityIndicator = 'getPublicKey' in identity
        ? { type: 'PublicKeyIdentity', publicKey: (0, utils_1.bytesToHex)(identity.getPublicKey().toDer()) }
        : { type: 'AnonymousIdentity' };
    return identityIndicator;
}
//# sourceMappingURL=auth.js.map