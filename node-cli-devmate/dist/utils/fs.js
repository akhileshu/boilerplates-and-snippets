"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.exists = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
exports.exists = fs_extra_1.default.pathExists;
exports.remove = fs_extra_1.default.remove;
