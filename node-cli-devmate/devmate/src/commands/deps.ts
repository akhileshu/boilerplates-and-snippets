import { Command } from "commander";
import fs from "fs-extra";
import { createTable } from "../utils/table";
import { log } from "../utils/logger";
import chalk from "chalk";

export const depsCommand = new Command("deps")
  .description("List dependencies")
  .action(async () => {
    if (!(await fs.pathExists("package.json"))) {
      log.error("No package.json found");
      return;
    }

    const pkg = await fs.readJson("package.json");
    const deps = pkg.dependencies ?? {};

    if (Object.keys(deps).length === 0) {
      log.warn("No dependencies found");
      return;
    }

    const table = createTable({
      head: ["Package", "Version"],
      //   colWidths: [20, 20],
    });

    Object.entries(deps).forEach(([name, version]) => {
      table.push([chalk.gray(name), version] as any);
    });

    console.log(String(table));
  });
