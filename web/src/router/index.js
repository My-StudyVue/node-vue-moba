import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: '/',
  //   redirect: {
  //     name: 'comLogin'
  //   }
  // },
  {
    path: '/',
    // name: 'main',
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
      },
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/pages/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
