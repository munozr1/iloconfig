export interface CreateUserPayload {
    UserName: string;
    Password: string;
    Oem?: OEM;
}
export interface OEM {
    Hpe?: Hpe;
}
export interface Hpe {
    Enabled?: boolean;
    DisplayName?: string;
    Privilege?: string;
}
export interface ServerConfig {
    ip: string;
    user: string;
    pass: string;
}
export interface Auth {
    token: any;
    baseUrl: string;
    basic: string;
    serverConfig: ServerConfig;
}
