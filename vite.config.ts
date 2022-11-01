import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import { VitePWA } from "vite-plugin-pwa";

const production = process.env.NODE_ENV === "production";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    global: "globalThis",
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    VitePWA({
      injectRegister: 'auto',
      registerType: "autoUpdate",
      useCredentials: true,
      workbox: {
        clientsClaim: true,
        skipWaiting: true,
      },
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "sahaba NFT marketplace",
        short_name: "SHB",
        description: "",
        theme_color: "#0084c7",
        background_color: "#fff",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "favicon-16x16.png",
            sizes: "16x16",
            type: "image/png",
          },
          {
            src: "favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",
      },
      devOptions: {
        enabled: !production
      }
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      external: ["jss-plugin-globalThis"],
      plugins: [
      ],
    },
    // ↓ Needed for build if using WalletConnect and other providers
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        GlobalsPolyfills({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
});
