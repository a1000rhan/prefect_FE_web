import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    port: 80,
    proxy: {
      "/": {
        target: "http://localhost:3030",
      },
    },
  },

  plugins: [react()],
});
