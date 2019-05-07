//api入口配置文件，建议模块化管理。

//引入配置文件
import axios from './axiosTool'
import store from '../store/index'
import Vue from 'vue'

//引入api模块
import login from './modules/login'

let apiConfig = {
  login,
}


//公用配置方法
/**
 * get请求时拼接参数
 * @param params 请求参数对象
 * @returns {string} 返回url参数
 */
function formatParams(params) {
  let str = [];
  for (const key in params) {
    str.push(`${key}=${params[key]}`);
  }
  return str.join("&");
}

/**
 * 根据环境生成请求地址
 * @param params 请求参数对象
 * @param item 当前api模块
 * @returns {string|*} 返回url地址
 */
function getUrl(params, item) {
  // 判断环境
  let url = process.env.NODE_ENV === "development" ? "" : process.env.apiPath;
  // 判断请求方式
  url += item.method === 'get' ? `${item.url}?${formatParams(params)}` : item.url;
  return url;
}

/**
 * 处理请求参数追加token
 * @param params 请求参数对象
 * @returns {{token}} 返回处理后的请求参数
 */
let handleToken = (params) => {
  params = params && params.token
    ? params
    : {...params, token: store.getters.token}
  return params
}

/**
 * 生成请求api方法
 * @param apiConfig
 */
function toApi(apiConfig) {
  const api = {};
  // 循环模块
  for (const module in apiConfig) {
    api[module] = {};
    // 循环模块下的请求配置
    apiConfig[module].forEach((item) => {
      // 生成对应请求方法
      api[module][item.name] = (params, headers = {}, callback, errorCallback) => {

        // 全局处理token， 这里可以传也可以不传
        if (item.method === 'post') {
          params = params['token'] ? params : Object.assign({}, {token: store.getters.token}, params)
        }

        return axios({
          method: item.method || 'post',
          url: getUrl(params, item),
          data: handleToken(params),
          headers,
        }).then(response => {
          callback && typeof callback == 'function' && callback(response, params, item);

          if(!response)  return { msg: '请求失败，没有返回信息！' };

          // 登录失效
          if(response.data.status == 507){
            //判断登录失效状态码，清除用户信息跟token，跳转登录页，
            Vue.prototype.$message.error('登录失效，请重新登录')
            store.commit('setUserInfo', {});
            store.commit('setToken', '');
            router.push({ name: "login" });
            return response.data;
          }

          // 接口请求成功，返回后端数据
          return response.data;

        }).catch(error => {
          errorCallback && typeof errorCallback == 'function' && errorCallback(error, params, item);

          return {
            error,
            msg: 'catch —— 请求报错了，捕获错误信息！' + error,
          }
        });
      };
    });
  }
  return api;
}

let api = toApi(apiConfig);
export default api;
