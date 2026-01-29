import chalk from "chalk";

export const log = {
  /*
  info: (msg: string) => console.log(chalk.blue("ℹ"), msg),
  success: (msg: string) => console.log(chalk.green("✔"), msg),
  warn: (msg: string) => console.log(chalk.yellow("⚠"), msg),
  error: (msg: string) => console.log(chalk.red("✖"), msg),
  */
  info: (msg: string, isColoured = false) => logMsg("info", isColoured, msg),
  success: (msg: string, isColoured = false) => logMsg("success", isColoured, msg),
  warn: (msg: string, isColoured = false) => logMsg("warn", isColoured, msg),
  error: (msg: string, isColoured = false) => logMsg("error", isColoured, msg),
};

type LogType = "info" | "success" | "warn" | "error";

const styles = {
  info: { icon: "ℹ", color: chalk.blue },
  success: { icon: "✔", color: chalk.green },
  warn: { icon: "⚠", color: chalk.yellow },
  error: { icon: "✖", color: chalk.red },
};

function logMsg(type: LogType, isColoured: boolean, msg: string) {
  const { icon, color } = styles[type];

  console.log(color(icon), isColoured || 1 ? color(msg) : msg);
}

