#! /usr/bin/env node
const SInstance = require("./server.js");
const yargs = require("yargs");
const utils = require("./utils.js");
const actions = require("./actions.js");

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

const usage = "usage: ilo <-f> <file>";
const options = yargs
	.usage(usage)
	.options({
		d: {
			alias: "default config",
			describe: "use default config",
			type: "boolean",
			demand: false,
		},
		f: {
			alias: "file",
			describe: "file containing list of ip addresses, username and password ",
			type: "string",
			demand: true,
		},
	})
	.help(true).argv;
//parse arguments passed in

let admin_password;
let admin_username;
let hostname;
let newUsername;
let newPassword;

let ip;
let url_prefix;
let headers = {};
let location;
let auth;

if (yargs.argv.t == true || yargs.argv.tv2 == true) {
	actions.login();
}
