<template>
  <van-popup
    v-model="show"
    position="bottom"
    overlay-class="my_popup"
    :style="{ height: '100%' }"
  >
    <img :src="poster" alt="邀请" />
    <div class="close-btn" @click="$emit('close')">
      <img src="@/assets/images/close-btn.png" alt="关闭" />
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'Poster',

  data() {
    return {
      show: false,
      poster: ''
    }
  },

  created() {
    this.getPoster()
  },

  beforeMount() {
    this.show = true
  },

  methods: {
    async getPoster() {
      const {
        data: { url }
      } = await this.$api.getPoster()
      this.poster = url
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.my_popup + .van-popup {
  background-color: rgba(33, 3, 33, 0.1);
  background-size: 93%;
  bottom: 0vw;

  img {
    width: 92%;
    margin-top: 10vw;
  }

  .close-btn {
    position: absolute;
    top: -7vw;
    right: 5vw;
    cursor: pointer;

    img {
      width: 4vw;
      height: 4vw;
    }
  }
}
</style>
