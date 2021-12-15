import axios from "axios";
import { pretty } from "./functions";
import { Auth, CreateUserPayload } from "./interfaces/app.interface";

export class Users {
    auth: Auth;

    constructor(auth: Auth) {
        this.auth = auth;
    }

    /**
     * 
     * @param createUserPayload: CreateUserPayload 
     * @link https://hewlettpackard.github.io/iLOAmpPack-Redfish-API-Docs/#create-user
     */
    async create(createUserPayload: CreateUserPayload) {
        const data = JSON.stringify(createUserPayload);

        const config = {
            method: 'post',
            url: `${this.auth.baseUrl}/AccountService/Accounts`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': this.auth.basic
                "x-auth-token": this.auth.token,
            },
            data: data
        } as any;

        axios(config).then( (response) => {
            console.log(`Create User Respnse => `.green.bold)
            console.log(response.data);
        })
        .catch(error => console.log("createUser".bgRed.white, `${pretty(error.response.data)}`.red.bold));

    }

    /**
     * 
     */
    async users() {
        const config = {
            method: 'get',
            url: `${this.auth.baseUrl}/AccountService/Accounts`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': this.auth.basic
                "x-auth-token": this.auth.token,
            },
        } as any;

        axios(config).then( (response) => {
            console.log(`getUsers Respnse => `.green.bold);
            console.log(response.data);
        })
        .catch(error => console.log("getUsers".bgRed.white, `${pretty(error.response.data)}`.red.bold));

    }
    /**
     * 
     * 
     */
    async user(uid: any) {
        const config = {
            method: 'get',
            url: `${this.auth.baseUrl}/AccountService/Accounts/${uid}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': this.auth.basic
                "x-auth-token": this.auth.token,
            },
        } as any;

        axios(config).then( (response) => {
            console.log(`getUser Respnse => `.green.bold);
            console.log(response.data);
        })
        .catch(error => console.log("getUser".bgRed.white, `${pretty(error.response.data)}`.red.bold));
    }
   
    /**
     * 
     */
    async delete(uid: any) {
        const config = {
            method: 'delete',
            url: `${this.auth.baseUrl}/AccountService/Accounts/${uid}`,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': this.auth.basic
                "x-auth-token": this.auth.token,
            },
        } as any;

        axios(config).then( (response) => {
            console.log(`deleteUser Respnse => `.green.bold);
            console.log(response.data);
        })
        .catch(error => console.log("deleteUser".bgRed.white, `${pretty(error.response.data)}`.red.bold));
    }
}