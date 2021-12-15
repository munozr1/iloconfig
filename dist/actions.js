"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Actions = void 0;
const tslib_1 = require("tslib");
require("colors");
const session_1 = require("./session");
const actions_users_1 = require("./actions.users");
class Actions {
    constructor(auth) {
        this.auth = auth;
    }
    static init(serverConfig) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const session = yield session_1.Session.createSession(serverConfig);
            return new Actions(session.auth);
        });
    }
    get users() { return new actions_users_1.Users(this.auth); }
}
exports.Actions = Actions;
//# sourceMappingURL=actions.js.map