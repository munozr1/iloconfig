#! /usr/bin/env node
const yargs = require("yargs");
const actions = require("./actions.js");
let obj = new Object();
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

let data = actions.parseFile(filename);
function defaultConfig() {
	actions.login();
	actions.changeIp();
	actions.createUser();
	actions.dhcpOff();
	actions.changeHostname();
	actions.setLicense();
	actions.logout();
}

if (yargs.argv.d == true || yargs.argv.default == true) {
	actions.login();
}

// iterate through the argv array in a for loop. Use a switch to determine which flag was passed in.
// if the flag is -f, then parse the file and pass the data to the function, increase the counter by 1 to move onto the next flag in the array.
// if the flag is -d, then call the defaultConfig function.

switch (yargs.argv[0]) {
	case "f":
		data = actions.parseFile(yargs.argv[1]);
		break;

	default:
		console.log("Invalid argument");
		break;
}
