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
    this.noTokenProcess()
  },

  methods: {
    async noTokenProcess() {
      this.$toast('noTokenProcess')
      localStorage.removeItem('token')
      const res = await this.$api.getToken({
        code: this.$route.query.code
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('expiresAt', res.data.expiresAt)
      this.defaultProcess()
    },

    defaultProcess() {
      this.getUserInfo()
      this.showView = true
    },

    async getUserInfo() {
      const res = await this.$api.getUserInfo()

      this.$store.commit('setUserInfo', res.data)
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
