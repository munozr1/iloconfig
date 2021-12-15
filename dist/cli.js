#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const commander_1 = require("commander");
const inquirer_1 = (0, tslib_1.__importDefault)(require("inquirer"));
const common_prompts_1 = require("./common_prompts");
require("colors");
const servers_1 = require("./servers");
const actions_1 = require("./actions");
const functions_1 = require("./functions");
/**
 * @name users
 * run `npm link to install admin cli`'
 * admin users <args> <options>
 * @example: admin users -uid 1 (get user 1)
 * @example: admin users (list all users)
 * @example: admin users get -uid 1 (get user 1)
 * @example: admin users get (list all users)
 * @example: admin users delete -uid 1 (delete user 1)
 * @example: admin users create (create a user based on propts)
 * @example: admin users create -u newUser -p securePassword (create a user "newUser")
 */
commander_1.program
    .version("0.0.1")
    .command("users")
    .alias("a")
    .argument("<command>", "command name")
    .argument("[verb]", "'create', 'get', 'delete'")
    .addHelpCommand()
    .option("-u, --username <username>", "username to be created")
    .option("-p, --password <password>", "password for new user")
    .option("-uid, --uid <uid>", "User ID")
    .description("Create User account")
    .action((_c, verb, options) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
    const actions = yield actions_1.Actions.init(servers_1.servers.test_server);
    // Create User
    if (verb === 'create') {
        yield (0, functions_1.timeout)(500); // wait for warning to pass
        if (!options.username)
            options.username = (yield inquirer_1.default.prompt([common_prompts_1.prompts.username])).username;
        if (!options.password)
            options.password = (yield inquirer_1.default.prompt([common_prompts_1.prompts.password])).password;
        return yield actions.users.create({
            UserName: options.username,
            Password: options.password,
        });
    }
    // get user(s)
    if (verb === 'get' || !verb) {
        return options.uid
            ? yield actions.users.user(options.uid)
            : yield actions.users.users();
    }
    // delete user
    if (verb === 'delete') {
        yield (0, functions_1.timeout)(500); // wait for warning to pass
        if (!options.uid)
            options.uid = (yield inquirer_1.default.prompt([common_prompts_1.prompts.uid])).uid;
        return yield actions.users.delete(options.uid);
    }
}))
    .parse(process.argv);
//# sourceMappingURL=cli.js.map