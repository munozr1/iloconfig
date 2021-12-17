#! /usr/bin/env node

// import { pushHeaders } from "./functions";`

import { pushHeaders, setHeaders } from "./functions";

// import { parseCSV } from "./functions";
const yargs = require("yargs");
// const actions = require("./actions.js");
const usage = "usage: ilo <-f> <file>";
const options = yargs
	.usage(usage)
	.options({
		m: {
			alias: "ManualConfig",
			describe: "use default config",
			type: "boolean",
			demand: false,
		},
		f: {
			alias: "FileConfig",
			describe: "file containing list of ip addresses, username and password ",
			type: "string",
			demand: false,
		},
	})
	.help(true).argv;
//parse arguments passed in
console.log("options", options);

// let data: any = [];
let inputHeaders: string[] = [];
let fileHeaders: any = {};
let filename;
let argv: string[] = process.argv.slice(2);

console.log("ARGV RAW ARRAY", argv);
while (argv.length) {
	if (argv[0] === "-h") {
		argv.splice(0, 1);
		pushHeaders(inputHeaders, argv);
		console.log("inputHeaders; ", inputHeaders);
		setHeaders(inputHeaders, fileHeaders);
		console.log("fileHeaders: ", fileHeaders);
	}
	if (argv[0] === "-f") {
		filename = argv[1];
		argv.splice(0, 2);
		console.log("filename: ", filename);
	}
}
console.log("new argv length: ", argv.length);
console.log("new argv: ", argv);

// console.log("DATA: ", data);

// iterate through the argv array in a for loop. Use a switch to determine which flag was passed in.
// if the flag is -f, then parse the file and pass the data to the function, increase the counter by 1 to move onto the next flag in the array.
// if the flag is -d, then call the defaultConfig function.
// https://github.com/HewlettPackard/javascript-ilorest-library/blob/master/examples/Redfish/ex48_set_ilo_hostname.js
// this link has js code that can help figure out the uri's for the rest of the functions
// if (yargs.argv.f) {
// 	data = parseCSV(yargs.argv.f);
// }
