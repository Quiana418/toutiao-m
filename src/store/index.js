// 存储数据 获取方便 响应式 持久化
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)
const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY)),
    user: getItem(TOKEN_KEY)
    // user: null
  },
  mutations: {
    setUser (state, user) {
      state.user = user
      setItem(TOKEN_KEY, state.user)
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user));
    }
  },
  actions: {},
  modules: {}
})
