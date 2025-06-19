import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [".ngrok-free.app"], // Cho phép tất cả domain ngrok
    // Nếu muốn chỉ cho 1 domain cụ thể: ['2be2-203-113-186-190.ngrok-free.app']
  },
});
