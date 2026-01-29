import { execa } from "execa";

export const run = (cmd: string, args: string[] = []) =>
  execa(cmd, args, { stdio: "inherit" });
