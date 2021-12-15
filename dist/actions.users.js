"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const tslib_1 = require("tslib");
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
const functions_1 = require("./functions");
class Users {
    constructor(auth) {
        this.auth = auth;
    }
    /**
     *
     * @param createUserPayload: CreateUserPayload
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#create-user
     */
    create(createUserPayload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = JSON.stringify(createUserPayload);
            const config = {
                method: 'post',
                url: `${this.auth.baseUrl}/AccountService/Accounts`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': this.auth.basic
                    "x-auth-token": this.auth.token,
                },
                data: data
            };
            (0, axios_1.default)(config).then((response) => {
                console.log(`Create User Respnse => `.green.bold);
                console.log(response.data);
            })
                .catch(error => console.log("createUser".bgRed.white, `${(0, functions_1.pretty)(error.response.data)}`.red.bold));
        });
    }
    /**
     *
     */
    users() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.auth.baseUrl}/AccountService/Accounts`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': this.auth.basic
                    "x-auth-token": this.auth.token,
                },
            };
            (0, axios_1.default)(config).then((response) => {
                console.log(`getUsers Respnse => `.green.bold);
                console.log(response.data);
            })
                .catch(error => console.log("getUsers".bgRed.white, `${(0, functions_1.pretty)(error.response.data)}`.red.bold));
        });
    }
    /**
     *
     *
     */
    user(uid) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const config = {
                method: 'get',
                url: `${this.auth.baseUrl}/AccountService/Accounts/${uid}`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': this.auth.basic
                    "x-auth-token": this.auth.token,
                },
            };
            (0, axios_1.default)(config).then((response) => {
                console.log(`getUser Respnse => `.green.bold);
                console.log(response.data);
            })
                .catch(error => console.log("getUser".bgRed.white, `${(0, functions_1.pretty)(error.response.data)}`.red.bold));
        });
    }
    /**
     *
     */
    delete(uid) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const config = {
                method: 'delete',
                url: `${this.auth.baseUrl}/AccountService/Accounts/${uid}`,
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': this.auth.basic
                    "x-auth-token": this.auth.token,
                },
            };
            (0, axios_1.default)(config).then((response) => {
                console.log(`deleteUser Respnse => `.green.bold);
                console.log(response.data);
            })
                .catch(error => console.log("deleteUser".bgRed.white, `${(0, functions_1.pretty)(error.response.data)}`.red.bold));
        });
    }
}
exports.Users = Users;
//# sourceMappingURL=actions.users.js.map