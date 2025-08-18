"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cbor = exports.ToCborValue = void 0;
exports.encode = encode;
exports.decode = decode;
const principal_1 = require("@dfinity/principal");
const cbor = __importStar(require("@dfinity/cbor"));
const errors_ts_1 = require("./errors.js");
const index_ts_1 = require("./agent/index.js");
/**
 * Used to extend classes that need to provide a custom value for the CBOR encoding process.
 */
class ToCborValue {
}
exports.ToCborValue = ToCborValue;
function hasCborValueMethod(value) {
    return typeof value === 'object' && value !== null && 'toCborValue' in value;
}
/**
 * Encode a JavaScript value into CBOR. If the value is an instance of {@link ToCborValue},
 * the {@link ToCborValue.toCborValue} method will be called to get the value to encode.
 * @param value The value to encode
 */
function encode(value) {
    try {
        return cbor.encodeWithSelfDescribedTag(value, value => {
            if (principal_1.Principal.isPrincipal(value)) {
                return value.toUint8Array();
            }
            if (index_ts_1.Expiry.isExpiry(value)) {
                return value.toBigInt();
            }
            if (hasCborValueMethod(value)) {
                return value.toCborValue();
            }
            return value;
        });
    }
    catch (error) {
        throw errors_ts_1.InputError.fromCode(new errors_ts_1.CborEncodeErrorCode(error, value));
    }
}
/**
 * Decode a CBOR encoded value into a JavaScript value.
 * @param input The CBOR encoded value
 */
function decode(input) {
    try {
        return cbor.decode(input);
    }
    catch (error) {
        throw errors_ts_1.InputError.fromCode(new errors_ts_1.CborDecodeErrorCode(error, input));
    }
}
// Not strictly necessary, we're just keeping it for backwards compatibility.
exports.Cbor = {
    encode,
    decode,
};
//# sourceMappingURL=cbor.js.map