import { createApp } from 'vue';
import App from './renderer/App.vue';
import router from './renderer/router';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(ElementPlus).use(router).mount('#daily');
