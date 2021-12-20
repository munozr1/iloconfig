#! /usr/bin/env node
import { CONFIG } from "./interfaces";
import { Server } from "./actions";

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

import { parseCSV, validateConfig } from "./functions";

async function main() {
	const readline = require("readline");
	const yargs = require("yargs");
	const usage = "usage: ilo <-f> <file>  ";
	// @ts-ignore
	const _options = yargs
		.usage(usage)
		.options({
			f: {
				alias: "fileconfig",
				describe:
					"file containing: csv file with the following columns: ip, default_username, default_password, new_username, new_password, role, new_hostname, static_ip, license, dhcp",
				type: "string",
				demand: true,
			},
		})
		.help(true).argv;
	let filename: string = "";
	let file: CONFIG[] = [];
	let argv: string[] = process.argv.slice(2);
	while (argv.length) {
		if (argv[0] === "-f") {
			filename = argv[1];
			argv.splice(0, 2);
			await parseCSV(filename).then((data) => {
				file = data;
				// file.pop();
			});
		} else {
			console.log("Invalid argument");
			process.exit(1);
		}
	}
	const userConfimation = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	await userConfimation.question(
		`Modify ${file.length} servers? (y/n)`,
		(resp) => {
			if (resp === "y") {
				test(file);
			} else {
				process.exit(0);
			}
		}
	);
	return 0;
}

main();

function test(file: CONFIG[]) {
	// let config: CONFIG = {
	// 	ip: "192.168.3.125",
	// 	default_username: "Administrator",
	// 	default_password: "NP26K567",
	// 	new_username: "secondTestUser",
	// 	new_password: "password123",
	// 	role: "Administrator",
	// 	new_hostname: "firstTestHost",
	// 	location:
	// 		"https://192.168.3.125/redfish/v1/SessionService/Sessions/administrator0000000000000f2b15810625/",
	// 	token: "af8dfc21532048003c37e2982d6df0ab",
	// };
	validateConfig(file);
	file.forEach((config) => {
		let server = new Server(config);
		if (config.ip && config.default_username && config.default_password) {
			server.login();
		}
		if (config.new_username && config.new_password && config.role) {
			server.createUser();
		}
		if (config.new_hostname) {
			server.changeHostname();
		}
		if (config.license) {
			server.setLicense();
		}
		if (config.dhcp) {
			server.changeDHCP();
		}
		if (config.static_ip) {
			server.changeIp();
		}
	});
	//  server.logout();
	// server.login();
	//  server.logout();
}
