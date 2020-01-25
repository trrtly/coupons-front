<template>
    <div id="commission-page">
        <div class="top_bg">
            <div class="first_div">
                <p>当前可提现佣金(元)</p>
                <router-link to="./CommissionRules">
                    <div class="rules">
                        <span>佣金规则</span>
                    </div>
                </router-link>
            </div>
            <h1>{{userInfo.cms}}</h1>
            <button>点击提现</button>
        </div>
        <div class="twoMsg">
            <div class="msgContent">
                <p>{{leijiyongjin}}<span>元</span></p>
                <P>累计获得佣金</P>
            </div>
            <div class="shuxian"></div>
            <div class="msgContent">
                <p>{{leijituiguangrenshu}}<span>人</span></p>
                <P>累计推广人数</P>
            </div>
        </div>
        <div class="process">
            <div class="process_title">
                <div class="shuxian"></div><span>获得佣金</span>
            </div>
            <div class="process_img">
                <ul>
                    <li>
                        <img
                            src="@/assets/images/tuandui-icon.png"
                            alt=""
                        >
                        <p>邀请好友</p>
                    </li>
                    <img
                        src="@/assets/images/process-left-icon.png"
                        alt=""
                        class="top10"
                    >
                    <li>
                        <img
                            src="@/assets/images/dingdan-icon.png"
                            alt=""
                        >
                        <p>好友充值</p>
                    </li>
                    <img
                        src="@/assets/images/process-right-icon.png"
                        alt=""
                        class="top10"
                    >
                    <li>
                        <img
                            src="@/assets/images/chongzhi-icon.png"
                            alt=""
                        >
                        <p>获得佣金</p>
                    </li>
                </ul>

            </div>
        </div>
        <div class="process record">
            <div class="process_title">
                <div class="shuxian"></div><span>佣金记录</span>
            </div>
            <div class="recordList" >
                <ul>
                    <li
                        v-for="(item,index) in recordList"
                        :key="index"
                    >
                        <div class="recordlf">
                            <img
                                :src="item.headimgurl"
                                alt=""
                            >
                            <div>
                                <p>{{item.nickname}}</p>
                                <p>{{timestampToTime(item.createdAt * 1000)}}</p>
                            </div>
                        </div>
                        <div class="recordrt">
                            <span>+{{item.cms}}元</span>
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {timestampToTime} from '../assets/untils/index'
export default {
  components: {},
  data() {
    return {
      ketixianyongjin: 66.66,
      leijiyongjin: 88.88,
      leijituiguangrenshu: 9999,
      recordList: [],
      loading:true,
      isScroll:true,
      loadingMore: false,//loading加载更多
      page:1,
      limit:8
    }
  },
  mounted() {
    document.addEventListener('scroll', this.scrollMoreData, false)
    this.getRecords()
  },
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    },
    async getRecords(){
      const res = await this.$api.Records({page:this.page,limit:this.limit})
      this.recordList = res.list
      this.leijiyongjin = res.totalCms
      this.leijituiguangrenshu = res.totalInviteNum
    },

    async scrollMoreData() {
         const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
         const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
         const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight //网页可见区域高(包括边线的宽)
         if ((scrollTopHeight + clientHeight) + 50 >= offsetHeight && this.isScroll) {
             this.isScroll = false
             this.loadingMore = true
             this.page += 1
             const res = await this.$api.Records({page:this.page,limit:this.limit})
             if(res.list){
                this.loadingMore = false
                this.recordList = this.recordList.concat(res.list)
                 this.isScroll = true
             }else{
                this.isScroll = false
               this.$toast('没有更多记录了!')
             }
            }
         },
    // // 时间戳转换成时间
      timestampToTime (time) {
       return timestampToTime(time)
    },
  },
   computed:{
    ...mapGetters(['userInfo'])
  },
  destroyed () {
    document.removeEventListener('scroll', this.scrollMoreData, false)
  }
}
</script>


