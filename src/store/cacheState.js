/**
 * 需要缓存的vuex数据处理方法
 * 浏览器刷新保留数据
 * @param item String类型 参数名
 */
const cacheState = function (item) {
  this.get = function () {
    return sessionStorage.getItem(item) ? JSON.parse(sessionStorage.getItem(item)) : {};
  }
  
  this.set = function (obj) {
    sessionStorage.setItem(item, JSON.stringify(obj));
  }
  
  this.clear = function () {
    sessionStorage.removeItem(item);
  }
}

// 退出登录时清除vuex_cache_data
export default new cacheState('vuex_cache_data');
