#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions_1 = require("./functions");
const yargs = require("yargs");
const usage = "usage: ilo <-f> <file>";
const options = yargs
    .usage(usage)
    .options({
    h: {
        alias: "headers",
        describe: "Headers to define ",
        type: "boolean",
        demand: false,
    },
    f: {
        alias: "fileconfig",
        describe: "file containing list of ip addresses, username and password etc",
        type: "string",
        demand: false,
    },
})
    .help(true).argv;
console.log("options", options);
let inputHeaders = [];
let fileHeaders = {};
let filename = "";
let file = [];
file;
let argv = process.argv.slice(2);
console.log("ARGV RAW ARRAY", argv);
while (argv.length) {
    if (argv[0] === "-h") {
        argv.splice(0, 1);
        (0, functions_1.pushHeaders)(inputHeaders, argv);
        console.log("inputHeaders; ", inputHeaders);
        (0, functions_1.setHeaders)(inputHeaders, fileHeaders);
        console.log("fileHeaders: ", fileHeaders);
        // console.log("file: ", file);
    }
    if (argv[0] === "-f") {
        filename = argv[1];
        argv.splice(0, 2);
        console.log("filename: ", filename);
        (0, functions_1.parseCSV)(filename).then(file => {
            console.log("file contents: ", file);
        });
    }
}
// console.log("file length: ", file.length);
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
//# sourceMappingURL=cli.js.map