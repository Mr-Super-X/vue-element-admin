//公共状态模块入口文件。

import cacheState from '@/store/cacheState'
import router from '@/router/index'
import router_filter from '@/utils/routerFilter'
import dynamic_list from '@/router/dynamic_list'

// state
const state = cacheState.get() || {
  token: "", //token信息
  userInfo: {}, //用户信息
  navMenuList: [], //导航栏路由列表
}

// getters
const getters = {
  token: state => state.token,
  userInfo: state => state.userInfo,
  navMenuList: state => state.navMenuList,
}

// actions
const actions = {
  // 触发mutations里面的push navMenuList，传入后台返回路由表数据
  invokePushItems(context, item) {
    context.commit('invokePushItems', item);
  }
}

// mutations
const mutations = {
  // 设置token信息
  setToken(state, data) {
    state.token = data;
  },

  // 设置用户信息
  setUserInfo(state, data) {
    state.userInfo = Object.assign({}, data)
    cacheState.set(state); // 缓存state中的数据
  },

  // 根据后台返回路由表数据，过滤插入新路由
  invokePushItems(state, item) {
    // 如需开发本地功能，需要注释本条过滤代码解开完整路由注释
    let newRouter = router_filter.routerFilter(item, dynamic_list);
    // 完整路由，本地开发时解开注释
    // let newRouter = dynamic_list;
    state.navMenuList = [];
    router.addRoutes(newRouter.concat([{
      path: '*',
      hidden: true,
      redirect: {
        path: '/404'
      }
    }]));
    //缓存一份导航表到本地
    sessionStorage.setItem("navMenuList", JSON.stringify(newRouter));
    state.navMenuList.push(newRouter);
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
