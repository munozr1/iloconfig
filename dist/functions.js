"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFlags = exports.validateFile = exports.validateConfig = exports.pretty = exports.parseCSV = void 0;
const tslib_1 = require("tslib");
//import fs
const fs_1 = require("fs");
const process_1 = require("process");
// const util = require("util");
/**
 *
 * @param {string} filename The name or path of the file to parse
 * @param {boolean} h Whether or not the files first line is a header
 * @returns {Array} An array of objects representing the data in the file
 * @example
 * input:
 * 192.168.3.214,administrator,8DF985G,newuser,newpassword
 * 192.168.3.514,administrator,8DF985G,newuser,newpassword

 * output:
DATA [
  {
    ip: '192.168.3.214',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },
  {
    ip: '192.168.3.514',
    default_username: 'administrator',
    default_password: '8DF985G',
    new_username: 'newuser',
    new_password: 'newpassword'
  },

  ]
 */
function parseCSV(filename) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        console.log("Parsing CSV file: " + filename);
        let result = [];
        let path = process.cwd();
        // read file
        const data = (yield fs_1.promises
            .readFile(path + "/" + filename, "binary")
            .catch((err) => console.log(err.messages)));
        // Parse contents
        if (data) {
            let lines = data.split("\n");
            let headers = lines[0].split(",");
            for (let i = 0; i < lines.length; i++) {
                let obj = {};
                let currentline = lines[i].split(",");
                for (var j = 0; j < headers.length; j++) {
                    obj[headers[j]] = currentline[j];
                }
                result.push(obj);
            }
            console.log("result", result);
            result.shift();
        }
        return result;
    });
}
exports.parseCSV = parseCSV;
function pretty(obj) {
    return JSON.stringify(obj, null, 2);
}
exports.pretty = pretty;
function validateConfig(configs) {
    let localErrors = [];
    let usedIpAddresses = [];
    let inputHeaders = Object.keys(configs[0]);
    inputHeaders.shift();
    configs.pop();
    configs.forEach((config, i) => {
        //validate the ip address
        if (!config.ip) {
            localErrors.push("IP is required");
        }
        else if (!validIp(config.ip)) {
            localErrors.push("IP is invalid");
        }
        else if (usedIpAddresses.includes(config.ip)) {
            localErrors.push("Duplicate IP", config.ip);
        }
        else {
            usedIpAddresses.push(config.ip);
        }
        // validate headers and check if they have a value
        let errors = [...localErrors, ...validHeaders(inputHeaders, config)];
        if (errors.length > 0) {
            console.log(`SERVER ${i + 1} INVALID: `, errors);
            (0, process_1.exit)(1);
        }
        else {
            console.log(`SERVER ${i + 1} VALID`);
        }
        i++;
    });
    return configs;
}
exports.validateConfig = validateConfig;
function validHeaders(headers, config) {
    let validProperties = [
        "ip",
        "default_username",
        "default_password",
        "new_username",
        "new_password",
        "role",
        "dhcp",
        "new_hostname",
    ];
    let errors = [];
    headers.forEach((header) => {
        if (!config[header]) {
            errors.push("Missing header: " + header);
        }
        else if (config[header] === undefined ||
            config[header] === "" ||
            config[header] === " ") {
            errors.push("Missing value for", header);
        }
        if (!validProperties.includes(header)) {
            errors.push("Invalid header", header);
        }
    });
    return errors;
}
/**
 *
 * @param ip The ip address to validate
 * @returns whether the ip address is valid or not
 */
function validIp(ip) {
    let parts = ip.split(".");
    if (parts.length != 4)
        return false;
    for (let i = 0; i < parts.length; i++) {
        if (parseInt(parts[i]) < 0 || parseInt(parts[i]) > 255)
            return false;
    }
    return true;
}
/**
 *
 * @param args Array of strings (arguments passed in by the user)
 * @returns returns the string that contains the flags if passed in, else it returns an iLOError
 */
function validateFile(args) {
    let filename = "";
    let count = 0;
    args.forEach((arg) => {
        if (arg.includes(".csv")) {
            filename = arg;
            count++;
        }
    });
    if (count < 1)
        return {
            message: "Error: missing file or not a csv file" /* MissingServerFile */,
            resolution: "include csv file with server configuration options",
        };
    else if (count > 1)
        return {
            message: "Error: too many csv files passed in" /* TooManyFiles */,
            resolution: "only include 1 csv file",
        };
    return filename;
}
exports.validateFile = validateFile;
/**
 *
 * @param inputFlags string containg the flags inputted by the user
 * @returns returns a string containing the flag arguments or an iLOError
 */
function validateFlags(args) {
    let invalidFlag;
    let index = 0;
    let count = 0;
    const flags = ["f", "l", "u", "h", "c", "d", "-"];
    args.forEach((arg) => {
        if (arg.includes("-")) {
            count++;
            for (let i = 0; i < arg.length; i++) {
                if (!flags.includes(arg[i])) {
                    invalidFlag = {
                        message: "Error: invalid flag" /* InvalidFlags */,
                        resolution: `remove the ${arg[i]} flag`,
                    };
                }
                else
                    index = i;
            }
        }
    });
    if (count > 1)
        return {
            message: "Error: too many flag arguments have been passed in" /* TooManyFlagArguments */,
            resolution: "remove a -flags arugment",
        };
    if (invalidFlag)
        return invalidFlag;
    return args[index];
}
exports.validateFlags = validateFlags;
//# sourceMappingURL=functions.js.map