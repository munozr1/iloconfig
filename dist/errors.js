"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkError = void 0;
/**
 *
 * @param err return value of a function
 * @returns true if error is of type iLOError, false if return type is not of iLOError
 */
function checkError(err) {
    var _a;
    return !!((_a = err) === null || _a === void 0 ? void 0 : _a.message);
}
exports.checkError = checkError;
//# sourceMappingURL=errors.js.map