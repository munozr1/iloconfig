import { Auth, CreateUserPayload } from "./interfaces/app.interface";
export declare class Users {
    auth: Auth;
    constructor(auth: Auth);
    /**
     *
     * @param createUserPayload: CreateUserPayload
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#create-user
     */
    create(createUserPayload: CreateUserPayload): Promise<void>;
    /**
     *
     */
    users(): Promise<void>;
    /**
     *
     *
     */
    user(uid: any): Promise<void>;
    /**
     *
     */
    delete(uid: any): Promise<void>;
}
