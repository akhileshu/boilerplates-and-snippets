import { Command } from "commander";
import { initCommand } from "../commands/init";
import { cleanCommand } from "../commands/clean";
import { log } from "../utils/logger";
import { configCommand } from "../commands/config";
import { depsCommand } from "../commands/deps";

const program = new Command();

program
  .name("devmate")
  .description("Developer helper CLI")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(cleanCommand);
program.addCommand(configCommand);
program.addCommand(depsCommand);

program.parseAsync().catch(err => {
  log.error(err.message);
  process.exit(1);
});
