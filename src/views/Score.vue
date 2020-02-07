<template>
  <div id="Welfare-page">
    <div class="record">
      <div class="recordList">
        <ul>
          <li>
            <img :src="require('@/assets/images/gouwu-icon.png')" alt="" />
            <p>签到</p>
          </li>
          <li @click="showPoster = true">
            <img :src="require('@/assets/images/yaoqing_img.png')" alt="" />
            <p>邀请好友</p>
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
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    }
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
        width: 43.4vw;
        height: 33.3vw;
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
