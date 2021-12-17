export interface CONFIG {
    ip: string;
    default_username: string;
    default_password: string;
    new_username?: string;
    new_password?: string;
    role?: string;
    new_hostname?: string;
    static_ip?: string;
    token?: string;
    license?: string;
    dhcp?: boolean;
    location?: string;
}
export interface SERVERPROPERTIES {
    dusername?: string;
    ip?: string;
    dpassword?: string;
    nusername?: string;
    npassword?: string;
    role?: string;
    hostname?: string;
    dhcp?: boolean;
}
