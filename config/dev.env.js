'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
// 本地开发环境配置
// apiPath —— 后端接口地址
// path —— 前端访问地址配置
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  apiPath: '"http://xxx.xxx.xx"',
  path: '""',
  title: '本地开发'
})
