<template>
  <div class="article-list">
    <van-pull-refresh v-model="isRefreshLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <!-- 文章列表项 -->
        <!--   <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
        <ArticleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { getArticles } from '@/api/article'
export default {
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  name: 'ArticleList',
  created () { },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null, // 请求获取下一页数据的时间戳
      error: false, // 是否加载失败
      isRefreshLoading: false // 控制下拉刷新的加载状态

    }
  },
  methods: {
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })

        // 2. 把请求结果数据放到 list 数组中
        const { results } = data.data
        this.list.push(...results)
        // 3. 本次数据加载结束之后要把加载状态设置为结束
        this.loading = false
        // loading 关闭以后才能触发下一次的加载更多
        // 4. 判断数据是否全部加载完成
        if (results.length) {
          // 更新下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 如果没有数据了，把 finished 设置为 true，之后不再触发加载更多
          this.finished = true
        }
      } catch (err) {
        // this.$toast('请求数据失败')
        this.error = true
        this.loading = false
      }
    },
    // 下拉刷新时回调用该函数
    async onRefresh () {
      try {
        // 请求获取数据 放到列表前面
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(), // 下拉刷新每次都应该获取最新数据
          with_top: 1
        })
        // 放到列表前面
        this.list.unshift(...data.data.results)
        // 关闭下拉刷新的loading状态
        this.isRefreshLoading = false
      } catch (err) {
        console.log(err)
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.article-list {
  height: 79vh;
  overflow: auto;
}
</style>
