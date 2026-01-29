"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCommand = void 0;
const commander_1 = require("commander");
const prompt_1 = require("../utils/prompt");
const exec_1 = require("../utils/exec");
const logger_1 = require("../utils/logger");
exports.initCommand = new commander_1.Command("init")
    .description("Initialize a project")
    .action(async () => {
    const { stack } = await (0, prompt_1.ask)({
        type: "select",
        name: "stack",
        message: "Choose stack",
        choices: [
            { title: "Node + TS", value: "node-ts" },
            { title: "Next.js", value: "next" }
        ]
    });
    if (stack === "node-ts") {
        await (0, exec_1.run)("npm", ["init", "-y"]);
        await (0, exec_1.run)("npm", ["i", "typescript"]);
    }
    logger_1.log.success("Project initialized");
});
