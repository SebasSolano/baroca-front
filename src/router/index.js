import { createRouter, createWebHistory } from "vue-router";
import Main from "../components/Main.vue";

const routes = [
  {
    path: "/",
    component: Main,
    children: [
      {
        path: "",
        component: () => import("../views/PreRegistration.vue"),
      },
    ],
  },
  {
    path: "/reserve",
    component: () => import("../views/Reserve.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
