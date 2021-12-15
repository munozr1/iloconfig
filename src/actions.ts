import 'colors';
import { Auth, ServerConfig } from "./interfaces/app.interface";
import { Session } from './session';
import { Users } from './actions.users';


export class Actions {
    auth!: Auth;

    constructor(auth: Auth) {
        this.auth = auth
    }

    static async init(serverConfig: ServerConfig) {
        const session: Session = await Session.createSession(serverConfig)
        return new Actions(session.auth);
    }

    get users() { return new Users(this.auth)}

}