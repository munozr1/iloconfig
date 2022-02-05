"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.validDP = exports.validateConfig = exports.pretty = exports.setHeaders = exports.pushHeaders = exports.parseCSV = void 0;
//import fs
var fs_1 = require("fs");
var process_1 = require("process");
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
    return __awaiter(this, void 0, void 0, function () {
        var result, path, data, lines, headers, i, obj, currentline, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Parsing CSV file: " + filename);
                    result = [];
                    path = process.cwd();
                    return [4 /*yield*/, fs_1.promises
                            .readFile(path + "/" + filename, "binary")["catch"](function (err) { return console.log(err[0]); })];
                case 1:
                    data = (_a.sent());
                    lines = data.split("\n");
                    headers = lines[0].split(",");
                    for (i = 0; i < lines.length; i++) {
                        obj = {};
                        currentline = lines[i].split(",");
                        for (j = 0; j < headers.length; j++) {
                            obj[headers[j]] = currentline[j];
                        }
                        result.push(obj);
                    }
                    result.shift();
                    console.log("result", result);
                    return [2 /*return*/, result];
            }
        });
    });
}
exports.parseCSV = parseCSV;
function pushHeaders(output, input) {
    console.log("got to push function");
    console.log("output: ", output);
    console.log("input: ", input.length);
    var i;
    for (i = 0; i < input.length && !input[i].includes("-"); i++) {
        output.push(input[i]);
        console.log("push function iteration", i);
    }
    input.splice(0, i);
    return output;
}
exports.pushHeaders = pushHeaders;
function setHeaders(input, output) {
    input.forEach(function (item) {
        output[item] = true;
    });
}
exports.setHeaders = setHeaders;
function pretty(obj) {
    return JSON.stringify(obj, null, 2);
}
exports.pretty = pretty;
function validateConfig(configs) {
    var properties = {
        ip: false,
        dusername: "dpassword",
        dpassword: "dusername",
        nusername: "npassword",
        npassword: "nusername",
        role: "new_username",
        hostname: false,
        static_ip: "dhcp",
        dhcp: false
    };
    var errors = [];
    var ipList = [];
    var inputHeaders = Object.keys(configs);
    configs.forEach(function (config, i) {
        if (!config.ip) {
            errors.push("IP is required");
        }
        else if (!validIp(config.ip)) {
            errors.push("IP is invalid");
        }
        else if (ipList.includes(config.ip)) {
            errors.push("Duplicate IP", config.ip);
        }
        else {
            ipList.push(config.ip);
        }
        // validate dependencies
        inputHeaders.forEach(function (header) {
            if (!validDP(config[header], inputHeaders, properties)) {
                errors.push("Missing property: " + header);
            }
        });
        if (errors.length > 0) {
            console.log("SERVER ".concat(i + 1, " INVALID: "), errors);
            (0, process_1.exit)(1);
        }
        else {
            console.log("SERVER ".concat(i + 1, " VALID"));
        }
        i++;
    });
    return configs;
}
exports.validateConfig = validateConfig;
function validIp(ip) {
    var parts = ip.split(".");
    if (parts.length != 4)
        return false;
    for (var i = 0; i < parts.length; i++) {
        if (parseInt(parts[i]) < 0 || parseInt(parts[i]) > 255)
            return false;
    }
    return true;
}
function validDP(prop, input, properties) {
    if (!properties[prop])
        return true;
    if (input.includes(properties[prop]))
        return true;
    return false;
}
exports.validDP = validDP;
