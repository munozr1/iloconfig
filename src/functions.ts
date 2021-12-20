//import fs
import { promises as fs } from "fs";
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
	let result: CONFIG[] = [];
	let path = process.cwd();
	// read file
	const data: string = (await fs
		.readFile(path + "/" + filename, "binary")
		.catch((err) => console.log(err))) as any;
	// Parse contents
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
	result.shift();
	console.log("result", result);
	return result;
}

export function pushHeaders(output: string[], input: string[]) {
	console.log("got to push function");
	console.log("output: ", output);
	console.log("input: ", input.length);
	let i;
	for (i = 0; i < input.length && !input[i].includes("-"); i++) {
		output.push(input[i]);
		console.log("push function iteration", i);
	}
	input.splice(0, i);
	return output;
}

export function setHeaders(input: string[], output: any) {
	input.forEach((item) => {
		output[item] = true;
	});
}

export function pretty(obj: any) {
	return JSON.stringify(obj, null, 2);
}

export function validateConfig(config: CONFIG[]) {
	let errors: string[] = [];
	let ipList: string[] = [];
	for (let i = 0; i < config.length; i++) {
		if (!config[i].ip) {
			errors.push("IP is required");
		} else if (!validIp(config[i].ip)) {
			errors.push("IP is invalid");
		} else if (ipList.includes(config[i].ip)) {
			errors.push("Duplicate IP", config[i].ip);
		} else {
			ipList.push(config[i].ip);
		}
		if (!config[i].default_username) {
			errors.push("Default Username is required");
		}
		if (!config[i].default_password) {
			errors.push("Default Password is required");
		}
		if (config[i].new_username && !config[i].new_password) {
			errors.push("New Username is set but no password");
		}
		if (config[i].new_password && !config[i].new_username) {
			errors.push("New Password is set but no username");
		}
		if (errors.length > 0) {
			throw new Error(errors.join("\n"));
		}
	}

	return config;
}

function validIp(ip: string) {
	let parts = ip.split(".");
	if (parts.length != 4) return false;
	for (let i = 0; i < parts.length; i++) {
		if (parseInt(parts[i]) < 0 || parseInt(parts[i]) > 255) return false;
	}
	return true;
}
