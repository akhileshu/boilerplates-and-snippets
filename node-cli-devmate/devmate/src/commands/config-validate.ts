import { Command } from "commander";
import fs from "fs-extra";
import { ZodError } from "zod";
import { DevmateConfigSchema } from "../config/schema";
import { getConfigPath } from "../utils/config";
import { log } from "../utils/logger";

export const configValidateCommand = new Command("validate")
  .description("Validate devmate config")
  .action(async () => {
    const path = getConfigPath();

    if (!(await fs.pathExists(path))) {
      log.warn("No config file found");
      return;
    }

    try {
      const raw = await fs.readJson(path);
      DevmateConfigSchema.parse(raw);
      log.success("Config is valid");
    } catch (err) {
      if (err instanceof ZodError) {
        log.error("Config is invalid");

        err.issues.forEach((issue) => {
          if (issue.code === "unrecognized_keys") {
            log.warn(`Unknown key(s): ${issue.keys.join(", ")}`);
          } else {
            log.warn(`${issue.path.join(".")}: ${issue.message}`);
          }
        });

        process.exit(1);
      }

      throw err;
    }
  });
