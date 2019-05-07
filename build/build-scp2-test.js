'use strict'
var client = require('scp2');
// 部署上线
client.scp('./dist/', {
  'host': '服务器Ip',
  'username': '账号',
  'password': '密码',
  'path': '服务器端路径',
  'port': '服务器端口号'
}, function (err) {
  if (err) {
    console.log("err", err)
  } else {
    console.log('npm run build-scp2-test: scp2工具上传完毕,远端服务路径：你的上传路径xxxxxx')
  }
})
