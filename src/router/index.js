import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index' // 引入vuex

// 基础布局组件
import layout from '@/views/layout/layout'

// 生产环境路由懒加载
const _import = require('./_import_' + process.env.NODE_ENV)

// 动态路由模块，此处只提供开发环境使用，生产环境需要注释掉路由的权限表
import dynamic_list from './dynamic_list'

Vue.use(Router)

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: _import('login/login')
    },
    {
      path: '/401',
      name: 'Page401',
      hidden: true,
      component: _import('error-page/401')
    },
    {
      path: '/404',
      name: 'Page404',
      hidden: true,
      component: _import('error-page/404')
    },
    {
      path: '/',
      name: 'Welcome',
      component: layout,
      hidden: true, //判断路由入口是否可见
      meta: {
        keepAlive: false,
        title: '欢迎'
      },
      children: [{
        path: '/welcome',
        name: 'welcome',
        leaf: false,
        component: _import('welcome/welcome'),
        meta: {
          keepAlive: false,
          title: "欢迎登录"
        }
      }]
    },
    {
      path: '/',
      name: 'Help',
      component: layout,
      hidden: true,
      meta: {
        keepAlive: false,
        title: '帮助'
      },
      children: [{
        path: '/help',
        name: 'help',
        leaf: false,
        component: _import('help/help'),
        meta: {
          keepAlive: false,
          title: "使用帮助"
        }
      }]
    },
    {path: '*', redirect: '/404', hidden: true},
    //开发新功能，开启本地路由表，并注释掉vuex中对路由表的处理代码
    ...dynamic_list
  ]
})


//路由导航拦截，全局钩子，可以在这里做校验（登陆和权限）
router.beforeEach((to, from, next) => {
  // 不需要登录权限的路由数组
  const nextRoute = ['login', 'Page401', 'Page404'];
  // 获取vuex中保存的token信息
  const token = store.getters.token;

  if (nextRoute.indexOf(to.name) !== -1) {
    // 不需要登录权限的页面直接跳转
    next();
  } else {
    // 需要校验的路由，在这里进行处理
    // 查看登录权限
    if (!token) {
      next({name: 'login'});
    } else {
      next();
    }
  }


})

export default router
