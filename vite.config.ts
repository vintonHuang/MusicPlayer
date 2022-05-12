/*
 * @Author: Vinton
 * @Date: 2022-03-04 21:17:53
 * @Description: file content
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import postCssPxToRem from "postcss-pxtorem";
import styleImport, { VantResolve } from "vite-plugin-style-import";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    https: false,
    proxy: {
      "/api": {
        target: "https://wsy.dianchu.com",
        changeOrigin: true,
      },
      "/client_event": {
        target: "https://uat-api-log.9longe.net:8110/adtrace.v2",
        changeOrigin: true,
      },
    },
  },
  build: {
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${path.resolve(
            __dirname,
            "src/styles/main.less"
          )}";`, // src/css/common.less 是你需要全局变量 （你定义的定义的方法 和 变量等）
        },
        javascriptEnabled: true,
      },
    },

    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue({ file }) {
            return file.indexOf("vant") !== -1 ? 37.5 : 75;
          },
          propList: ["*"], // 需要转换的属性，这里选择全部都进行转换
          // exclude: ["node_modules"],
          selectorBlackList: [".noUseToRem-"],
        }),
      ],
    },
  },
});
