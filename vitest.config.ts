import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
      // Next.js 모듈 mock 처리
      "next/navigation": path.resolve(
        __dirname,
        "__tests__/__mocks__/next/navigation.ts"
      ),
      "next/link": path.resolve(
        __dirname,
        "__tests__/__mocks__/next/link.tsx"
      ),
      "next/image": path.resolve(
        __dirname,
        "__tests__/__mocks__/next/image.tsx"
      ),
      "next/headers": path.resolve(
        __dirname,
        "__tests__/__mocks__/next/headers.ts"
      ),
      "next/router": path.resolve(
        __dirname,
        "__tests__/__mocks__/next/router.ts"
      ),
    },
  },
});
