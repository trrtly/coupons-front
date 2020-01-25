<template>
    <div id="bottomFixed">
        <div class="bottomDiv">
            <div :class="RouteName === 'home' ? 'left changecolor' : 'left'">
                <img
                    src="@/assets/images/isHongbao.png"
                    alt="饿了么大红包"
                    @click="jumpUrl('home')"
                    v-show="RouteName === 'home'"
                >
                <img
                    src="@/assets/images/isHongbaocolor.png"
                    alt="饿了么大红包"
                    @click="jumpUrl('home')"
                     v-show="RouteName === 'home' ? false : true"
                >
                <p>饿了么大红包</p>
            </div>
            <div :class="RouteName === 'personal' ? 'right changecolor' : 'right'">
                <img
                    src="@/assets/images/isMy.png"
                    alt="个人中心"
                    @click="jumpUrl('personal')"
                     v-show="RouteName === 'personal' ? false : true"
                >
                <img
                    src="@/assets/images/isMycolor.png"
                    alt="个人中心"
                    @click="jumpUrl('personal')"
                    v-show="RouteName === 'personal'"
                >
                <p>个人中心</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      RouteName: ''
    }
  },
  mounted() {
    var RouteName = this.$route.name
    this.RouteName = RouteName
  },
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    }
  }
}
</script>


<style lang="less" scoped>
.bottomDiv {
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 14.8vw;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  box-shadow: 0 0 3.2vw 0 rgba(0, 44, 90, 0.13);
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    height: 3.3vw;
    font-size: 3.3vw;
    font-weight: 400;
    line-height: 1;
    color: rgba(178, 177, 177, 1);
  }
  .left {
    width: 50%;
    img {
      width: 5.8vw;
      height: 6.1vw;
    }
    &.changecolor {
      p {
        color: rgba(39, 120, 255, 1);
      }
    }
  }
  .right {
    width: 50%;
    img {
      width: 6.1vw;
      height: 6.2vw;
    }
    &.changecolor {
      p {
        color: rgba(39, 120, 255, 1);
      }
    }
  }
}
</style>

