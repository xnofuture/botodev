import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080, // Оставляем 8080, так как вы его освободили
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // Удаляем правило rewrite, так как бэкенд уже ожидает /api
      },
    },
  },
  plugins: [
    react(),
    // Temporarily disabled componentTagger due to CSP issues
    // mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
