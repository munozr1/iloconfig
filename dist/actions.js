"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const tslib_1 = require("tslib");
const https_1 = (0, tslib_1.__importDefault)(require("https"));
const axios_1 = (0, tslib_1.__importDefault)(require("axios"));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
/**
 * Server class defines a server object.
 * A server has the following:
 * 	ip and a default username and password
 */
class Server {
    constructor(config) {
        this.agent = new https_1.default.Agent({
            rejectUnauthorized: false,
        });
        this.config = config;
    }
    testConnection() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            // const data = JSON.stringify({});
            const methodInfo = {
                method: 'get',
                url: `https://${this.config.ip}/redfish/v1/`,
                headers: {
                    'Content-Type': 'application/json',
                    httpsAgent: this.agent,
                },
            };
            return yield axios_1.default
                .get(methodInfo.url)
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    /**
     *
     * @param {string} ip -> ip address of the server
     * @param {string} username -> default username of the server
     * @param {string} password -> default password of the server
     * @returns An object with the followoing important information:
     *          - x-auth-token : the token to be used in the next requests
     *          - location : the location url to logout
     */
    login() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = JSON.stringify({
                UserName: this.config.default_username,
                Password: this.config.default_password,
            });
            const methodInfo = {
                method: 'post',
                url: `https://${this.config.ip}/redfish/v1/SessionService/Sessions/`,
                headers: {
                    'Content-Type': 'application/json',
                    httpsAgent: this.agent,
                },
                data: data,
            };
            return yield (0, axios_1.default)(methodInfo)
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    /**
 *
 * @param {string} ip -> ip address of the server
 * @param {string} username -> default username of the server
 * @param {string} password -> default password of the server
 * @returns Ends the session
 */
    logout() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const methodInfo = {
                method: 'delete',
                url: `${this.config.location}`,
                headers: {
                    'Content-Type': 'application/json',
                    httpsAgent: this.agent,
                },
            };
            return yield (0, axios_1.default)(methodInfo)
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    /**
     *
     * @param {string1} ip
     * @param {string} username
     * @param {string} password
     * @param {string} role
     * @param {string} jwt
     * @returns returns whether the user was created or not
     */
    createUser() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const data = JSON.stringify({
                UserName: this.config.new_username,
                Password: this.config.new_password,
                RoleId: this.config.role,
            });
            const methodInfo = {
                method: 'post',
                url: `https://${this.config.ip}/redfish/v1/AccountService/Accounts/`,
                headers: {
                    'Content-Type': 'application/json',
                    httpsAgent: this.agent,
                    "x-auth-token": this.config.token,
                },
                data: data,
            };
            return yield (0, axios_1.default)(methodInfo)
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    /**
     *
     * @param {string} ip
     * @param {string} license
     * @param {string} jwt
     * @returns returns wheter the license was added or not
     */
    setLicense() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield axios_1.default
                .post(`${this.config.ip}/redfish/v1/Managers/1/LicenseService/`, {
                LicenseKey: this.config.license,
            }, {
                headers: {
                    "content-type": "application/json",
                    // "x-auth-token": this.config.token,
                },
            })
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    //"Oem/Hp/DHCPv4/Enabled" : EthernetInterfaces
    changeDHCP() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield axios_1.default
                .patch(`${this.config.ip}/redfish/v1/Oem/Hp/DHCPv4/Enabled`, {
                Oem: {
                    Hp: {
                        DHCPv4: {
                            Enabled: this.config.dhcp,
                        },
                    },
                },
            }, {
                headers: {
                // "x-auth-token": this.config.token,
                },
            })
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
    ///rest/v1/Managers/{item}/EthernetInterfaces/{item}
    changeHostname() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return yield axios_1.default
                .post(`${this.config.ip}rest/v1/Managers/1/EthernetInterfaces/`, {
                Oem: {
                    Hp: {
                        HostName: this.config.new_hostname,
                    },
                },
            }, {
                headers: {
                // "x-auth-token": this.config.token,
                },
            })
                .then((resp) => {
                console.log("RESP", resp);
            })
                .catch((err) => {
                console.log("ERR check if certificate is valid (most common)", err);
            });
        });
    }
}
exports.Server = Server;
//# sourceMappingURL=actions.js.map