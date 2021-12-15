#! /usr/bin/env node
const inquirer = require('inquirer');
const commander = require('commander');

commander.program
    .version("0.0.1")
    .command("deploy")
    .alias("d")
    .option('-a, --app <app>', 'Heroku App Name <string>')
    .option('-p, --push', 'commit to local git repo.')
    .option('-r, --run', 'compiled site will start on 4000 after deploy')
    .option('-dev, --dev', 'enable dev mode for more context')
    // .option('-p, --prerender', 'enable dev mode for more context')
    // .option('-s, --staging', 'enable dev mode for more context')
    .description('This will compile angular and the express backend. you can optionally prerender // push to github // deploy to Heroku (staging or prod)')
    .action((t) => console.log('deploy', t))
    .parse(process.argv)