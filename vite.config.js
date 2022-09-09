import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 7811,
  },

  plugins: [react(), splitVendorChunkPlugin()],
});
