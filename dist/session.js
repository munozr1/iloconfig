"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const tslib_1 = require("tslib");
const functions_1 = require("./functions");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");
class Session {
    constructor(serverConfig, auth) {
        this.agent = new https.Agent({ rejectUnauthorized: false, });
        this.serverConfig = serverConfig;
        this.auth = auth;
    }
    /**
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#authentication-and-sessions
     * @returns a class Session which can be used to authenticate other requests
     */
    static createSession(serverConfig) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const agent = new https.Agent({ rejectUnauthorized: false });
            const axios = require('axios');
            const data = JSON.stringify({
                "UserName": serverConfig.user,
                "Password": serverConfig.pass
            });
            const config = {
                method: "post",
                url: `https://${serverConfig.ip}/redfish/v1/SessionService/Sessions/`,
                headers: {
                    "Content-Type": "application/json",
                    httpsAgent: agent,
                },
                data: data,
            };
            return axios(config).then((response) => {
                console.log('');
                console.log(`[ Session Created ] `.green.bold, response.data.Id);
                const auth = {
                    token: response.headers["x-auth-token"],
                    baseUrl: `https://${serverConfig.ip}/redfish/v1`,
                    basic: (0, functions_1.authHeader)(serverConfig.user, serverConfig.pass),
                    serverConfig
                };
                return new Session(serverConfig, auth);
            })
                .catch((error) => console.log("createSession".bgRed.white, `${error.toString()}`.red));
        });
    }
}
exports.Session = Session;
//# sourceMappingURL=session.js.map