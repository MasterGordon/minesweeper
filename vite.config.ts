import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";
// import { analyzer } from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3003,
  },
  plugins: [
    react(),
    tailwindcss(),
    imagetools(),
    // analyzer()
  ],
});
