#! /usr/bin/env node
const SInstance = require("./server.js");
const yargs = require("yargs");
const utils = require("./utils.js");
const axios = require("axios").default;
const https = require("https");

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

if (yargs.argv.t == true || yargs.argv.tv2 == true) {
	axios
		.get("https://192.168.3.214/redfish/v1/", { httpsAgent: agent })
		.then((resp) => {
			console.log("RESP", resp);
		});
	return;
}

let admin_password = "admin";
let admin_username = "admin";
let hostname = "default hostname";
let newUsername = "new username";
let newPassword = "new password";
let headers = {
	"Content-Type": "application/json",
	httpsAgent: agent,
};
let ip = "192.168.3.214";
let url_prefix = "/redfish/v1/";
let SInstance_config = new SInstance();
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
SInstance.headers = headers;
SInstance.ip = ip;
SInstance.url_prefix = url_prefix;

console.log("SERVER", SInstance);
