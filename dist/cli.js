#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const actions_1 = require("./actions");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const functions_1 = require("./functions");
function main() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        const yargs = require("yargs");
        const usage = "usage: ilo <-f> <file>";
        const options = yargs
            .usage(usage)
            .options({
            f: {
                alias: "fileconfig",
                describe: "file containing list of ip addresses, username and password etc",
                type: "string",
                demand: true,
            },
        })
            .help(true).argv;
        console.log("options", options);
        let fileHeaders = {};
        let filename = "";
        let file = [];
        let argv = process.argv.slice(2);
        console.log("ARGV RAW ARRAY", argv);
        while (argv.length) {
            if (argv[0] === "-f") {
                filename = argv[1];
                argv.splice(0, 2);
                // console.log("filename: ", filename);
                yield (0, functions_1.parseCSV)(filename, fileHeaders).then((data) => {
                    file = data;
                    file.pop();
                    // console.log("file: ", file);
                    console.log("fileHeaders", fileHeaders);
                });
            }
        }
        test(file);
        return 0;
    });
}
main();
function test(file) {
    // let config: CONFIG = {
    // 	ip: "192.168.3.125",
    // 	default_username: "Administrator",
    // 	default_password: "NP26K567",
    // 	new_username: "secondTestUser",
    // 	new_password: "password123",
    // 	role: "Administrator",
    // 	new_hostname: "firstTestHost",
    // 	location:
    // 		"https://192.168.3.125/redfish/v1/SessionService/Sessions/administrator0000000000000f2b15810625/",
    // 	token: "af8dfc21532048003c37e2982d6df0ab",
    // };
    (0, functions_1.validateConfig)(file);
    file.forEach((config) => {
        let server = new actions_1.Server(config);
        if (server.config.ip) {
            console.log("SERVER LOGGED IN SUCCESSFULLY: ", server.config.ip);
        }
        else {
            console.log("SERVER IP NOT PROVIDED", config);
        }
    });
    //  server.logout();
    // server.login();
    //  server.logout();
}
//# sourceMappingURL=cli.js.map