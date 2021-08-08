import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import main from '@/renderer/views/main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
