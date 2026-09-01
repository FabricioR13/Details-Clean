import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  base: "/Details-Clean/", // Adicionado para o GitHub Pages funcionar
  plugins: [react(), tailwindcss()], // Removido o viteSingleFile
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
