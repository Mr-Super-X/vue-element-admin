// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store' // vuex

// 重置默认样式
import './assets/css/reset.less'
import 'normalize.css'

// ES6代码转为ES5代码
import 'babel-polyfill'

// 引入api模块配置，组件中可通过（this.$api.module_name.api_name()）调用
import api from './api'
Vue.prototype.$api = api

// 引入工具类配置，组件中可通过（this.$utils.fn_name()）调用
import utils from './utils'
Vue.prototype.$utils = utils

// 公共过滤器引用
import * as filters from './filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// element-ui
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element, { size: 'small', zIndex: 2000 });

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
