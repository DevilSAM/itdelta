import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    name: 'HomePage',
    path: '/',
    component: () => import('../views/HomePage.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
