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
