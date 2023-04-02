import { createRouter, createWebHistory } from "vue-router";
import { localStorageGet } from "@/utils/localstorage";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import("../views/login/login.vue"),
    },
    {
      path: "/index",
      name: "首页",
      component: () => import("@/views/layout/index.vue"),
      children: [
        {
          path: "/home",
          name: "home",
          component: () => import("@/views/Home/HomeView.vue"),
        },
        {
          path: "/group",
          name: "group",
          component: () => import("@/views/Group/Group.vue"),
        },
        {
          path: "/website",
          name: "website",
          component: () => import("@/views/Website/Website.vue"),
        },
        {
          path: "/banner",
          name: "banner",
          component: () => import("@/views/Banner/Banner.vue"),
        },
      ],
    },
    {
      path: "/",
      name: "default",
      redirect: "/front",
      component: () => import("../views/front/front.vue"),
      children: [
        {
          path: "/front",
          name: "front",
          component: () => import("../views/front/index/index.vue"),
        },
        {
          path: "/search",
          name: "search",
          component: () => import("../views/front/search/search.vue"),
        },
        {
          path: "/more",
          name: "more",
          component: () => import("../views/front/group/group.vue"),
        },
        {
          path: "/disclaimer",
          name: "disclaimer",
          component: () => import("../views/front/disclaimer/disclaimer.vue"),
        },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 进度条设置为0
  nprogress.start();

  if (["/login", "/front", "/more", "/disclaimer", "/search"].indexOf(to.path) !== -1) {
    next(); // 跳转到目标路径
    return;
  }

  const token = localStorageGet("AuthToken");
  const user = localStorageGet("User");
  if (Object.keys(token).length === 0 || Object.keys(user).length === 0) {
    next("/login");
    return;
  }
  next();
});

router.afterEach((to, from, next) => {
  // 进度条显示完成
  nprogress.done();
});

export default router;
