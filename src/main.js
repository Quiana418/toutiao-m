import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 处理时间
import './utils/dayjs'

// 引入vant移动端适配组件 动态设置rem基准值
import 'amfe-flexible'

// 加载全局样式
import './styles/index.less'

// 引入vant所有组件
import Vant from 'vant'
import 'vant/lib/index.css'
// 注册使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
