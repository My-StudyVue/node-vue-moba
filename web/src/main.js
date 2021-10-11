import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ui from '@/components/index.js';
Vue.use(ui);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
