import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "/pre-registration",
        component: () => import("../views/PreRegistration.vue"),
      },
      {
        path: "/success",
        component: () => import("../views/Success.vue"),
      },
      {
        path: "/success:uuid",
        component: () => import("../views/Success.vue"),
      },
      {
        path: "/shop",
        component: () => import("../views/Shop.vue"),
      },
      {
        path: "/reserve",
        component: () => import("../views/Reserve.vue"),
      },
      {
        path: "/reserve:id",
        component: () => import("../views/Reserve.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
