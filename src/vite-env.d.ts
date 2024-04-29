/// <reference types="vite/client" />

//修复找不到.vue类型声明
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const vueComponent: DefineComponent<{}, {}, any>;
  export default vueComponent;
}
