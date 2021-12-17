//import fs
import * as fs from "fs";

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
export function parseCSV(filename: string) {
	let path = process.cwd();
	console.log("PATH", path + "/" + filename);

	fs.readFile(path + "/" + filename, "utf8", function (err, data) {
		if (err) {
			return console.log(err);
		}
		let lines = data.split("\n");
		let headers: string[] = lines[0].split(",");

		let result = [];
		for (let i = 0; i < lines.length; i++) {
			let obj: any = {};
			let currentline = lines[i].split(",");
			for (var j = 0; j < headers.length; j++) {
				obj[headers[j]] = currentline[j];
			}

			result.push(obj);
		}
		result.shift();
		console.log("DATA", result);

		return result;
	});
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
