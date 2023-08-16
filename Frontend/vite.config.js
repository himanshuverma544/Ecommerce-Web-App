import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import svgr from "vite-plugin-eslint";
import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({

  base: "/Ecommerce-Web-App",
  plugins: [
    react(),

    svgr({
      svgrOptions: {
        ref: true,
      },
    }),

    eslint({
      cache: false,
      include: ['./src/**/*.js', './src/**/*.jsx'],
      exclude: [],
    })
  ],
});
