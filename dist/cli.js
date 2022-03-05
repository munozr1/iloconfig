#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const functions_1 = require("./functions");
const process_1 = require("process");
const errors_1 = require("./errors");
const readline = require("readline");
function main() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // const usage = "usage: ilo <-f> <file>  ";
        let argv = process.argv.slice(2);
        let filename = (0, functions_1.validateFile)(argv);
        // parsed data from csv file
        let file = [];
        // arguments passed in by user
        // let inputFlags = validateArgs(argv);
        let inputFlags = (0, functions_1.validateFlags)(argv);
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
        if ((0, errors_1.checkError)(inputFlags)) {
            if (inputFlags.message === "Error: invalid flag" /* InvalidFlags */ ||
                inputFlags.message === "Error: missing flags." /* MissingFlags */) {
                console.log(inputFlags);
                (0, process_1.exit)(1);
            }
        }
        if ((0, errors_1.checkError)(filename)) {
            if (filename.message === "Error: invalid flag" /* InvalidFlags */ ||
                filename.message === "Error: missing flags." /* MissingFlags */) {
                console.log(inputFlags);
                (0, process_1.exit)(1);
            }
        }
        // while (argv.length) {
        // 	if (argv[0].includes("f")) {
        // 		filename = argv[1];
        // 		argv.splice(0, 2);
        // 		await parseCSV(filename).then((data) => {
        // 			file = data;
        // 		});
        // 	} else {
        // 		console.log("Invalid argument");
        // 		console.log(usage);
        // 		process.exit(1);
        // 	}
        // }
        // take in user input
        const userConfimation = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        //once the user confirms the config file, run the test function
        yield userConfimation.question(`Modify ${file.length} servers? (y/n)`, (resp) => {
            if (resp === "y") {
                test(file);
            }
            else {
                process.exit(0);
            }
        });
        return 0;
    });
}
main();
function test(file) {
    (0, functions_1.validateConfig)(file);
    (0, process_1.exit)(0);
}
//# sourceMappingURL=cli.js.map