#! /usr/bin/env node
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
// import { Server } from "./actions";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
var functions_1 = require("./functions");
var readline = require("readline");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var usage, filename, file, argv, userConfimation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    usage = "usage: ilo <-f> <file>  ";
                    filename = "";
                    file = [];
                    argv = process.argv.slice(2);
                    _a.label = 1;
                case 1:
                    if (!argv.length) return [3 /*break*/, 5];
                    if (!(argv[0] === "-f")) return [3 /*break*/, 3];
                    filename = argv[1];
                    argv.splice(0, 2);
                    return [4 /*yield*/, (0, functions_1.parseCSV)(filename).then(function (data) {
                            file = data;
                            console.log("file: ", file);
                            // file.pop();
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("Invalid argument");
                    console.log(usage);
                    process.exit(1);
                    _a.label = 4;
                case 4: return [3 /*break*/, 1];
                case 5:
                    userConfimation = readline.createInterface({
                        input: process.stdin,
                        output: process.stdout
                    });
                    //once the user confirms the config file, run the test function
                    return [4 /*yield*/, userConfimation.question("Modify ".concat(file.length, " servers? (y/n)"), function (resp) {
                            if (resp === "y") {
                                test(file);
                            }
                            else {
                                process.exit(0);
                            }
                        })];
                case 6:
                    //once the user confirms the config file, run the test function
                    _a.sent();
                    return [2 /*return*/, 0];
            }
        });
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
    // file.forEach((config) => {
    // 	let server = new Server(config);
    // 	if (config.ip && config.default_username && config.default_password) {
    // 		server.login();
    // 	}
    // 	if (config.new_username && config.new_password && config.role) {
    // 		server.createUser();
    // 	}
    // 	if (config.new_hostname) {
    // 		server.changeHostname();
    // 	}
    // 	if (config.license) {
    // 		server.setLicense();
    // 	}
    // 	if (config.dhcp) {
    // 		server.changeDHCP();
    // 	}
    // 	if (config.static_ip) {
    // 		server.changeIp();
    // 	}
    // });
    //  server.logout();
    // server.login();
    //  server.logout();
}
