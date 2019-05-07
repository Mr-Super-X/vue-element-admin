//vuex模块化状态管理入口文件

//引入依赖
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入状态模块
import common from './modules/common'


//导出模块
export default new Vuex.Store({
  modules: {
    common
  }
})
