import Vue from 'vue';
import App from './App.vue';
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import './styles/element-variables.scss';
import '@/styles/index.scss'; // global css
import SvgIcon from '@/components/SvgIcon';
import './icons'; // icon
Vue.component('svg-icon', SvgIcon);

Vue.config.productionTip = false;

Vue.use(Element, {
  size: 'medium', // set element-ui default size
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
