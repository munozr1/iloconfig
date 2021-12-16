"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCSV = void 0;
const tslib_1 = require("tslib");
//import fs
const fs = (0, tslib_1.__importStar)(require("fs"));
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
    let path = process.cwd();
    console.log("PATH", path + "/" + filename);
    fs.readFile(path + "/" + filename, "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        let lines = data.split("\n");
        let headers = lines[0].split(",");
        let result = [];
        for (let i = 0; i < lines.length; i++) {
            let obj = {};
            let currentline = lines[i].split(",");
            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        result.shift();
        console.log("DATA", result);
        return result;
    });
}
exports.parseCSV = parseCSV;
//# sourceMappingURL=functions.js.map