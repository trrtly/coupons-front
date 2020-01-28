<template>
  <div id="getReceive1">
    <div class="top_bg">
      <div class="fixedtop">
        <van-swipe vertical loop :autoplay="3000" stop-propagation>
          <van-swipe-item v-for="(item, index) in lunboList" :key="index">
            <img src="@/assets/images/wenzilunbo_icon.png" alt="" />
            {{ item.name }} {{ item.time }}
          </van-swipe-item>
        </van-swipe>
      </div>
      <h1>{{ platform.name }}</h1>
    </div>
    <div class="center_msg">
      <div class="userimg">
        <img :src="userInfo.headimgurl" alt="" />
      </div>
      <div class="username">
        <h3>{{ userInfo.nickname }}</h3>
        <img src="@/assets/images/star-icon.png" alt="" />
        <span>
          拥有积分:
          <b>{{ userInfo.score }}</b>
        </span>
      </div>
      <a class="jifenchongzhi" href="#">
        <img src="@/assets/images/jifen_icon.png" alt="" />
        <span>积分充值</span>
      </a>
    </div>
    <div class="lunbo_content">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in banners" :key="index">
          <a :href="item.url">
            <img :src="item.img" alt="" />
          </a>
        </van-swipe-item>
      </van-swipe>
    </div>
    <SelectType />
    <div class="floaticon">
      <a :href="platform.floatWindow.url">
        <img :src="platform.floatWindow.img" alt="0元购" />
      </a>
    </div>
    <BottomFixed />
  </div>
</template>

<script>
import BottomFixed from './BottomFixed'
import SelectType from './SelectType'
import { mapGetters } from 'vuex'

export default {
  components: { BottomFixed, SelectType },
  data() {
    return {
      lunboList: [
        // {
        //   name: '🍍',
        //   time: '在5分钟前领取5元红包'
        // },
        // {
        //   name: '我是小**~🌱',
        //   time: '在32秒前领取4元红包'
        // },
        // {
        //   name: '蔡**凤',
        //   time: '在10秒前领取5元红包'
        // },
        // {
        //   name: '随风而**遇。',
        //   time: '在10秒前领取5元红包'
        // },
        // {
        //   name: '随风而**遇。',
        //   time: '在17分钟前领取6元红包'
        // }
      ],
      platform: JSON.parse(localStorage.getItem('platform')),
      banners: []
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
    this.getBanners()
  },

  methods: {
    async getBanners() {
      const res = await this.$api.Banners({})
      this.banners = res.data
    }
  }
}
</script>

<style lang="less" scoped>
#getReceive1 {
  background: rgba(245, 245, 245, 1);
}
.top_bg {
  width: 100%;
  height: 33.3vw;
  background: url('../assets/images/top_bg.png') no-repeat;
  background-size: 100%;
  .fixedtop {
    position: relative;
    top: 0;
    width: 100%;
    height: 7.4vw;
    line-height: 7.4vw;
    background: rgba(0, 0, 0, 0.1);
    .van-swipe {
      height: 7.4vw;
      .van-swipe-item {
        font-size: 3.3vw;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 7.4vw;
        img {
          width: 3.89vw;
          vertical-align: middle;
        }
      }
    }
  }
  h1 {
    height: 6vw;
    line-height: 1;
    font-size: 6.1vw;
    font-family: MFLiHei_Noncommercial;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0px 0.4vw 0px rgba(0, 37, 113, 0.49);
    margin: 3vw 0 1.8vw 0;
    text-align: left;
    padding: 0 4.8vw;
  }
}
.center_msg {
  margin: 0 auto;
  width: 90.4vw;
  height: 26.9vw;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0 0px 4.7vw 0 rgba(0, 112, 227, 0.27);
  border-radius: 0.9vw;
  margin-top: -15vw;
  padding: 5.9vw 0 5.7vw 5.5vw;
  display: flex;
  justify-content: flex-start;
  .userimg {
    width: 15.32vw;
    height: 15.32vw;
    overflow: hidden;
    border-radius: 15.32vw;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .username {
    text-align: left;
    padding: 2.3vw 0 2.2vw 3.5vw;
    width: 45vw;
    overflow: hidden;
    h3 {
      height: 4.3vw;
      line-height: 1;
      font-size: 4.4vw;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(18, 18, 18, 1);
    }
    img {
      margin-top: 3.3vw;
      width: 3.8vw;
      height: 3.8vw;
    }
    span {
      height: 3.2vw;
      font-size: 3.3vw;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(31, 71, 125, 1);
      b {
        margin-left: 2.3vw;
        height: 3.4vw;
        font-size: 3.7vw;
        font-family: FZLTTHK_XARB;
        font-weight: bold;
        color: rgba(18, 18, 18, 1);
      }
    }
  }
  .jifenchongzhi {
    width: 24.6vw;
    height: 7.8vw;
    line-height: 7.8vw;
    margin: 4vw auto;
    background: linear-gradient(
      270deg,
      rgba(255, 76, 0, 1),
      rgba(255, 171, 0, 1)
    );
    box-shadow: 0px 0.2vw 0.8vw 0 rgba(255, 102, 0, 0.49);
    border-radius: 3.9vw 0px 0px 3.9vw;
    img {
      width: 3.8vw;
      height: 3.8vw;
      vertical-align: middle;
    }
    span {
      font-size: 3.7vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-left: 1.1vw;
    }
  }
}
.lunbo_content {
  // height: 33.3vw;
  width: 90.2vw;
  margin: 3vw auto 0;
  border-radius: 0.9vw;
  overflow: hidden;
  img {
    height: 33.3vw;
    width: 90vw;
  }
}
.floaticon {
  position: fixed;
  right: 1.5vw;
  top: 50%;
  img {
    background: transparent;
    width: 12.7vw;
    height: 15.9vw;
  }
}
/deep/ .fixedtop {
  .van-swipe__indicators--vertical {
    display: none !important;
  }
}
</style>
