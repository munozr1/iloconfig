#! /usr/bin/env node
import { CONFIG } from "./interfaces";
// import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
import {
	validateFile,
	validateConfig,
	validateFlags,
	parseCSV,
} from "./functions";
import { exit } from "process";
import { checkError, iLOError } from "./errors";
const readline = require("readline");

async function main() {
	const usage = "usage: ilo <-f> <file>  ";

	let argv: string[] = process.argv.slice(2);
	let inputFlags: string | iLOError = validateFlags(argv);
	let filename: string | iLOError = validateFile(argv);
	// parsed data from csv file
	let file: CONFIG[] = [];
	// arguments passed in by user

	// let inputFlags = validateArgs(argv);

	//identify and validate the arguments passed in
	// eventually i will implement other arguments
	// -f <file> always required
	// -l <log in> assumed by default
	// -u <update> update to latest firmware
	// -h <hostname> create a new hostname
	// -c <create user> create a new user
	// -d <DHCP> turn dhcp on or off
	// a command may look like the following
	// ilo -fluhcd <file>
	//

	// if (inputFlags === "") throw new Error("No flags provided");
	if (checkError(inputFlags)) {
		console.log(inputFlags);
		exit(1);
	}
	if (checkError(filename)) {
		console.log(filename);
		exit(1);
	}

	while (argv.length) {
		if (argv[0].includes("f")) {
			filename = argv[1];
			argv.splice(0, 2);
			file = await parseCSV(filename);
		} else {
			console.log("Invalid argument");
			console.log(usage);

			process.exit(1);
		}
	}

	// take in user input
	const userConfimation = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	//once the user confirms the config file, run the test function
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
	validateConfig(file);
	exit(0);
}
