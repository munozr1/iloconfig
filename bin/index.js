#! /usr/bin/env node
const SInstance = require("./server.js");
const yargs = require("yargs");
const utils = require("./utils.js");
const axios = require("axios").default;
const https = require("https");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const usage = "ilo <function> <file>";
const options = yargs
	.usage(usage)
	.option("t", {
		alias: "tv2",
		describe: "TV2 default configuration",
		type: "boolean",
		demandOption: false,
	})
	.help(true).argv;

//parse arguments passed in

const agent = new https.Agent({
	rejectUnauthorized: false,
});

let admin_password = "admin";
let admin_username = "admin";
let hostname = "default hostname";
let newUsername = "new username";
let newPassword = "new password";
let actions = {
	UserName: "administrator",
	Password: "9CNPQNY2",
};
let ip = "https://192.168.3.214";
let url_prefix = "/redfish/v1/AccountService/Accounts/";
let SInstance_config = new SInstance();
let headers = {
	"Content-Type": "application/json",
	httpsAgent: agent,
	"x-auth-token": "d911304cb74904a7376753f021e2e922",
};
let location =
	"https://192.168.3.214/redfish/v1/SessionService/Sessions/administrator0000000061b260a905a1cac1/";
let auth;

let createUserinfo = {
	UserName: "OOB_Admin",
	Password: "Admin1234",
	RoleId: "Administrator",
};
// admin_username,
// admin_password,
// hostname,
// newUsername,
// newPassword,
// headers,
// ip,
// url_prefix

SInstance.admin_password = admin_password;
SInstance.admin_username = admin_username;
SInstance.hostname = hostname;
SInstance.newUsername = newUsername;
SInstance.newPassword = newPassword;
SInstance.actions = createUserinfo;
SInstance.ip = ip;
SInstance.url_prefix = url_prefix;

// console.log("SERVER", SInstance);
// prefix: "/redfish/v1/SessionService/Sessions/"
async function login() {
	console.log("");

	return await axios
		.post(SInstance.ip + SInstance.url_prefix, SInstance.actions, {
			headers: headers,
		})
		.then((resp) => {
			console.log("RESP", resp);
		})
		.catch((err) => {
			console.log("ERR check if certificate is valid (most common)", err);
		});
}

async function createUser(username, password, role) {
	return await axios
		.post(
			SInstance.ip + SInstance.url_prefix,
			{
				UserName: username,
				Password: password,
				RoleId: role,
			},
			{
				headers: headers,
			}
		)
		.then((resp) => {
			console.log("RESP", resp);
		})
		.catch((err) => {
			console.log("ERR check if certificate is valid (most common)", err);
		});
}
if (yargs.argv.t == true || yargs.argv.tv2 == true) {
	createUser("OOB_Admin", "Admin1234", "Administrator");
}
