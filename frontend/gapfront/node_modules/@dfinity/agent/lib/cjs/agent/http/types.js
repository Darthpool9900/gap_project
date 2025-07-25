"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadRequestType = exports.SubmitRequestType = exports.Endpoint = void 0;
exports.makeNonce = makeNonce;
const random_ts_1 = require("../../utils/random.js");
/**
 * @internal
 */
var Endpoint;
(function (Endpoint) {
    Endpoint["Query"] = "read";
    Endpoint["ReadState"] = "read_state";
    Endpoint["Call"] = "call";
})(Endpoint || (exports.Endpoint = Endpoint = {}));
// The types of values allowed in the `request_type` field for submit requests.
var SubmitRequestType;
(function (SubmitRequestType) {
    SubmitRequestType["Call"] = "call";
})(SubmitRequestType || (exports.SubmitRequestType = SubmitRequestType = {}));
// The types of values allowed in the `request_type` field for read requests.
var ReadRequestType;
(function (ReadRequestType) {
    ReadRequestType["Query"] = "query";
    ReadRequestType["ReadState"] = "read_state";
})(ReadRequestType || (exports.ReadRequestType = ReadRequestType = {}));
/**
 * Create a random Nonce, based on random values
 */
function makeNonce() {
    // Encode 128 bits.
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    const rand1 = (0, random_ts_1.randomNumber)();
    const rand2 = (0, random_ts_1.randomNumber)();
    const rand3 = (0, random_ts_1.randomNumber)();
    const rand4 = (0, random_ts_1.randomNumber)();
    view.setUint32(0, rand1);
    view.setUint32(4, rand2);
    view.setUint32(8, rand3);
    view.setUint32(12, rand4);
    return Object.assign(new Uint8Array(buffer), { __nonce__: undefined });
}
//# sourceMappingURL=types.js.map