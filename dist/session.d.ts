import { Auth, ServerConfig } from "./interfaces/app.interface";
export declare class Session {
    serverConfig: ServerConfig;
    agent: any;
    auth: Auth;
    constructor(serverConfig: ServerConfig, auth: Auth);
    /**
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#authentication-and-sessions
     * @returns a class Session which can be used to authenticate other requests
     */
    static createSession(serverConfig: ServerConfig): Promise<any>;
}
