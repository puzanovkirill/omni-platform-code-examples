import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import { env } from "process";
import packageJSON from "./package.json";

const BACKEND_URL = packageJSON.proxy;

export default defineConfig({
  plugins: [react(), checker({ typescript: true })],
  server: {
    hmr: true,
    open: true,
    proxy: {
      "/event-service": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/api": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/securos-integration-service": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/internal-api": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/image-api": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/get-image": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
      "/get-realtime-image": {
        target: env.BACKEND_HOST || BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "./build",
  },
  publicDir: "./public",
});
