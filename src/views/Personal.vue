<template>
  <div id="personal-page">
    <div class="top_bg">
      <div class="userimg">
        <img :src="userInfo.headimgurl" alt="userInfo.nickname" />
      </div>
      <div class="username">
        <h4>{{ userInfo.nickname }}</h4>
        <p>UID:{{ userInfo.id }}</p>
      </div>
      <button class="tag-read" @click="copy" :data-clipboard-text="userInfo.id">
        点击复制
      </button>
    </div>
    <div class="twomsg">
      <ul>
        <li>
          <h3>{{ userInfo.score }}</h3>
          <span>积分</span>
          <p>
            <img src="@/assets/images/jifen-icon.png" alt="0元购" />
            <router-link to="/integral">查看积分</router-link>
          </p>
        </li>
        <li>
          <h3>{{ userInfo.cms }}</h3>
          <span>元</span>
          <p>
            <img src="@/assets/images/yongjin-icon.png" alt="0元购" />
            <router-link to="/commission">提现佣金</router-link>
          </p>
        </li>
      </ul>
    </div>
    <div class="hengfu">
      <van-swipe vertical loop :autoplay="3000">
        <van-swipe-item
          @click="openTc(index)"
          v-for="(item, index) in Announcements"
          :key="index"
        >
          <p>{{ item.title }}</p>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="datalist">
      <ul>
        <router-link to="chongzhiIntegral">
          <li>
            <img src="@/assets/images/jifen_img.png" alt="积分充值" />
            <p>积分充值</p>
          </li>
        </router-link>
        <router-link to="InvitationList">
          <li>
            <img src="@/assets/images/haoyou_img.png" alt="好友列表" />
            <p>好友列表</p>
          </li>
        </router-link>
        <router-link to="InvitationList">
          <li>
            <img src="@/assets/images/wenti_img.png" alt="常见问题" />
            <p>常见问题</p>
          </li>
        </router-link>
        <router-link to="InvitationList">
          <li>
            <img src="@/assets/images/yaoqing_img.png" alt="邀请好友" />
            <p>邀请好友</p>
          </li>
        </router-link>
        <a href="">
          <li>
            <img src="@/assets/images/xiaoxi_img.png" alt="联系客服" />
            <p>联系客服</p>
          </li>
        </a>
        <a href="">
          <li>
            <img src="@/assets/images/liwu_img.png" alt="福利中心" />
            <p>福利中心</p>
          </li>
        </a>
      </ul>
      <van-overlay :show="show" @click="show = false">
        <div class="wrapper">
          <div class="block">
            <h3>公告</h3>
            <img src="@/assets/images/close-btn.png" alt="福利中心" />
            <p v-html="Announcements[theIndex].content"></p>
            <button>我知道了</button>
          </div>
        </div>
      </van-overlay>
    </div>
    <BottomFixed />
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import BottomFixed from './BottomFixed'
import { mapGetters } from 'vuex'
export default {
  components: { BottomFixed },
  data() {
    return {
      show: false,
      Announcements: [{}],
      theIndex: 0
      // platform :JSON.parse(localStorage.getItem('platform'))
    }
  },
  mounted() {
    this.getAnnouncements()
    // this.$dialog
    //   .alert({
    //     title: '标题',
    //     message: '弹窗内容'
    //   })
    //   .then(() => {
    //     console.log(122222)
    //   })
  },
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    },
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', () => {
        this.$toast('复制成功')
        clipboard.destroy()
      })
      clipboard.on('error', () => {
        this.$toast('复制出错啦,请再试一遍!')
        clipboard.destroy()
      })
    },
    openTc(i) {
      this.show = true
      this.theIndex = i
    },
    async getAnnouncements() {
      const res = await this.$api.Announcements({})
      this.Announcements = res
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  }
}
</script>

