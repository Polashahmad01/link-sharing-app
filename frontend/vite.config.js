import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    rollupOptions: {
      // Make sure to use the Vite router properly
      output: {
        // Configure your output paths here if needed
      },
    },
  },
  server: {
    historyApiFallback: true, // Vite doesn't handle this by default
  },
});
