"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timeout = exports.pretty = exports.authHeader = void 0;
function authHeader(u, p) {
    return "Basic " + new Buffer(u + ":" + p).toString("base64");
}
exports.authHeader = authHeader;
function pretty(obj) {
    return JSON.stringify(obj, null, 2);
}
exports.pretty = pretty;
const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
exports.timeout = timeout;
//# sourceMappingURL=functions.js.map