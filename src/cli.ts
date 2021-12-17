#! /usr/bin/env node
import { CONFIG } from './interfaces';
import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

// import { parseCSV, pushHeaders, setHeaders } from "./functions";

// function main() {
//   const yargs = require("yargs");
//   const usage = "usage: ilo <-f> <file>";
//   const options = yargs
//     .usage(usage)
//     .options({
//       h: {
//         alias: "headers",
//         describe: "Headers to define ",
//         type: "boolean",
//         demand: false,
//       },
//       f: {
//         alias: "fileconfig",
//         describe:
//           "file containing list of ip addresses, username and password etc",
//         type: "string",
//         demand: false,
//       },
//     })
//     .help(true).argv;
//   console.log("options", options);
//   let inputHeaders: string[] = [];
//   let fileHeaders: any = {};
//   let filename: string = "";
//   let file: { [key: string]: boolean | string }[] = [];
//   let argv: string[] = process.argv.slice(2);

//   console.log("ARGV RAW ARRAY", argv);

//   while (argv.length) {
//     if (argv[0] === "-h") {
//       argv.splice(0, 1);
//       pushHeaders(inputHeaders, argv);
//       console.log("inputHeaders; ", inputHeaders);
//       setHeaders(inputHeaders, fileHeaders);
//       console.log("fileHeaders: ", fileHeaders);
//       // console.log("file: ", file);
//     }

//     if (argv[0] === "-f") {
//       filename = argv[1];
//       argv.splice(0, 2);
//       console.log("filename: ", filename);
//       parseCSV(filename).then((data) => {
//         file = data;
// 				// console.log("file: ", file);
				
//       });
			
//     }
//   }

//   console.log("file length: ", file.length);
	
//   return 0;
// }

// main();

 function test(){
	let config: CONFIG = {
		ip: "192.168.3.125",
		default_username: "Administrator",
		default_password: "NP26K567",
		new_username: "firstTestUser",
		new_password: "password123",
		role: "Administrator",
		new_hostname: "firstTestHost",
		token: "21282d6289fdce978ea5fdcd069fcba0",
		location: "https://192.168.3.125/redfish/v1/SessionService/Sessions/administrator000000000000031113f7ced9/",
	};
	let server = new Server(config);

	 server.logout()

}

test();



// file.forEach(server => {
// 	console.log("server: ", server);

// })
// console.log("DATA: ", data);
// iterate through the argv array in a for loop. Use a switch to determine which flag was passed in.
// if the flag is -f, then parse the file and pass the data to the function, increase the counter by 1 to move onto the next flag in the array.
// if the flag is -d, then call the defaultConfig function.
// https://github.com/HewlettPackard/javascript-ilorest-library/blob/master/examples/Redfish/ex48_set_ilo_hostname.js
// this link has js code that can help figure out the uri's for the rest of the functions
// if (yargs.argv.f) {
// 	data = parseCSV(yargs.argv.f);
// }
