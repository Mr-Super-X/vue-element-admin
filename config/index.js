'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

let env = require("./prod.env.js");

//process.argv：读取当前运行的package.json中scripts命令以空格隔开组成的数组
//process.argv[2]: 读取数组第二项如："build": "node build/build.js pro",读取的就是pro

switch (process.argv[2]) {
  case "pro":
    env = require("./prod.env.js");
    break;
  case "test":
    env = require("./test.env.js");
    break;
  case "pre":
    env = require("./pre.env.js");
    break;
}
if(process.argv[2] === '--inline') {
  console.log('开始运行本地开发环境...');
}else {
  console.log('开始打包' + env.title + '环境...');
}
console.log('当前配置参数如下...');
process.argv[2] === '--inline' ? console.log(require("./dev.env.js")) : console.log(env);

module.exports = {
  dev: {
    env: require("./dev.env.js"),
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // 代理例子
      '/post': {
        target: 'http://xxx.xxx.xx',
        changeOrigin: true,
        pathRewrite: {
          '^/post': '/post'
        }
      },
      '/system/post': {
        target: 'http://xxx.xxx.xx',
        changeOrigin: true,
        pathRewrite: {
          '^/system/post': '/post'
        }
      },
      '/shop/post': {
        target: 'http://xxx.xxx.xx',
        changeOrigin: true,
        pathRewrite: {
          '^/shop/post': '/post'
        }
      },
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    env,
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
