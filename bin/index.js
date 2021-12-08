#! /usr/bin/env node
const yargs = require("yargs");

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
