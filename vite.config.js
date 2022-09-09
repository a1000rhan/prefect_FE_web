import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",

  server: {
    proxy: "http://localhost:8080",
    port: 8080,
  },

  plugins: [react(), splitVendorChunkPlugin()],
});
