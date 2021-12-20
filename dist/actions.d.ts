/// <reference types="node" />
import https from "https";
import { CONFIG } from "./interfaces";
/**
 * Server class defines a server object.
 * A server has the following:
 * 	ip and a default username and password
 */
export declare class Server {
    agent: https.Agent;
    config: CONFIG;
    constructor(config: CONFIG);
    /**
     *
     * @returns 200 if the server is reachable.
     */
    testConnection(): Promise<void>;
    /**
     *
     * @param {string} ip -> ip address of the server
     * @param {string} username -> default username of the server
     * @param {string} password -> default password of the server
     * @returns An object with the followoing important information:
     *          - x-auth-token : the token to be used in the next requests
     *          - location : the location url to logout
     */
    login(): Promise<void>;
    /**
     *
     * @param {string} ip -> ip address of the server
     * @param {string} username -> default username of the server
     * @param {string} password -> default password of the server
     * @returns Ends the session
     */
    logout(): Promise<void>;
    /**
     *
     * @param {string1} ip
     * @param {string} username
     * @param {string} password
     * @param {string} role
     * @param {string} jwt
     * @returns returns whether the user was created or not
     */
    createUser(): Promise<void>;
    /**
     *
     * @param {string} ip
     * @param {string} license
     * @param {string} jwt
     * @returns returns wheter the license was added or not
     */
    setLicense(): Promise<void>;
    changeDHCP(): Promise<void>;
    changeHostname(): Promise<void>;
    changeIp(): Promise<void>;
}
