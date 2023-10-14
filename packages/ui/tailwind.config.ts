/* eslint-disable -- Disabling ESLint for this file due to specific requirements */
import type { Config } from "tailwindcss";
import { sharedConfig } from "tailwind-config";

const config: Pick<Config, "prefix" | "presets"> = {
  prefix: "ui-",
  presets: [sharedConfig],
};

export default config;
