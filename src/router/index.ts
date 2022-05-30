/*
 * @Author: Vinton
 * @Date: 2022-03-04 22:17:32
 * @Description: file content
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/view/Home/index.vue"), // 注意这里要带上 文件后缀.vue
  },
  {
    path: "/MusicPlayer",
    name: "MusicPlayer",
    component: () => import("@/view/MusicPlayer/index.vue"), // 注意这里要带上 文件后缀.vue
  },
  {
    path: "/Toast",
    name: "Toast",
    component: () => import("@/view/Toast/index.vue"), // 注意这里要带上 文件后缀.vue
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
