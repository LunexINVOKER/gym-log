import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy only used in development (npm run dev)
    proxy: {
      "/users":    "http://localhost:3000",
      "/workouts": "http://localhost:3000",
    },
  },
});