<template>
  <div id="Welfare-page">
    <div class="record">
      <h3>您可以通过以下方式获取积分:</h3>
      <div class="recordList">
        <ul>
          <li @click="signin">
            <img :src="require('@/assets/images/gouwu-icon.png')" alt="" />
            <p>每日签到</p>
            <p>每日签到获得随机积分</p>
          </li>
          <li @click="showPoster = true">
            <img :src="require('@/assets/images/yaoqing_img.png')" alt="" />
            <p>邀请好友</p>
            <p>活动期间，每邀请一个好友可得12积分</p>
            <p>海报有效期为30天，失效后请重新获取</p>
          </li>
        </ul>
      </div>
    </div>
    <posterPopup v-if="showPoster" @close="showPoster = false" />
  </div>
</template>

<script>

import posterPopup from '@/components/poster.vue'

export default {
  components: {posterPopup},
  data() {
    return {
      showPoster: false
    }
  },
  mounted() {},
  methods: {
    async signin() {
      const res = await this.$api.signin()
      if (res.code == 200) {
        this.$dialog
            .alert({
              confirmButtonText: '我知道了',
              showCancelButton: true,
              message: '签到成功,本次获得积分:' + res.data.score
            })
            .catch(() => {})
            this.getUserInfo()
            return
      }
      this.$toast(res.msg)
      return
    },
    async getUserInfo() {
      const res = await this.$api.getUserInfo()

      this.$store.commit('setUserInfo', res.data)
    },
  }
}
</script>

<style lang="less" scoped>
#Welfare-page {
  background: rgba(243, 243, 243, 1);
  height: 177.5vw;
  .record {
    width: 100%;
    ul {
      padding: 3.3vw 4.8vw 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 87.4vw;
        height: 40.3vw;
        background: rgba(255, 255, 255, 1);
        margin-right: 3.5vw;
        margin-bottom: 2.8vw;
        img {
          width: 15.34vw;
          height: 15.4vw;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 3vw;
        }
        p {
          height: 3.8vw;
          line-height: 1;
          font-size: 3.9vw;
          font-weight: 400;
          color: rgba(21, 21, 21, 1);
          margin-top: 2vw;
          width: 100%;
        }
        &:nth-of-type(2n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
