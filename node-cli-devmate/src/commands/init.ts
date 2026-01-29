import { Command } from "commander";
import { ask } from "../utils/prompt";
import { run } from "../utils/exec";
import { log } from "../utils/logger";

import { loadConfig } from "../utils/config";

export const initCommand = new Command("init")
  .description("Initialize a project")
  .action(async () => {
    const config = await loadConfig();

    const { stack } = await ask({
      type: "select",
      name: "stack",
      message: "Choose stack",
      initial: config.defaultStack === "next" ? 1 : 0,
      choices: [
        { title: "Node + TS", value: "node-ts" },
        { title: "Next.js", value: "next" },
      ],
    });

    if (stack !== "node-ts") return;
    if (!config.autoInstall) return;
    if (!config.packageManager) return;


    await run(config.packageManager, ["init", "-y"]);
    await run(config.packageManager, ["i", "typescript"]);

    log.success("Project initialized");
  });