<style lang="less" scoped>
#commission-page{
  background: rgba(245, 245, 245, 1);
}
.top_bg {
  width: 100%;
  height: 46.3vw;
  background: url('../assets/images/top_bg2.png') no-repeat;
  background-size: 100%;
  padding-top: 4.9vw;
  .first_div {
    height: 4.2vw;
    position: relative;
    p {
      height: 100%;
      line-height: 1;
      font-size: 4.3vw;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .rules {
      position: absolute;
      right: 0;
      top: -1vw;
      line-height: 6.2vw;
      width: 17.8vw;
      height: 6.2vw;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 31px 0px 0px 31px;
      text-align: center;
      cursor: pointer;
      span {
        height: 3.4vw;
        line-height: 1;
        display: inline-block;
        font-size: 3.5vw;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }

  h1 {
    height: 6.8vw;
    line-height: 1;
    margin: 6.2vw 0 7.2vw 0;
    font-size: 7.4vw;
    font-family: FZLTTHK_XARB;
    font-weight: normal;
    color: rgba(255, 255, 255, 1);
    text-shadow: 0 1vw 0 rgba(0, 44, 90, 0.21);
  }
  button {
    width: 30.7vw;
    height: 8vw;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.5vw 1.7vw 0 rgba(0, 44, 90, 0.21);
    border-radius: 4vw;
    font-size: 3.7vw;
    font-weight: 400;
    color: rgba(41, 97, 255, 1);
    cursor: pointer;
  }
}
.twoMsg {
  margin: 3.9vw auto 0;
  width: 93.7vw;
  height: 22.2vw;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0.1vw 2.2vw 0 rgba(0, 44, 90, 0.19);
  border-radius: 1.1vw;
  display: flex;
  justify-content: space-between;
  div {
    width: 50%;
    padding-top: 6.2vw;
    &.shuxian {
      margin-top: 6.5vw;
      width: 0.4vw;
      height: 9.3vw;
      background: rgba(245, 245, 245, 1);
      border-radius: 0.1vw;
    }
    p {
      height: 4.3vw;
      line-height: 1;
      font-size: 4.6vw;
      font-family: FZLTTHK_CJSB;
      font-weight: bold;
      color: rgba(15, 15, 15, 1);
      span {
        font-size: 3.3vw;
        margin-left: 0.2vw;
        font-weight: normal;
      }
      &:nth-of-type(2) {
        height: 3.3vw;
        margin-top: 4vw;
        line-height: 1;
        font-size: 3.3vw;
        font-weight: 400;
        color: rgba(79, 79, 79, 1);
      }
    }
  }
}
.process {
  margin-top: 2.6vw;
  width: 100%;
  height: 29.6vw;
  background: rgba(255, 255, 255, 1);
  padding: 3.4vw 0 0 4.9vw;
  .process_title {
    text-align: left;
    height: 3.8vw;
    line-height: 1;
    position: relative;
    .shuxian {
      width: 0.5vw;
      height: 3.8vw;
      background: rgba(39, 124, 255, 1);
      margin-right: 2.1vw;
      display: inline-block;
    }
    span {
      height: 3.8vw;
      position: absolute;
      top: 0;
      display: inline-block;
      font-size: 3.9vw;
      font-weight: 400;
      color: rgba(79, 79, 79, 1);
    }
  }
  .process_img {
    margin-top: 3.3vw;
    width: 100%;
    padding: 0 15vw;
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        height: 100%;
        line-height: 1;
        img {
          width: 9.63vw;
          height: 9.63vw;
          margin-bottom: 2.7vw;
        }
        p {
          height: 3.3vw;
          line-height: 1;
          font-size: 3.3vw;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
      }
      img {
        align-items: center;
        width: 6.56vw;
        height: 0.93vw;
        &.top10 {
          position: relative;
          top: 4.5vw;
        }
      }
    }
  }
}
.record {
  width: 100%;
  height: auto;
  margin-top: 1.1vw;
  ul {
    margin-top: 3.5vw;
    padding: 0 5.7vw 0 0.7vw;
    li {
      width: 100%;
      height: 15.5vw;
      border-bottom: 0.2vw solid rgba(245, 245, 245, 1);
      padding: 3.2vw 0.9vw 0;
      .recordlf {
        float: left;
        display: flex;
        img {
          width: 9.26vw;
          height: 9.26vw;
          border-radius: 0.6vw;
          overflow: hidden;
        }
        p {
          height: 3.4vw;
          line-height: 1;
          font-size: 3.5vw;
          font-weight: 400;
          color: rgba(43, 41, 41, 1);
          display: block;
          margin-top: 0.9vw;
          text-align: left;
          margin-left: 2.7vw;
          width: 100%;
          &:nth-of-type(2) {
            height: 2.8vw;
            line-height: 1;
            font-size: 2.8vw;
            color: rgba(138, 138, 138, 1);
            margin-top: 1.9vw;
          }
        }
      }
      .recordrt {
        float: right;
        span {
          height: 3.4vw;
          display: inline-block;
          line-height: 1;
          font-size: 3.7vw;
          font-weight: 500;
          color: rgba(255, 79, 50, 1);
        }
      }
      .clear {
        clear: both;
      }
    }
  }
}
</style>