<style lang="less" scoped>
.top_bg {
  width: 100%;
  height: 33.3vw;
  background: url('../assets/images/top_bg.png') no-repeat;
  background-size: 100%;
  padding: 4.2vw 0 0 6.9vw;
  display: flex;
  justify-content: flex-start;
  .userimg {
    width: 11.1vw;
    height: 11.1vw;
    border-radius: 1.3vw;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .username {
    margin-left: 3.1vw;
    text-align: left;
    h4 {
      margin-top: 0.7vw;
      height: 3.6vw;
      line-height: 1;
      font-size: 3.7vw;
      font-weight: 500;
      color: rgba(245, 245, 245, 1);
    }
    p {
      height: 2.7vw;
      line-height: 1;
      font-size: 3.3vw;
      font-weight: 400;
      color: rgba(245, 245, 245, 1);
      margin-top: 2.7vw;
    }
  }
  button {
    width: 14.7vw;
    height: 5.2vw;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1),
      rgba(160, 202, 255, 1)
    );
    box-shadow: 0px 0.2vw 0.4vw 0 rgba(51, 102, 255, 0.22);
    border-radius: 2.6vw;
    font-size: 2.8vw;
    font-weight: 400;
    color: rgba(46, 133, 253, 1);
    margin-top: 6vw;
    margin-left: 3vw;
    cursor: pointer;
  }
}
.twomsg {
  width: 100%;
  padding: 0 6.2vw;
  margin-top: -13.8vw;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-between;
    li {
      width: 42.8vw;
      height: 22.2vw;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0 1.7vw 0 rgba(51, 102, 255, 0.22);
      border-radius: 1.3vw;
      padding: 4.1vw 0 0 0;
      h3 {
        line-height: 1;
        font-size: 7.4vw;
        font-family: Impact;
        font-weight: 400;
        color: rgba(21, 21, 21, 1);
        text-shadow: 0px 0.2vw 0.9vw rgba(249, 102, 97, 0.45);
        background: linear-gradient(
          33deg,
          rgba(243, 25, 60, 1) 0%,
          rgba(253, 153, 121, 1) 100%
        );
        background-clip: text;
        -webkit-text-fill-color: transparent;
        display: inline-block;
      }
      span {
        height: 3.1vw;
        font-size: 3.3vw;
        line-height: 1;
        font-weight: 400;
        margin-left: 0.6vw;
        color: rgba(21, 21, 21, 1);
      }
      p {
        height: 3.6vw;
        line-height: 3.6vw;
        font-size: 3.3vw;
        font-weight: 400;
        color: rgba(39, 131, 255, 1);
        margin-top: 4.2vw;
        img {
          width: 3.4vw;
          height: 3.6vw;
          vertical-align: middle;
          margin-right: 1.1vw;
        }
      }
      &:nth-of-type(2) {
        p {
          img {
            width: 4.3vw;
            height: 3.3vw;
          }
        }
      }
    }
  }
}
.hengfu {
  width: 100%;
  height: 10.2vw;
  background: rgba(254, 242, 223, 1);
  box-shadow: 0px 0.4vw 1.5vw 0 rgba(215, 132, 0, 0.14);
  border-radius: 1.3vw;
  margin-top: 2vw;
  line-height: 10.2vw;
  .van-swipe {
    height: 10.2vw;
    .van-swipe-item {
      font-size: 3.3vw;
      font-weight: 400;
      height: 10.2vw;
      line-height: 10.2vw;
    }
  }

  p {
    height: 3.9vw;
    font-size: 3.7vw;
    font-weight: 400;
    color: rgba(234, 154, 0, 1);
  }
}
.datalist {
  padding: 0 6vw 0 6.6vw;
  background: rgba(255, 255, 255, 1);
  height: 110vw;
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    a {
      width: 19.9vw;
      height: 19.9vw;
      background: rgba(252, 251, 242, 1);
      margin-right: 2.6vw;
      margin-top: 2.3vw;
      li {
        height: 100%;
        width: 100%;

        img {
          width: 7.2vw;
          height: 7.2vw;
          margin-top: 3.4vw;
        }
        p {
          height: 3vw;
          line-height: 1;
          font-size: 3vw;
          font-weight: 500;
          color: rgba(90, 99, 103, 1);
        }
      }
      &:nth-of-type(2) {
        background: rgba(244, 254, 252, 1);
      }
      &:nth-of-type(3) {
        background: rgba(243, 249, 255, 1);
      }
      &:nth-of-type(4) {
        background: rgba(252, 248, 247, 1);
      }
      &:nth-of-type(5) {
        background: rgba(250, 246, 252, 1);
      }
      &:nth-of-type(6) {
        background: rgba(255, 249, 247, 1);
      }
      &:nth-of-type(4n) {
        margin-right: 0;
      }
    }
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 69.8vw;
  // height: 48.5vw;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.1vw;
  padding: 3vw 4.85vw 5vw;
  position: relative;
  img {
    position: absolute;
    right: 4.6vw;
    top: 3vw;
    width: 3.15vw;
    height: 3.15vw;
  }
  h3 {
    height: 4.3vw;
    line-height: 1;
    font-size: 4.4vw;
    font-weight: 600;
    color: rgba(40, 111, 255, 1);
  }
  p {
    font-size: 3.7vw;
    font-weight: 400;
    color: rgba(18, 18, 18, 1);
    line-height: 5.6vw;
    text-align: justify;
    margin-top: 2.5vw;
  }
  button {
    width: 46.9vw;
    height: 7.4vw;
    background: rgba(40, 111, 255, 1);
    border-radius: 3.7vw;
    font-size: 3.7vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    margin-top: 2.5vw;
  }
}
/deep/ .van-swipe__indicators--vertical {
  display: none !important;
}
</style>
