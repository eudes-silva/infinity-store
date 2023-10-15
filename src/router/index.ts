import { createRouter, createWebHistory } from "vue-router";
import layoutDefault from "@/layouts/default.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: layoutDefault,
      name: "Home",
      children: [
        {
          path: "/",
          name: "Home",
          component: () => import("@/pages/index.vue"),
        },
      ],
      meta: {
        title: "Home",
      },
    },
    {
      path: "/favorites",
      component: layoutDefault,
      name: "Favorites",
      children: [
        {
          path: "/favorites",
          name: "Favorites",
          component: () => import("@/pages/favorites.vue"),
        },
      ],
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
