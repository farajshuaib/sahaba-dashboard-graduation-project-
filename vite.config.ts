import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import GlobalsPolyfills from "@esbuild-plugins/node-globals-polyfill";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
    global: "globalThis",
  },
  plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
  build: {
    rollupOptions: {
      external: ["jss-plugin-globalThis"],
      plugins: [],
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
        // GlobalsPolyfills({
        //   process: true,
        //   buffer: true,
        // }),
      ],
    },
  },
});
