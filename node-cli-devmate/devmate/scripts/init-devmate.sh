#!/usr/bin/env bash

set -e

APP_NAME="devmate"

echo "🚀 Initializing $APP_NAME CLI project..."

mkdir -p $APP_NAME/{bin,src/{main,commands,utils,config}}

cd $APP_NAME

# ---------------- package.json ----------------
cat > package.json <<EOF
{
  "name": "$APP_NAME",
  "version": "0.1.0",
  "bin": {
    "$APP_NAME": "bin/$APP_NAME.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "ts-node src/main/index.ts"
  }
}
EOF

# ---------------- tsconfig.json ----------------
cat > tsconfig.json <<EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
  }
}
EOF

# ---------------- bin entry ----------------
cat > bin/$APP_NAME.js <<EOF
#!/usr/bin/env node
require("../dist/main/index.js");
EOF
chmod +x bin/$APP_NAME.js

# ---------------- main entry ----------------
cat > src/main/index.ts <<EOF
import { Command } from "commander";
import { initCommand } from "../commands/init";
import { cleanCommand } from "../commands/clean";
import { log } from "../utils/logger";

const program = new Command();

program
  .name("$APP_NAME")
  .description("Developer helper CLI")
  .version("0.1.0");

program.addCommand(initCommand);
program.addCommand(cleanCommand);

program.parseAsync().catch(err => {
  log.error(err.message);
  process.exit(1);
});
EOF

# ---------------- utils ----------------
cat > src/utils/logger.ts <<EOF
import chalk from "chalk";

export const log = {
  info: (msg: string) => console.log(chalk.blue("ℹ"), msg),
  success: (msg: string) => console.log(chalk.green("✔"), msg),
  warn: (msg: string) => console.log(chalk.yellow("⚠"), msg),
  error: (msg: string) => console.log(chalk.red("✖"), msg),
};
EOF

cat > src/utils/spinner.ts <<EOF
import ora from "ora";

export const withSpinner = async <T>(
  text: string,
  fn: () => Promise<T>
): Promise<T> => {
  const spinner = ora(text).start();
  try {
    const result = await fn();
    spinner.succeed();
    return result;
  } catch (e) {
    spinner.fail();
    throw e;
  }
};
EOF

cat > src/utils/exec.ts <<EOF
import { execa } from "execa";

export const run = (cmd: string, args: string[] = []) =>
  execa(cmd, args, { stdio: "inherit" });
EOF

cat > src/utils/prompt.ts <<EOF
import prompts from "prompts";
export const ask = prompts;
EOF

cat > src/utils/fs.ts <<EOF
import fs from "fs-extra";

export const exists = fs.pathExists;
export const remove = fs.remove;
EOF

# ---------------- commands ----------------
cat > src/commands/init.ts <<EOF
import { Command } from "commander";
import { ask } from "../utils/prompt";
import { run } from "../utils/exec";
import { log } from "../utils/logger";

export const initCommand = new Command("init")
  .description("Initialize a project")
  .action(async () => {
    const { stack } = await ask({
      type: "select",
      name: "stack",
      message: "Choose stack",
      choices: [
        { title: "Node + TS", value: "node-ts" },
        { title: "Next.js", value: "next" }
      ]
    });

    if (stack === "node-ts") {
      await run("npm", ["init", "-y"]);
      await run("npm", ["i", "typescript"]);
    }

    log.success("Project initialized");
  });
EOF

cat > src/commands/clean.ts <<EOF
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
EOF

# ---------------- install deps ----------------
npm install commander execa chalk ora prompts fs-extra
npm install -D typescript ts-node @types/node

echo "✅ $APP_NAME initialized"
echo "👉 cd $APP_NAME && npm run dev"
