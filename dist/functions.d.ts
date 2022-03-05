import { iLOError } from "./errors";
import { CONFIG } from "./interfaces";
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
export declare function parseCSV(filename: string): Promise<CONFIG[]>;
export declare function pretty(obj: any): string;
export declare function validateConfig(configs: CONFIG[]): CONFIG[];
/**
 *
 * @param args Array of strings (arguments passed in by the user)
 * @returns returns the string that contains the flags if passed in, else it returns an iLOError
 */
export declare function validateFile(args: string[]): string | iLOError;
/**
 *
 * @param inputFlags string containg the flags inputted by the user
 * @returns returns a string containing the flag arguments or an iLOError
 */
export declare function validateFlags(args: string[]): string | iLOError;
