//登录状态模块入口文件。
import router from '@/router/index'
import router_filter from '@/utils/routerFilter'
import dynamic_list from '@/router/dynamic_list'

// state
const state = {
  isLogin: false, //登录状态存储
  navMenuList: [], //导航栏路由列表
}

// getters
const getters = {
  renderMenuList(state) { //承载变化的navMenuList
    return state.navMenuList;
  }
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
  // 根据后台返回路由表数据，过滤插入新路由
  invokePushItems(state, items) {
    // 如需开发本地功能，需要注释本条过滤代码解开完整路由注释
    let newRouter = router_filter.routerFilter(items, dynamic_list);
    // 完整路由，本地开发时解开
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
  // vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
  // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
