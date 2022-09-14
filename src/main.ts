import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';


const pinia = createPinia()

createApp(App).use(pinia).use(router).component('QuillEditor', QuillEditor).mount('#app')
