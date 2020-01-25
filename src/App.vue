<template>
  <div id="app">
    <router-view v-if="showView" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      showView: false
    }
  },

  beforeMount() {
    this.initial()
  },

  methods: {
    initial() {
      if (
        localStorage.getItem('token') == 'undefined' ||
        localStorage.getItem('expiresAt') == 'undefined' ||
        !localStorage.getItem('token')
      ) {
        this.noTokenProcess()
        return
      }

      this.defaultProcess()

      // if (new Date().getTime() > localStorage.getItem('expiresAt')) {
      //   console.log('2')
      //   this.noTokenProcess()
      // } else {
      //   console.log('3')
      //   this.defaultProcess()
      // }
    },

    async noTokenProcess() {
      if (this.$route.query.code) {
        const res = await this.$api.getToken({
          code: this.$route.query.code
        })
        localStorage.setItem('token', res.token)
        localStorage.setItem('expiresAt', res.expiresAt)
        this.defaultProcess()
      } else {
        this.$toast('暂未开启微信验证，请手动填写code')
      }
      // 微信验证，测试环境先关闭
      //  else {
      //   let platform = JSON.parse(localStorage.getItem('platform'))
      //   let redirectUri = 'http%3a%2f%2f10.0.96.103%3a8080%2fhome'
      //   let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${platform.appid}&redirect_uri=${redirectUri}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
      //   location.href = url
      // }
    },

    defaultProcess() {
      this.getUserInfo()
      this.showView = true
    },

    async getUserInfo() {
      const res = await this.$api.getUserInfo()
      this.$store.commit('setUserInfo', res)
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: @theme-color;
    }
  }
}
</style>
