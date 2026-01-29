"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withSpinner = void 0;
const ora_1 = __importDefault(require("ora"));
const withSpinner = async (text, fn) => {
    const spinner = (0, ora_1.default)(text).start();
    try {
        const result = await fn();
        spinner.succeed();
        return result;
    }
    catch (e) {
        spinner.fail();
        throw e;
    }
};
exports.withSpinner = withSpinner;
