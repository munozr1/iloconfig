#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const functions_1 = require("./functions");
const process_1 = require("process");
const readline = require("readline");
function main() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const usage = "usage: ilo <-f> <file>  ";
        let filename = "";
        // parsed data from csv file
        let file = [];
        // arguments passed in by user
        let argv = process.argv.slice(2);
        //identify and validate the arguments passed in
        while (argv.length) {
            if (argv[0] === "-f") {
                filename = argv[1];
                argv.splice(0, 2);
                yield (0, functions_1.parseCSV)(filename).then((data) => {
                    file = data;
                });
            }
            else {
                console.log("Invalid argument");
                console.log(usage);
                process.exit(1);
            }
        }
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