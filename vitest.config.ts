import { fileURLToPath } from "node:url";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        include: ["tests/unit/**/*.test.ts"],
        environment: "node",
        globals: true,
        alias: {
            "@": path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./src"),
        },
    },
});
