import { defineConfig, mergeConfig } from "vite";
import { defineConfig as defineConfigVitest } from "vitest/config";

import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";

// https://vite.dev/config/
const viteConfig = defineConfig({
  plugins: [react()],
  base: "/albion-trading/",
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});

const vitestConfig = defineConfigVitest({
  test: { environment: "jsdom" },
});

export default mergeConfig(viteConfig, vitestConfig);
