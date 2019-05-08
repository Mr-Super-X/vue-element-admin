import Vue from 'vue'
import Router from 'vue-router'

// 静态模块
import Login from '@/views/login/login'
import layout from '@/views/layout/layout'

// 动态路由模块，此处只提供开发环境使用，生产环境需要注释掉路由的权限表
import dynamic_list from './dynamic_list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Welcome',
      component: layout,
      hidden: true,
      meta: {
        keepAlive: false,
        title: '欢迎'
      },
      children: [{
        path: '/welcome',
        name: 'welcome',
        leaf: false,
        component: () => import('@/views/welcome/welcome'),
        meta: {
          keepAlive: false,
          title: "欢迎登录"
        }
      }]
    },
    {
      path: '/',
      name: '404',
      component: layout,
      hidden: true,
      meta: {
        keepAlive: false,
        title: '404'
      },
      children: [{
        path: '/404',
        name: 'error_404',
        leaf: false,
        component: () => import('@/views/404/error_404'),
        meta: {
          keepAlive: false,
          title: "404错误"
        }
      }]
    },
    {
      path: '/',
      name: '500',
      component: layout,
      hidden: true,
      meta: {
        keepAlive: false,
        title: '500'
      },
      children: [{
        path: '/500',
        name: 'error_500',
        leaf: false,
        component: () => import('@/views/500/error_500'),
        meta: {
          keepAlive: false,
          title: "500错误"
        }
      }]
    },
    //开发新功能，开启本地路由表，并注释掉vuex中对路由表的处理代码
    ...dynamic_list
  ]
})
