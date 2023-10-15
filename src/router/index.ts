import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
      meta: {
        title: "Home",
      },
    },
    {
      path: "/favorites",
      component: () => import("@/pages/favorites.vue"),
      name: "Favorites",
      meta: {
        title: "Favorites",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      component: () => import("@/pages/404.vue"),
      meta: {
        title: "404 - Not found",
      },
    },
  ],
});

router.beforeEach((to) => {
  const title: string = (to.meta.title as keyof object) ?? "404 - Not found";
  document.title = title;
});

export default router;
