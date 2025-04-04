import path from "path"
import react from "@vitejs/plugin-react"
import glsl from 'vite-plugin-glsl'
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), glsl()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
