import { Command } from "commander";
import { ask } from "../utils/prompt";
import { saveConfig, getConfigPath } from "../utils/config";
import { log } from "../utils/logger";
import { configValidateCommand } from "./config-validate";

export const configCommand = new Command("config")
  .description("Configure devmate")
  .addCommand(configValidateCommand)
  .action(async () => {
    const answers = await ask([
      {
        type: "select",
        name: "defaultStack",
        message: "Default stack",
        choices: [
          { title: "Node + TS", value: "node-ts" },
          { title: "Next.js", value: "next" },
        ],
      },
      {
        type: "toggle",
        name: "autoInstall",
        message: "Auto install dependencies?",
        initial: true,
        active: "yes",
        inactive: "no",
      },
      {
        type: "select",
        name: "packageManager",
        message: "Package manager",
        choices: ["npm", "pnpm", "yarn"].map((v) => ({
          title: v,
          value: v,
        })),
      },
    ]);

    await saveConfig(answers);
    log.success(`Config saved to ${getConfigPath()}`);
  });
