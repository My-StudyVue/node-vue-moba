import Vue from 'vue'
import App from './App.vue'
import router from './router'
import http from './network/request'

Vue.config.productionTip = false
Vue.prototype.$http = http

// 全局使用自定义组件
import ui from '@/components/index.js';
Vue.use(ui)

//vue-awesome-swiper
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
