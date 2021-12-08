#! /usr/bin/env node
const yargs = require("yargs");
const utils = require("./utils.js");
const http = require("./http.js");
const axios = require("axios").default;
const https = require("https");

const usage = "ilo <function> <file>";
const options = yargs
	.usage(usage)
	.option("t", {
		alias: "tv2",
		describe: "TV2 default configuration",
		type: "boolean",
		demandOption: false,
	})
	.help(true).argv;

//parse arguments passed in

const agent = new https.Agent({
	rejectUnauthorized: false,
});

if (yargs.argv.t == true || yargs.argv.tv2 == true) {
	axios
		.get("https://192.168.3.214/redfish/v1/", { httpsAgent: agent })
		.then((resp) => {
			console.log("RESP", resp);
		});
	return;
}
