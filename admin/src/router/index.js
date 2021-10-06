import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import(/* webpackChunkName: "about" */ '../views')

Vue.use(Router)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/Login.vue'),
    //设置 路由状态
    meta: { isPublic: true },
  },
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
        name: '新建物品',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroEdit.vue'),
      },
      {
        path: 'heroes/list',
        name: '物品列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroList.vue'),
      },
      {
        path: 'heroes/edit/:id',
        name: '物品详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/hero/HeroEdit.vue'),
        props: true,
      },

      //////////////////////////////////////////////////////
      {
        path: 'articles/create',
        name: '新建文章',
        component: () => import(/* webpackChunkName: "about" */ '../views/article/ArticleEdit.vue'),
      },
      {
        path: 'articles/list',
        name: '文章列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/article/ArticleList.vue'),
      },
      {
        path: 'articles/edit/:id',
        name: '文章详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/article/ArticleEdit.vue'),
        props: true,
      },

      /////////////////////////////////////////////////////
      {
        path: 'ads/create',
        name: '新建广告位',
        component: () => import(/* webpackChunkName: "about" */ '../views/ad/AdEdit.vue'),
      },
      {
        path: 'ads/list',
        name: '广告位列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/ad/AdList.vue'),
      },
      {
        path: 'ads/edit/:id',
        name: '广告位详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/ad/AdEdit.vue'),
        props: true,
      },

      /////////////////////////////////////////////////////
      {
        path: 'admin_users/create',
        name: '新建广告位',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminEdit.vue'),
      },
      {
        path: 'admin_users/list',
        name: '广告位列表',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminList.vue'),
      },
      {
        path: 'admin_users/edit/:id',
        name: '广告位详情',
        component: () => import(/* webpackChunkName: "about" */ '../views/admin/AdminEdit.vue'),
        props: true,
      },
    ]
  },
]

const router = new Router({
  routes
})

// 设置全局前置导航守卫
router.beforeEach((to, form, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
