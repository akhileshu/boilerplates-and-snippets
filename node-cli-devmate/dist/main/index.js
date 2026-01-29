"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const init_1 = require("../commands/init");
const clean_1 = require("../commands/clean");
const logger_1 = require("../utils/logger");
const program = new commander_1.Command();
program
    .name("devmate")
    .description("Developer helper CLI")
    .version("0.1.0");
program.addCommand(init_1.initCommand);
program.addCommand(clean_1.cleanCommand);
program.parseAsync().catch(err => {
    logger_1.log.error(err.message);
    process.exit(1);
});
