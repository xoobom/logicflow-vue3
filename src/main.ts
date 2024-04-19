import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import '@/assets/styles/index.scss'; // global css
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import '@/assets/styles/element-ui-theme.scss';
import 'virtual:svg-icons-register'; // svg图标
import elementIcons from '@/utils/elementIcons'; //@element-plus/icons-vue

const app = createApp(App);

app.use(elementIcons);
app.use(ElementPlus, {
  size: 'default',
});
app.mount('#app');
