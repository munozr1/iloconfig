"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkError = void 0;
/**
 *
 * @param err return value of a function
 * @returns true if error is of type iLOError, false if return type is not of iLOError
 */
function checkError(err) {
    return !!(err === null || err === void 0 ? void 0 : err.message);
}
exports.checkError = checkError;
//# sourceMappingURL=errors.js.map