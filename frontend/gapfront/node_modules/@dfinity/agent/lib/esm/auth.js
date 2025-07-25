import { Principal } from '@dfinity/principal';
import { requestIdOf } from "./request_id.js";
import { bytesToHex, concatBytes } from '@noble/hashes/utils';
import { IC_REQUEST_DOMAIN_SEPARATOR } from "./constants.js";
/**
 * An Identity that can sign blobs.
 */
export class SignIdentity {
    /**
     * Get the principal represented by this identity. Normally should be a
     * `Principal.selfAuthenticating()`.
     */
    getPrincipal() {
        if (!this._principal) {
            this._principal = Principal.selfAuthenticating(new Uint8Array(this.getPublicKey().toDer()));
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
        const requestId = requestIdOf(body);
        return {
            ...fields,
            body: {
                content: body,
                sender_pubkey: this.getPublicKey().toDer(),
                sender_sig: await this.sign(concatBytes(IC_REQUEST_DOMAIN_SEPARATOR, requestId)),
            },
        };
    }
}
export class AnonymousIdentity {
    getPrincipal() {
        return Principal.anonymous();
    }
    async transformRequest(request) {
        return {
            ...request,
            body: { content: request.body },
        };
    }
}
/**
 * Create an IdentityDescriptor from a @dfinity/identity Identity
 * @param identity - identity describe in returned descriptor
 */
export function createIdentityDescriptor(identity) {
    const identityIndicator = 'getPublicKey' in identity
        ? { type: 'PublicKeyIdentity', publicKey: bytesToHex(identity.getPublicKey().toDer()) }
        : { type: 'AnonymousIdentity' };
    return identityIndicator;
}
//# sourceMappingURL=auth.js.map