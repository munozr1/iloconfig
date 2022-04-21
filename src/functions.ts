//import fs
import { promises as fs } from "fs";
import { exit } from "process";
import { ErrorMessages, iLOError } from "./errors";
import { CONFIG } from "./interfaces";
// const util = require("util");

/**
 *
 * @param {string} filename The name or path of the file to parse
 * @param {boolean} h Whether or not the files first line is a header
 * @returns {Array} An array of objects representing the data in the file
 * @example 
 * input:   
 * 192.168.3.214,administrator,8DF985G,newuser,newpassword
 * 192.168.3.514,administrator,8DF985G,newuser,newpassword

 * output: 
DATA [
  {
    ip: '192.168.3.214',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },
  {
    ip: '192.168.3.514',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },

  ]
 */
export async function parseCSV(filename: string): Promise<CONFIG[]> {
	console.log("Parsing CSV file: " + filename);
	let result: CONFIG[] | undefined = [];
	let path = process.cwd();
	// read file
	const data: string = (await fs
		.readFile(path + "/" + filename, "binary")
		.catch((err) => console.log(err.messages))) as any;
	// Parse contents
	if (data) {
		let lines = data.split("\n");
		let headers: string[] = lines[0].split(",");
		for (let i = 0; i < lines.length; i++) {
			let obj: any = {};
			let currentline = lines[i].split(",");
			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}
			result.push(obj);
		}
		console.log("result", result);
		result.shift();
	}
	return result;
}

export function pretty(obj: any) {
	return JSON.stringify(obj, null, 2);
}

export function validateConfig(configs: CONFIG[]) {
	let localErrors: string[] = [];
	let usedIpAddresses: string[] = [];
	let inputHeaders: string[] = Object.keys(configs[0]);
	inputHeaders.shift();
	configs.pop();
	configs.forEach((config, i: number) => {
		//validate the ip address
		if (!config.ip) {
			localErrors.push("IP is required");
		} else if (!validIp(config.ip)) {
			localErrors.push("IP is invalid");
		} else if (usedIpAddresses.includes(config.ip)) {
			localErrors.push("Duplicate IP", config.ip);
		} else {
			usedIpAddresses.push(config.ip);
		}
		// validate headers and check if they have a value
		let errors = [...localErrors, ...validHeaders(inputHeaders, config)];

		if (errors.length > 0) {
			console.log(`SERVER ${i + 1} INVALID: `, errors);

			exit(1);
		} else {
			console.log(`SERVER ${i + 1} VALID`);
		}
		i++;
	});

	return configs;
}

function validHeaders(headers: string[], config: CONFIG): string[] {
	let validProperties = [
		"ip",
		"default_username",
		"default_password",
		"new_username",
		"new_password",
		"role",
		"dhcp",
		"new_hostname",
	];
	let errors: string[] = [];
	headers.forEach((header) => {
		if (!config[header]) {
			errors.push("Missing header: " + header);
		} else if (
			config[header] === undefined ||
			config[header] === "" ||
			config[header] === " "
		) {
			errors.push("Missing value for", header);
		}
		if (!validProperties.includes(header)) {
			errors.push("Invalid header", header);
		}
	});
	return errors;
}

/**
 *
 * @param ip The ip address to validate
 * @returns whether the ip address is valid or not
 */
function validIp(ip: string) {
	let parts = ip.split(".");
	if (parts.length != 4) return false;
	for (let i = 0; i < parts.length; i++) {
		if (parseInt(parts[i]) < 0 || parseInt(parts[i]) > 255) return false;
	}
	return true;
}

/**
 *
 * @param args Array of strings (arguments passed in by the user)
 * @returns returns the string that contains the flags if passed in, else it returns an iLOError
 */
export function validateFile(args: string[]): string | iLOError {
	let filename: string = "";
	let count = 0;
	args.forEach((arg) => {
		if (arg.includes(".csv")) {
			filename = arg;
			count++;
		}
	});
	if (count < 1)
		return {
			message: ErrorMessages.MissingServerFile,
			resolution: "include csv file with server configuration options",
		};
	else if (count > 1)
		return {
			message: ErrorMessages.TooManyFiles,
			resolution: "only include 1 csv file",
		};
	return filename;
}

/**
 *
 * @param inputFlags string containg the flags inputted by the user
 * @returns returns a string containing the flag arguments or an iLOError
 */
export function validateFlags(args: string[]): string | iLOError {
	let invalidFlag!: iLOError;
	let index = 0;
	let count = 0;
	const flags = ["f", "l", "u", "h", "c", "d", "-"];

	args.forEach((arg) => {
		if (arg.includes("-")) {
			count++;
			for (let i = 0; i < arg.length; i++) {
				if (!flags.includes(arg[i])) {
					invalidFlag = {
						message: ErrorMessages.InvalidFlags,
						resolution: `remove the ${arg[i]} flag`,
					};
				} else index = i;
			}
		}
	});
	if (count > 1)
		return {
			message: ErrorMessages.TooManyFlagArguments,
			resolution: "remove a -flags arugment",
		};

	if (invalidFlag) return invalidFlag;
	return args[index];
}
