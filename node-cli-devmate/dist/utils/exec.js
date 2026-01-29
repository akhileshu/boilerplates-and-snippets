"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const execa_1 = require("execa");
const run = (cmd, args = []) => (0, execa_1.execa)(cmd, args, { stdio: "inherit" });
exports.run = run;
