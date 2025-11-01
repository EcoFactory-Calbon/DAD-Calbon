import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5176,
    proxy: {
      "/chat": {
        target: "https://ia-calbon-plge.onrender.com", // URL do backend remoto
        changeOrigin: true,
        secure: true, // HTTPS válido
      },
    },
  },
});
