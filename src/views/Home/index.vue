<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道导航 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      >
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/Home/components/article-list.vue'
export default {
  name: 'HomeIndex',
  created () {
    this.loadChannels()
  },
  data () {
    return {
      active: 0,
      // 存储频道列表数据
      channels: []
    }
  },
  methods: {
    // 请求获取频道列表
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        const res = await getUserChannels()
        // console.log(res)
        //  this.channels = data.data.channels
        this.channels = res.data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleList
  }
}
</script>

<style scoped lang='less'>
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/.channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.7;
      i.toutiao {
        font-size: 33px;
      }
      .placeholder {
        flex-shrink: 0;
        width: 66px;
        height: 82px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
