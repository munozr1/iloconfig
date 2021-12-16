import https from "https";
import axios from "axios";
import { CONFIG } from "./interfaces";

/**
 * Server class defines a server object.
 * A server has the following:
 * 	ip and a default username and password
 */
export class Server {
	agent = new https.Agent({
		rejectUnauthorized: false,
	});
	config!: CONFIG;
	constructor(config: CONFIG) {
		this.config = config;
	}
	/**
	 *
	 * @param {string} ip -> ip address of the server
	 * @param {string} username -> default username of the server
	 * @param {string} password -> default password of the server
	 * @returns An object with the followoing important information:
	 *          - x-auth-token : the token to be used in the next requests
	 *          - location : the location url to logout
	 */
	async login() {
		return await axios.post(
			`${this.config.ip}/redfish/v1/SessionsService/Sessions/`,
			{
				UserName: this.config.default_username,
				Password: this.config.default_password,
			},
			{
				headers: {
					"Content-Type": "application/json",
					// httpsAgent: this.agent,
				},
			}
		);
	}

	/**
	 *
	 * @param {string1} ip
	 * @param {string} username
	 * @param {string} password
	 * @param {string} role
	 * @param {string} jwt
	 * @returns returns whether the user was created or not
	 */
	async createUser() {
		return await axios
			.post(
				`${this.config.ip}/redfish/v1/Accounts/`,
				{
					UserName: this.config.default_username,
					Password: this.config.default_password,
					RoleId: this.config.role,
				},
				{
					headers: {
						"Content-Type": "application/json",
						// "x-auth-token": this.config.token,
					},
				}
			)
			.then((resp) => {
				console.log("RESP", resp);
			})
			.catch((err) => {
				console.log("ERR check if certificate is valid (most common)", err);
			});
	}

	/**
	 *
	 * @param {string} ip
	 * @param {string} license
	 * @param {string} jwt
	 * @returns returns wheter the license was added or not
	 */
	async setLicense() {
		return await axios
			.post(
				`${this.config.ip}/redfish/v1/Managers/1/LicenseService/`,
				{
					LicenseKey: this.config.license,
				},
				{
					headers: {
						"content-type": "application/json",
						// "x-auth-token": this.config.token,
					},
				}
			)
			.then((resp) => {
				console.log("RESP", resp);
			})
			.catch((err) => {
				console.log("ERR check if certificate is valid (most common)", err);
			});
	}

	//"Oem/Hp/DHCPv4/Enabled" : EthernetInterfaces
	async changeDHCP() {
		return await axios
			.patch(
				`${this.config.ip}/redfish/v1/Oem/Hp/DHCPv4/Enabled`,
				{
					Oem: {
						Hp: {
							DHCPv4: {
								Enabled: this.config.dhcp,
							},
						},
					},
				},
				{
					headers: {
						// "x-auth-token": this.config.token,
					},
				}
			)
			.then((resp) => {
				console.log("RESP", resp);
			})
			.catch((err) => {
				console.log("ERR check if certificate is valid (most common)", err);
			});
	}

	///rest/v1/Managers/{item}/EthernetInterfaces/{item}
	async changeHostname() {
		return await axios
			.post(
				`${this.config.ip}rest/v1/Managers/1/EthernetInterfaces/`,
				{
					Oem: {
						Hp: {
							HostName: this.config.new_hostname,
						},
					},
				},
				{
					headers: {
						// "x-auth-token": this.config.token,
					},
				}
			)
			.then((resp) => {
				console.log("RESP", resp);
			})
			.catch((err) => {
				console.log("ERR check if certificate is valid (most common)", err);
			});
	}
}
