'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 测试环境打包配置
// apiPath —— 后端接口地址
// path —— 前端访问地址配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"test"',
  apiPath: '"http://xxx.xxx.xx"',
  path: '"http://xxx.xxx.xx"',
  title: '测试',
})
