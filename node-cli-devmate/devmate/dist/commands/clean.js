"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanCommand = void 0;
const commander_1 = require("commander");
const spinner_1 = require("../utils/spinner");
const fs_1 = require("../utils/fs");
const logger_1 = require("../utils/logger");
exports.cleanCommand = new commander_1.Command("clean")
    .description("Remove node_modules and lock files")
    .action(async () => {
    await (0, spinner_1.withSpinner)("Cleaning project", async () => {
        if (await (0, fs_1.exists)("node_modules"))
            await (0, fs_1.remove)("node_modules");
        if (await (0, fs_1.exists)("package-lock.json"))
            await (0, fs_1.remove)("package-lock.json");
    });
    logger_1.log.success("Clean complete");
});
