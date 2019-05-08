//登录状态模块入口文件。示例：

// state
const state = {
  isLogin: false, //登录状态存储
}

// getters
const getters = {
  isLogin: state => state.isLogin
}

// actions
const actions = {
  //获取登录状态
  getLoginStatus(context, item) {
    context.commit('setLoginStatus', item);
  }
}

// mutations
const mutations = {
  //设置登录状态
  setLoginStatus(state, item) {
    state.isLogin = item;
  }
}

export default {
  // vuex中的store分模块管理，需要在store的index.js中引入各个模块，为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，
  // 之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名
  // 调用示例1(getters)：this.$store.getters['login/isLogin'];
  // 调用示例2(actions)：this.$store.dispatch('login/getLoginStatus', data);
  // 调用示例3(mutations)：this.$store.commit('login/setLoginStatus', data);
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
