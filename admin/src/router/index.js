import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import(/* webpackChunkName: "about" */ '../views')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      {
        path: 'categories/create',
        name: '新建分类',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/CategoryEdit.vue'),
      },
      {
        path: 'categories/list',
        name: '分类列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/CategoryList.vue'),
      },
      {
        path: 'categories/edit/:id',
        name: '分类详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/category/CategoryEdit.vue'),
        props: true,
        /**
         * props: true,
         * 表示 任何的url 参数(比如id),都注入到CategoryEdit 页面里，就可以直接在页面进行接受和使用变量id
         * 和 使用 this.$route.params.id 效果一样
         */
      },

      //////////////////////////////////////////////////////
      {
        path: 'items/create',
        name: '新建物品',
        component: () => import(/* webpackChunkName: "about" */ '../views/item/ItemEdit.vue'),
      },
      {
        path: 'items/list',
        name: '物品列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/item/ItemList.vue'),
      },
      {
        path: 'items/edit/:id',
        name: '物品详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/item/ItemEdit.vue'),
        props: true,
      },

      //////////////////////////////////////////////////////
      {
        path: 'heroes/create',
        name: '新建英雄',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroEdit.vue'),
      },
      {
        path: 'heroes/list',
        name: '英雄列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroList.vue'),
      },
      {
        path: 'heroes/edit/:id',
        name: '英雄详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroEdit.vue'),
        props: true,
      },
    ]
  },
]

const router = new Router({
  routes
})

export default router
