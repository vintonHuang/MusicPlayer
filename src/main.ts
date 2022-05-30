/*
 * @Author: Vinton
 * @Date: 2022-03-04 21:17:53
 * @Description: file content
 */
import { createApp } from "vue";

import "./utils/rem";
import "@/styles/index.less";
import Pinia from "@/store/index";
import setupPlugins from "@/core/index";
import router from "@/router/index";
import App from "./App.vue";
const app = createApp(App);
setupPlugins();
app.use(Pinia).use(router).mount("#app");
