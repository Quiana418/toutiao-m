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
1.创建新的vue-cli脚手架工程

2.加入git版本管理
2.1创建远程仓库---vue-cli会自动创建远程仓库
2.2 git log
2.3 git remote add origin 加上git上的地址
2.4 推送git push -u origin master

3.删除掉初始化项目中不需要的文件
3.1 新建src/api  utils  styles/index.less全局样式文件
3.2 在main.js中引入全局样式styles/index.less

4.git status 查看历史操作
4.1 提交此次操作到远程仓库
4.1 git add . 
