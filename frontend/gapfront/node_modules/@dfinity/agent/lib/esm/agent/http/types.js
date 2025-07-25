import { randomNumber } from "../../utils/random.js";
/**
 * @internal
 */
export var Endpoint;
(function (Endpoint) {
    Endpoint["Query"] = "read";
    Endpoint["ReadState"] = "read_state";
    Endpoint["Call"] = "call";
})(Endpoint || (Endpoint = {}));
// The types of values allowed in the `request_type` field for submit requests.
export var SubmitRequestType;
(function (SubmitRequestType) {
    SubmitRequestType["Call"] = "call";
})(SubmitRequestType || (SubmitRequestType = {}));
// The types of values allowed in the `request_type` field for read requests.
export var ReadRequestType;
(function (ReadRequestType) {
    ReadRequestType["Query"] = "query";
    ReadRequestType["ReadState"] = "read_state";
})(ReadRequestType || (ReadRequestType = {}));
/**
 * Create a random Nonce, based on random values
 */
export function makeNonce() {
    // Encode 128 bits.
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const rand1 = randomNumber();
    const rand2 = randomNumber();
    const rand3 = randomNumber();
    const rand4 = randomNumber();
    view.setUint32(0, rand1);
    view.setUint32(4, rand2);
    view.setUint32(8, rand3);
    view.setUint32(12, rand4);
    return Object.assign(new Uint8Array(buffer), { __nonce__: undefined });
}
//# sourceMappingURL=types.js.map