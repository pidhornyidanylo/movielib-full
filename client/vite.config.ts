import { defineConfig } from "vite";

export default defineConfig({
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173,
  },
  // @ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./vitest.setup.ts",
    coverage: {
      provider: "istanbul",
    },
  },
});
