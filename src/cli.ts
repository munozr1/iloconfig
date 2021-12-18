#! /usr/bin/env node
import { CONFIG } from "./interfaces";
import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

import { parseCSV } from "./functions";

async function main() {
	const yargs = require("yargs");
	const usage = "usage: ilo <-f> <file>";
	const options = yargs
		.usage(usage)
		.options({
			f: {
				alias: "fileconfig",
				describe:
					"file containing list of ip addresses, username and password etc",
				type: "string",
				demand: true,
			},
		})
		.help(true).argv;
	console.log("options", options);
	let fileHeaders: any = {};
	let filename: string = "";
	let file: CONFIG[] = [];
	let argv: string[] = process.argv.slice(2);
	console.log("ARGV RAW ARRAY", argv);

	while (argv.length) {
		if (argv[0] === "-f") {
			filename = argv[1];
			argv.splice(0, 2);
			// console.log("filename: ", filename);
			await parseCSV(filename, fileHeaders).then((data) => {
				file = data;
				file.pop();
				// console.log("file: ", file);
				console.log("fileHeaders", fileHeaders);
			});
		}
	}

	test(file);

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
	file.forEach((config) => {
		let server = new Server(config);
		console.log("SERVER ", server.config.ip);
	});
	//  server.logout();
	// server.login();
	//  server.logout();
}
