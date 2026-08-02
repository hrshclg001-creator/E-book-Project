import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  proxy : {
    '/api' : 'http://localhost:8000',
  },
  plugins: [react(), tailwindcss()],
});
