# toutiao-m

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目步骤

1.创建新的 vue-cli 脚手架工程

2.加入 git 版本管理
2.1 创建远程仓库---vue-cli 会自动创建远程仓库
2.2 git log
.3 git remote add origin 加上 git 上的地址
2.4 推送 git push -u origin master

3.删除掉初始化项目中不需要的文件
3.1 新建 src/api utils styles/index.less 全局样式文件
3.2 在 main.js 中引入全局样式 styles/index.less

4.git status 查看历史操作
4.1 提交此次操作到远程仓库
4.1 git add .
4.2 git commit -m '项目初始化'
4.3 git push

5.制作字体图标 在 iconfont 上传矢量图标 ×
5.1 把 icon.less 引入到 index.less

6.安装 vant 组件库 npm i vant@latest-v2 -S
6.1 在 main.js 中引入 vant 所有组件

7.移动端 rem 适配 Vant
7.1 使用 vant 中的 lib-flexble 做移动端适配
7.2 npm i amfe-flexible
7.3 在 `main.js` 中加载执行该模块 import 'amfe-flexible'
7.4 使用 [postcss-pxtorem] 将 `px` 转为 `rem 7.5 然后在项目根目录中创建 `.postcssrc.js` 文件 并配置 行内样式无法转换

8.封装请求模块
8.1 安装 axios yarn add axios
8.2 新建 utils/request.js

9.登录注册模块
9.1 新建 views/Login/index.vue 路由
9.2 在 router/index.js 里配置路由映射表 路由懒加载
9.3 写静态登录注册的页面
9.4 发起请求 登录
9.4 登录提示 vant-toast 表单验证 van-field

10.实现点击发送验证码功能--1.校验手机号 2.显示倒计时 3.请求发送验证码
10.1 处理用户 token 把 token 存到 vuex 容器（获取方便 响应式）+本地存储中（持久化）
10.2 封装本地存储模块 utils/storage.js

11.个人中心页面---我的
11.1 嵌套路由  
11.2 我的--未登录、已登录 $router.push('/login')跳转 $router.back()后退
11.3 请求用户自己的登录信息
11.4 把 token 请求头放在请求拦截器里面 放在 request.js 里

12.首页 页面布局
12.1 头部导航栏 vant-nav
12.2 文章频道列表 vant-tab

13.展示频道列表
13.1 请求数据 封装请求方法
13.2 首页文章列表的渲染 不同频道展示不同的文章列表 缓存效果
13.3 下拉刷新效果 PullRefresh
