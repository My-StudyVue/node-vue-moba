import Vue from 'vue'
import VueRouter from 'vue-router'
const Main = () => import(/* webpackChunkName: "about" */ '../views/main/Main.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        name: '新建分类',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/CategoryEdit.vue')
      },
      {
        path: 'categories/list',
        name: '分类列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/CategoryList.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
