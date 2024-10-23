import path from "path";
import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [],
  test: {
    environment: "jsdom",
    setupFiles: ["setupTests.ts"],
    globals: true,
    exclude: [...configDefaults.exclude, "**/*.config*.{js,ts}"],
    reporters: ["default", "junit"],
    outputFile: { junit: "coverage/junit-report.xml" },
    coverage: {
      reporter: ["json", "lcov", "text", "clover", "cobertura"],
      exclude: [
        ...configDefaults.exclude,
        "**/__tests__",
        "**/src/app/layout.tsx",
        "**/src/components/ui/**",
        ".next/**",
        "**/*.config.{ts,js,mjs}",
        "*.d.ts",
        "**/lib/data/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
