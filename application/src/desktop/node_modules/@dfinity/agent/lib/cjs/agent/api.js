"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryResponseStatus = exports.ReplicaRejectCode = void 0;
exports.isV2ResponseBody = isV2ResponseBody;
exports.isV3ResponseBody = isV3ResponseBody;
/**
 * Codes used by the replica for rejecting a message.
 * See {@link https://sdk.dfinity.org/docs/interface-spec/#reject-codes | the interface spec}.
 */
var ReplicaRejectCode;
(function (ReplicaRejectCode) {
    ReplicaRejectCode[ReplicaRejectCode["SysFatal"] = 1] = "SysFatal";
    ReplicaRejectCode[ReplicaRejectCode["SysTransient"] = 2] = "SysTransient";
    ReplicaRejectCode[ReplicaRejectCode["DestinationInvalid"] = 3] = "DestinationInvalid";
    ReplicaRejectCode[ReplicaRejectCode["CanisterReject"] = 4] = "CanisterReject";
    ReplicaRejectCode[ReplicaRejectCode["CanisterError"] = 5] = "CanisterError";
})(ReplicaRejectCode || (exports.ReplicaRejectCode = ReplicaRejectCode = {}));
var QueryResponseStatus;
(function (QueryResponseStatus) {
    QueryResponseStatus["Replied"] = "replied";
    QueryResponseStatus["Rejected"] = "rejected";
})(QueryResponseStatus || (exports.QueryResponseStatus = QueryResponseStatus = {}));
/**
 * Utility function to check if a body is a v2ResponseBody for type safety.
 * @param body The body to check
 * @returns boolean indicating if the body is a v2ResponseBody
 */
function isV2ResponseBody(body) {
    return body !== null && body !== undefined && 'reject_code' in body;
}
/**
 * Utility function to check if a body is a v3ResponseBody for type safety.
 * @param body The body to check
 * @returns boolean indicating if the body is a v3ResponseBody
 */
function isV3ResponseBody(body) {
    return body !== null && body !== undefined && 'certificate' in body;
}
//# sourceMappingURL=api.js.map