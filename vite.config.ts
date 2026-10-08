/**
 * Vite and Vitest configuration.
 *
 * React Compiler runs through its Babel plugin so that every component is
 * compiled during development, testing and production builds.
 */
import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // Inline empty PostCSS config: plain CSS only, and no PostCSS config outside the repo may leak in.
  css: { postcss: {} },
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test-setup.ts"],
  },
});
