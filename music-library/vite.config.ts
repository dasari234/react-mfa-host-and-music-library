import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";
import autoprefixer from "autoprefixer";

export default defineConfig({
  optimizeDeps: {
    exclude: ["@rollup/rollup-linux-x64-gnu"],
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "music_library",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App",
      },
      shared: ["react", "react-dom"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      external: ["@rollup/rollup-linux-x64-gnu"],
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
});
