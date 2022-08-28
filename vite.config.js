import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "http://0.0.0.0:8080/",
  server: {
    origin: "http://0.0.0.0:8080",
    host: "0.0.0.0",
    port: 8080,
  },

  plugins: [react()],
});
