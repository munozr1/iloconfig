import 'colors';
import { Auth, ServerConfig } from "./interfaces/app.interface";
import { Users } from './actions.users';
export declare class Actions {
    auth: Auth;
    constructor(auth: Auth);
    static init(serverConfig: ServerConfig): Promise<Actions>;
    get users(): Users;
}
