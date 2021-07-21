import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import(/* webpackChunkName: "about" */ '../views/main/Main.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main
  },
]

const router = new VueRouter({
  routes
})

export default router
