/**
 * 路由过滤器
 * @param  {Array} userRouter 后台返回的用户权限json
 * @param  {Array} allRouter  前端配置好的所有动态路由的集合
 * @return {Array} realRoutes 过滤后的路由表
 */
export function routerFilter(userRouter = [], allRouter = []) {
  let realRoutes = [];
  let news = [];
  let dd = [];
  allRouter.forEach((v, i) => {
    userRouter.forEach((item, index) => {
      //模块存在是否判断
      if (item.action === v.name) {
        //  console.log(v.name)
        //第一层菜单判断
        if (item.child && item.child.length > 0) {
          let b1 = [];
          v.children.forEach((k, index) => {
            item.child.forEach((j, index) => {
              if (j.action === k.name) {
                b1.push(k)
              }
            })
          })
          v.children = b1;
          realRoutes.push(v);
        }
      }
    });
  });
  return realRoutes;
}

/**
 * 递归为所有有子路由的路由设置第一个children.path为默认路由
 * @param {Array} routes 用户过滤后的路由
 */
export function setDefaultRoute(routes) {
  routes.forEach((v, i) => {
    if (v.children && v.children.length > 0) {
      v.redirect = {
        name: v.children[0].name
      }
      setDefaultRoute(v.children)
    }
  })
}

export default {
  routerFilter
}
