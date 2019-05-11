# vue-element-admin

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

### 说明
系统目录结构搭建百度脑图说明
地址：http://naotu.baidu.com/file/f7776eece4de3d42fad50cdf644ff8d7?token=dbfb42501e4a1d9d

### git分支说明
- initial-template        ------ 对应1.0版本空白项目初始模板代码
- master     ------ 对应最新版本代码


- 后面会在master分支搭建一个后台管理系统的页面布局模板以提供直接修改使用，想要自己搭建页面布局可以下载initial-template分支空白模板

### 打包说明
配置是在package.json里面
```shell
"build": "node build/build.js pro",
"build-pre": "node build/build.js pre",
"build-test": "node build/build.js test"
```
- pro 对应生产环境
- pre 对应预发布环境
- test 对应测试环境

对应配置可以自己更改

打包
已在package.json里面配置本地，测试，预发布，正式等环境

### 命名规范
### Component
所有的Component文件都是以大写开头 (PascalCase)，这也是官方所 推荐的。

但除了 index.vue。

例子：
- @/src/components/BackToTop/index.vue
- @/src/components/Charts/Line.vue
- @/src/views/example/components/Button.vue
### JS 文件
所有的.js文件都遵循横线连接 (kebab-case)。

例子：
- @/src/utils/open-window.js
- @/src/views/svg-icons/require-icons.js
- @/src/components/MarkdownEditor/default-options.js
### Views
在views文件下，代表路由的.vue文件都使用横线连接 (kebab-case)，代表路由的文件夹也是使用同样的规则

例子：
- @/src/views/svg-icons/index.vue
- @/src/views/svg-icons/require-icons.js

使用横线连接 (kebab-case)来命名views主要是出于以下几个考虑。
- 横线连接 (kebab-case) 也是官方推荐的命名规范之一
- views下的.vue文件代表的是一个路由，所以它需要和component进行区分(component 都是大写开头)
- 页面的url 也都是横线连接的，比如https://www.xxx.admin/export-excel，所以路由对应的view应该要保持统一
- 没有大小写敏感问题

### utils提供全局的工具方法
需要的工具方法在utils中配置

### filters提供全局过滤器
需要配置的公共过滤器在filters/index.js中配置, 引用已在main.js里面配置

### store vuex的配置
需要配置的状态管理模块统一在store/modules中配置最后在index入口文件中引用

### api
统一放在api目录管理

api分模块管理，模块统一放至api/modules中

index.js 是生成api的具体配置

### router
统一放在router目录管理

路由分模块管理，模块统一放至router/modules中

需要动态生成路由权限表的模块统一配置进dynamic_list.js中，配置示例在代码中

index.js 是路由入口文件，代码中有使用注释

- 后端配置路由模块按如下数据格式，必要参数如下：
``` bash
{
  action: "goods",
  name: "商品",
  child: [
    {
      action: "goodsManage",
      name: "商品管理",
      child: []
    }
  ],
}
```

### mixin
统一放在mixins目录管理

mixin分模块管理，模块统一放至mixins/modules中

在index.js中引入模块，在需使用mixin的组件中按需import {module_name, xxx} from '@/mixins'

### 视图页面目录(views/nav)
- systemSetting 系统设置（举例）
- ...

### layout组件
基础布局组件，作为一个中间件存在，提供嵌套路由使用

author：chenjianping

create date：2019-05-07 16:32:48

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
