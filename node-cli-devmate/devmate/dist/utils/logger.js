"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.log = {
    /*
    info: (msg: string) => console.log(chalk.blue("ℹ"), msg),
    success: (msg: string) => console.log(chalk.green("✔"), msg),
    warn: (msg: string) => console.log(chalk.yellow("⚠"), msg),
    error: (msg: string) => console.log(chalk.red("✖"), msg),
    */
    info: (msg, isColoured = false) => logMsg("info", isColoured, msg),
    success: (msg, isColoured = false) => logMsg("success", isColoured, msg),
    warn: (msg, isColoured = false) => logMsg("warn", isColoured, msg),
    error: (msg, isColoured = false) => logMsg("error", isColoured, msg),
};
const styles = {
    info: { icon: "ℹ", color: chalk_1.default.blue },
    success: { icon: "✔", color: chalk_1.default.green },
    warn: { icon: "⚠", color: chalk_1.default.yellow },
    error: { icon: "✖", color: chalk_1.default.red },
};
function logMsg(type, isColoured, msg) {
    const { icon, color } = styles[type];
    console.log(color(icon), isColoured || 1 ? color(msg) : msg);
}
