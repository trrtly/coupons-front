<template>
    <div id="personal-page">
        <div class="top_bg">
            <div class="userimg">
                <img :src="userInfo.headimgurl">
            </div>
            <div class="username">
                <h4>{{userInfo.nickname}}</h4>
                <p>积分：{{userInfo.score}}</p>
            </div>
            <router-link to="./RechargeRecord">
            <div class="chongzhirecord">
                <span>充值记录</span>
            </div>
            </router-link>
        </div>
        <div class="chongzhileixing">
            <h4>请选择充值金额</h4>
            <ul>
                <li
                    v-for="(item,index) in typeList"
                    :key="index"
                    :show="show"
                    @click="changeSelect(index, item.id)"
                    :class="{'bg_color': defaultIndex === index}"
                >
                    <h2>{{item.score}}<span>积分</span></h2>

                    <p>售价：<span>{{item.amount}}元</span></p>
                    <p>{{item.description}}</p>
                </li>
            </ul>
            <van-button
                type="primary"
                text="立即充值"
                @click="chongzhiClick"
            />
            <van-overlay :show="show" @click="show = false">
                <div class="wrapper" >
                    <div class="block" >
                      <img :src="erweimasrc" >
                    </div>
                </div>
            </van-overlay>
            <div class="rechargeRules">
                <h3>充值说明:</h3>
                <p>1.请关注公众号：<span @click="show = true">{{ platform.name }}</span>,以便参与更多活动。 </p>
                <p>2.积分可用于本公众号提供的所有活动，一经充值概不退款。</p>
                <p>3.有任何问题请与客服联系，谢谢。</p>
            </div>
        </div>
        <!-- <div class="bottom_bg">
            <img
                src="@/assets/images/bottom_bg.png"
                alt=""
            >
        </div> -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      show: false,
      id: 0,
      integralNum: 0,
      defaultIndex: 0,
      platform: {},
      erweimasrc: "",
      typeList: []
    }
  },
  mounted() {
    this.getScores()
    this.platform = JSON.parse(localStorage.getItem('platform'))
    this.erweimasrc = this.platform.kfImg
  },
  methods: {
    changeSelect(i, id) {
      this.defaultIndex = i
      this.id = id
    },
    chongzhiClick() {
        this.$dialog
          .alert({
            title: '标题',
            message: '弹窗内容'
          })
          .then(() => {
          })
    },
    async getScores() {
      const res = await this.$api.scores()
      this.typeList = res.data
    }
  },
   computed:{
    ...mapGetters(['userInfo'])
  },
}
</script>


<style lang="less" scoped>
.top_bg {
  width: 100%;
  height: 28.3vw;
  background: url('../assets/images/chongzhijifen_bg.png') no-repeat;
  background-size: 100%;
  padding: 6.4vw 0 0 8.6vw;
  display: flex;
  justify-content: flex-start;
  .userimg {
    width: 15.6vw;
    height: 15.6vw;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .username {
    margin-left: 3.6vw;
    text-align: left;
    width: 48vw;
    h4 {
      margin-top: 2.5vw;
      height: 4.4vw;
      line-height: 1;
      font-size: 4.4vw;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
    }
    p {
      height: 3.1vw;
      line-height: 1;
      font-size: 3.3vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 3.6vw;
    }
  }
  .chongzhirecord {
    width: 17.9vw;
    margin-top: 1.3vw;
    height: 6.2vw;
    line-height: 1;
    background: rgba(255, 255, 255, 0.3);
    border-radius: 3.1vw;
    cursor: pointer;
    span {
      height: 100%;
      display: inline-block;
      line-height: 6.2vw;
      font-size: 3.3vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
.chongzhileixing {
  width: 100%;
  height: 129.3vw;
  margin-top: 1vw;
  background: #fff;
  padding: 3.6vw 11.7vw 0;
  h4 {
    height: 3.4vw;
    text-align: left;
    line-height: 1;
    font-size: 3.5vw;
    font-weight: 400;
    color: rgba(86, 86, 86, 1);
    margin-bottom: 4.8vw;
  }
  ul {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    li {
      width: 36vw;
      height: 23.3vw;
      background: rgba(255, 255, 255, 1);
      border: 0.3vw solid rgba(39, 131, 255, 1);
      box-shadow: 0 0.6vw 1.7vw 0 rgba(0, 87, 255, 0.1);
      border-radius: 1.1vw;
      padding: 4.2vw 0 0;
      margin: 0 4.5vw 3.7vw 0;
      position: relative;
      h2 {
        height: 5.1vw;
        display: inline-block;
        line-height: 1;
        font-size: 5.6vw;
        font-family: FZLTTHK_CJSB;
        font-weight: bold;
        font-style: italic;
        color: rgba(0, 109, 255, 1);
        text-shadow: 3px 4px 0px rgba(0, 87, 255, 0.3);
        margin-bottom: 2.7vw;
        span {
          height: 3.2vw;
          line-height: 1;
          font-size: 3.3vw;
          font-weight: 500;
          font-style: italic;
          color: rgba(0, 109, 255, 1);
          margin-left: 0.8vw;
        }
      }
      p {
        height: 2.8vw;
        line-height: 1;
        font-size: 2.8vw;
        font-weight: 400;
        color: rgba(0, 109, 255, 1);
        margin-bottom: 2.1vw;
        span {
          height: 100%;
          display: inline-block;
          line-height: 2.8vw;
        }
        &:nth-of-type(2) {
          margin-bottom: 0;
        }
        &.nonedata {
          width: 100%;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-20%, -50%);
          margin-bottom: 0;
          line-height: 1;
          display: flex;
          margin: 0 auto;
          align-items: center;
        }
      }
      &:nth-of-type(2n) {
        margin-right: 0;
      }
      &.bg_color {
        background: rgba(239, 246, 255, 1);
      }
    }
  }
  button {
    width: 100%;
    height: 11.1vw;
    cursor: pointer;
    line-height: 1;
    text-align: center;
    margin-top: 2.8vw;
    background: linear-gradient(
      267deg,
      rgba(40, 119, 255, 1) 0%,
      rgba(40, 108, 255, 1) 100%,
      rgba(40, 116, 255, 1) 100%
    );
    box-shadow: 0px 0.9vw 2.2vw 0px rgba(0, 53, 233, 0.36);
    border-radius: 0.9vw;
    font-size: 4.3vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .rechargeRules {
    margin-top: 5.2vw;
    padding-bottom: 5.9vw;
    width: 100%;
    h3 {
      font-size: 3vw;
      color: #494949;
      text-align: left;
      margin-bottom: 1vw;
    }
    p {
      font-size: 3vw;
      color: #494949;
      line-height: 4.45vw;
      text-align: justify;
      span {
        color: #2874ff;
      }
    }
  }
}
.bottom_bg {
  width: 100%;
  height: 23.1vw;
  position: fixed;
  bottom: 0;
  img {
    width: 100%;
  }
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 62.5vw;
  height: 75.2vw;
  background:url(../assets/images/erweima_tc.png) no-repeat;
  background-size: 100%;
  position: relative;
  img{
    width: 31.5vw;
    height: 31.5vw;
    position: absolute;
    top: 29.2vw;
    left: 18.9vw;
  }
}
</style>

