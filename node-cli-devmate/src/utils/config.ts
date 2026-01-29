import os from "os";
import path from "path";
import fs from "fs-extra";
import { DevmateConfigSchema, DevmateConfig } from "../config/schema";
import { log } from "./logger";
import { ZodError } from "zod";

const CONFIG_FILE = ".devmaterc.json";
const configPath = path.join(os.homedir(), CONFIG_FILE);

const backupInvalidConfig = async () => {
  const backupPath = `${configPath}.bak`;
  await fs.copy(configPath, backupPath, { overwrite: true });
  log.info(`Invalid config backed up to: ${backupPath}`);
};

export const getConfigPath = () => configPath;

export const loadConfig = async (): Promise<DevmateConfig> => {
  if (!(await fs.pathExists(configPath))) return DevmateConfigSchema.parse({});

  try {
    const raw = await fs.readJson(configPath);
    return DevmateConfigSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) {
      log.error("Invalid devmate config");

      await backupInvalidConfig();

      err.issues.forEach(issue => {
        if (issue.code === "unrecognized_keys") {
          log.warn(`Unknown key(s): ${issue.keys.join(", ")}`);
        } else {
          log.warn(`${issue.path.join(".")}: ${issue.message}`);
        }
      });

      printExampleConfig();

      log.info(`Fix the config: ${configPath}`);
      log.info("Or re-run: devmate config");

      process.exit(1);
    }

    throw err;
  }

};

export const saveConfig = async (config: unknown) => {
  const parsed = DevmateConfigSchema.safeParse(config);

  if (!parsed.success) {
    log.error("Config not saved. Issues found:");

    parsed.error.issues.forEach((issue) => {
      log.warn(`${issue.path.join(".")}: ${issue.message}`);
    });

    log.info("Please re-run: devmate config");
    process.exit(1);
  }

  await fs.writeJson(configPath, parsed.data, { spaces: 2 });
};

const printExampleConfig = () => {
  log.info("Example valid config:");

  console.log(`
{
  "defaultStack": "node-ts",
  "autoInstall": true,
  "packageManager": "npm"
}
`);
};
