import { Command } from "commander";
import { withSpinner } from "../utils/spinner";
import { exists, remove } from "../utils/fs";
import { log } from "../utils/logger";

export const cleanCommand = new Command("clean")
  .description("Remove node_modules and lock files")
  .action(async () => {
    await withSpinner("Cleaning project", async () => {
      if (await exists("node_modules"))
        await remove("node_modules");

      if (await exists("package-lock.json"))
        await remove("package-lock.json");
    });

    log.success("Clean complete");
  });
