<template>
  <div id="integral-page">
    <div class="top_bg">
      <div class="first_div">
        <p>当前积分余额</p>
      </div>
      <h1>{{ userInfo.score}}</h1>
      <button>充值积分</button>
    </div>
    <div class="record">
      <div class="recordList">
        <ul>
          <li v-for="(item, index) in recordList" :key="index">
            <div class="recordlf">
              <img v-if="item.score > 0" src="@/assets/images/jiajifen-icon.png" alt="">
              <img v-else src="@/assets/images/jianjifen-icon.png" alt="" />
              <div>
                <p>{{ item.title }}</p>
                <p>{{timestampToTime(item.createdAt * 1000)}}</p>
              </div>
            </div>
            <div class="recordrt">
              <span v-if="item.score > 0">+{{ item.score }}</span>
              <span v-else class="colorred">{{ item.score }}</span>
            </div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {timestampToTime} from '../assets/untils/index'
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      integralNun: 4579,
      recordList: [],
      loading:true,
      isScroll:true,
      loadingMore: false,//loading加载更多
      page:1,
      limit:10
    }
  },
  mounted() {
     document.addEventListener('scroll', this.scrollMoreData, false)
    this.scoreRecords()
  },
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    },
   async scoreRecords(){
      const res = await this.$api.scoreRecords({page:this.page,limit:this.limit})
      this.recordList = res
    },
       async scrollMoreData() {
         const scrollTopHeight = document.documentElement.scrollTop || document.body.scrollTop //滚动高度
         const clientHeight = document.documentElement.clientHeight || window.screen.availHeight //屏幕可用工作区高度
         const offsetHeight = document.documentElement.offsetHeight || document.body.offsetHeight //网页可见区域高(包括边线的宽)
         if ((scrollTopHeight + clientHeight) + 50 >= offsetHeight && this.isScroll) {
             this.isScroll = false
             this.loadingMore = true
             this.page += 1
             const res = await this.$api.scoreRecords({page:this.page,limit:this.limit})
             if(res == ''){
                this.isScroll = false
                this.$toast('没有更多记录了!')
                
             }else{
               this.loadingMore = false
               this.recordList = this.recordList.concat(res)
               this.isScroll = true
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
#integral-page {
  background: #fff;
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
  .record {
    width: 100%;
    height: auto;
    margin-top: 3.6vw;
    ul {
      margin-top: 3.5vw;
      padding: 0 5.7vw 0 5.7vw;
      li {
        width: 100%;
        height: 15.5vw;
        border-bottom: 0.2vw solid rgba(245, 245, 245, 1);
        padding: 2.6vw 0.7vw 0;
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
            height: 2.9vw;
            display: inline-block;
            line-height: 1;
            font-size: 3.7vw;
            font-weight: 500;
            color: rgba(78, 194, 0, 1);
            margin-top: 3vw;
            &.colorred {
              color: rgba(255, 52, 19, 1);
            }
          }
        }
        .clear {
          clear: both;
        }
      }
    }
  }
}
</style>

