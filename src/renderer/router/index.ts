import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import main from '@/renderer/views/main.vue';
import note from '@/renderer/views/note.vue';
import setting from '@/renderer/views/setting.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main
  },
  {
    path: '/note',
    name: 'note',
    component: note
  },
  {
    path: '/setting',
    name: 'setting',
    component: setting
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
