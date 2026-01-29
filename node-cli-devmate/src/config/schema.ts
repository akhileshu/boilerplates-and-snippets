import { z } from "zod";

export const DevmateConfigSchema = z
  .object({
    defaultStack: z.enum(["node-ts", "next"]).default("node-ts"),
    autoInstall: z.boolean().default(true),
    packageManager: z.enum(["npm", "pnpm", "yarn"]).default("npm"),
  })
  .strict();
  
export type DevmateConfig = z.infer<typeof DevmateConfigSchema>;
