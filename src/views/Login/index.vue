<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <van-icon slot="left" name="cross" @click="$router.back()"></van-icon>
    </van-nav-bar>

    <!-- 登录表单 -->
    <van-form ref="loginForm" @submit="onSubmit">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        maxlength="11"
        type="number"
        v-model="user.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"> </i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        placeholder="请输入验证码"
      >
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 5"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            native-type="button"
            round
            size="small"
            type="default"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"> </i>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block class="login-btn" type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  created () { },
  data () {
    return {
      username: '',
      password: '',
      user: {
        mobile: '',
        code: ''
      },
      // 是否显示倒计时
      isCountDownShow: false,
      // 表单校验规则
      userFormRules: {
        // 手机号校验
        mobile: [
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|4|5|7|8]\d{9}$/, message: '手机号格式错误' }
        ],
        // 验证码校验
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },

  methods: {
    // 发起请求登录验证码
    async onSubmit () {
      // 获取表单数据
      // const user = this.user
      // 表单验证

      // 登录提示
      // 开始转圈圈
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      // 提交表单请求登录
      try {
        const res = await login(this.user)
        // const { data } = await login(this.user);
        // vuex存数据 token
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功')
        // 登录成功 跳转回原来的页面
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('登录失败，手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败 请重试')
        }
      }

      // 根据响应结果 做后续操作
    },

    // 验证手机号 点击按钮
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 180px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
