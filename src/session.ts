import { authHeader } from "./functions";
import { Auth, ServerConfig } from "./interfaces/app.interface";
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");

export class Session {
    
    serverConfig: ServerConfig;
    agent = new https.Agent({ rejectUnauthorized: false, });
    auth!: Auth;

    constructor(serverConfig: ServerConfig, auth: Auth) {
        this.serverConfig = serverConfig;
        this.auth = auth;
    }

    /**
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#authentication-and-sessions
     * @returns a class Session which can be used to authenticate other requests
     */
    static async createSession(serverConfig: ServerConfig) {
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

        return axios(config).then((response: any) => {
            console.log('')
            console.log(`[ Session Created ] `.green.bold, response.data.Id)
            const auth = {
              token: response.headers["x-auth-token"],
              baseUrl: `https://${serverConfig.ip}/redfish/v1`,
              basic: authHeader(serverConfig.user, serverConfig.pass),
              serverConfig
            };
            return new Session(serverConfig, auth);
        })
        .catch((error: Error) => console.log("createSession".bgRed.white, `${error.toString()}`.red));
    }

}