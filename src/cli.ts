#! /usr/bin/env node
import { program } from "commander";
import inquirer from "inquirer";
import { prompts } from "./common_prompts";
import 'colors';
import { servers } from "./servers";
import { Actions } from "./actions";
import { timeout } from "./functions";

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
program
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
    .action(async (_c: any, verb: any, options: any) => {
        const actions = await Actions.init(servers.test_server);

        // Create User
        if(verb === 'create') {
            await timeout(500); // wait for warning to pass
            if(!options.username) options.username = (await inquirer.prompt([prompts.username])).username;
            if(!options.password) options.password = (await inquirer.prompt([prompts.password])).password;
            return await actions.users.create({
                UserName: options.username,
                Password: options.password,
            })
        }

        // get user(s)
        if(verb === 'get' || !verb) {
            return options.uid
              ? await actions.users.user(options.uid)
              : await actions.users.users();
        }
        
        // delete user
        if(verb === 'delete') {
            await timeout(500); // wait for warning to pass
            if(!options.uid) options.uid = (await inquirer.prompt([prompts.uid])).uid;
            return await actions.users.delete(options.uid)
        }

    })
    .parse(process.argv);