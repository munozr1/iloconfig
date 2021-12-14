#! /usr/bin/env node
const yargs = require("yargs");
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
			demand: false,
		},
	})
	.help(true).argv;
//parse arguments passed in

// let data = actions.parseFile(filename);
let auth;
// function defaultConfig() {
// 	actions.login();
// 	actions.changeIp();
// 	actions.createUser();
// 	actions.dhcpOff();
// 	actions.changeHostname();
// 	actions.setLicense();
// 	actions.logout();
// }

if (yargs.argv.d == true || yargs.argv.default == true) {
	 actions.createSession("192.168.3.125", "Administrator", "NP26K567", (auth) => {
		 console.log(`[ Session Created ] `.green.bold, auth);
		 actions.createUser(auth, {
		 	"UserName": "44433omarTestUserName",
		 	"Password": "superSecure",
		 	// "Oem": {
		 	// 	"Hpe": {
		 	// 		"Enabled": true,
		 	// 		"DisplayName": "omarTestDisplayName",
		 	// 		"Privilege": "{privilege}"
		 	// 	}
		 	// }
		 })
	 }).catch(er => {
		 console.log('ERRRRRR', er)
	 });
	// actions.login("192.168.3.179", "administrator", "HKXDQ6G6");
	// actions.testConnection("192.168.3.125");
	// console.log("AUTH: ", auth);
}

// iterate through the argv array in a for loop. Use a switch to determine which flag was passed in.
// if the flag is -f, then parse the file and pass the data to the function, increase the counter by 1 to move onto the next flag in the array.
// if the flag is -d, then call the defaultConfig function.
// https://github.com/HewlettPackard/javascript-ilorest-library/blob/master/examples/Redfish/ex48_set_ilo_hostname.js
// this link has js code that can help figure out the uri's for the rest of the functions
// switch (yargs.argv[0]) {
// 	case "f":
// 		data = actions.parseFile(yargs.argv[1]);
// 		break;

// 	default:
// 		console.log("Invalid argument");
// 		break;
// }
