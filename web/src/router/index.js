import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import(/* webpackChunkName: "index" */ '@/layouts/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/home/index.vue'),
      },
      {
        path: '/article/:id',
        name: 'article',
        component: () => import(/* webpackChunkName: "about" */ '@/pages/article/index.vue'),
        props: true,
      },
    ]
  },
  {
    path: '/hero/:id',
    name: 'hero',
    component: () => import(/* webpackChunkName: "about" */ '@/pages/hero/index.vue'),
    props: true,
  },
]

const router = new VueRouter({
  routes
})

export default router
