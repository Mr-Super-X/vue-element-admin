//例子：
import layout from '@/views/layout/layout'

// 生产环境路由懒加载
const _import = require('../_import_' + process.env.NODE_ENV)

export default [
  {
    path: '/',
    name: 'APP',
    icon: 'iconfont icon-app', //导航所需icon
    meta: {
      keepAlive: true, //是否缓存页面
      title: "APP", //面包屑导航所需标题
    },
    component: layout, //子孙组件都按需加载
    children: [{
      path: 'systemSetting/systemSetting',
      leaf: false,
      component: _import('nav/systemSetting/systemSetting'), //按需引入组件，提高首屏加载速度
      name: 'systemSetting',
      meta: {
        keepAlive: true, //是否缓存页面
        title: "系统设置" //面包屑导航所需标题
      },
    }]
  }
]
