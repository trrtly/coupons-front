<template>
  <div id="personal-page">
    <div class="top_bg">
      <div class="userimg">
        <img :src="userInfo.headimgurl" alt="" />
      </div>
      <div class="username">
        <h4>{{ userInfo.nickname }}</h4>
      </div>
    </div>
    <div class="henglan_title">
      <p>
        <span>TA的邀请数:{{ totalInviteNum }}</span>
      </p>
    </div>
    <template v-if="recordList">
      <div class="hasinvitation">
        <div class="invitation">
          <div class="invitation_title">
            <div><span>邀请列表:</span></div>
          </div>
          <div class="recordList">
            <ul>
              <li v-for="(item, index) in recordList" :key="item.id">
                <div class="recordlf">
                  <span>{{ index + 1 }}</span>.
                  <img :src="item.headimgurl" alt="" />
                  <div>
                    <p>{{ item.nickname }}</p>
                    <p>{{ timestampToTime(item.createdAt * 1000) }}</p>
                  </div>
                </div>
                <div class="clear"></div>
              </li>
            </ul>
            <button class="get_more" v-if="page <= total" @click="getList">点击加载更多</button>
            <div class="nomore" v-else>没有更多数据</div>
          </div>
        </div>
      </div>
      
    </template>

    <div class="noinvitation" v-else>
      <img src="@/assets/images/noinvitation-img.png" alt="0元购" />
      <p>TA还没有任何邀请</p>
    </div>

    <posterPopup v-if="show" @close="closePopup" />
  </div>
</template>

<script>
import { timestampToTime } from '../assets/untils/index'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      show: false,
      page: 1,
      limit: 20,
      total: 0,
      totalInviteNum: 0,
      recordList: [],
      userInfo: []
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  beforeMount() {
    this.getList()
  },

  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    },

    openPopup() {
      this.show = true
    },

    closePopup() {
      this.show = false
    },
    // 时间戳转换成时间
    timestampToTime(time) {
      return timestampToTime(time)
    },

    async getList() {
      const res = await this.$api.getInviteRecordsDetail({
        page: this.page,
        limit: this.limit,
        id: this.$router.app._route.query.id
      })
      
      this.userInfo = res.data.user
      this.recordList.push(...res.data.list)
      this.page = this.page + 1
      this.totalInviteNum = res.data.totalInviteNum
      this.total = Math.ceil(res.data.totalInviteNum / this.limit)
    }
  }
}
</script>

<style lang="less" scoped>
.top_bg {
  width: 100%;
  height: 20.4vw;
  background: rgba(255, 255, 255, 1);
  padding: 4vw 0 0 9.1vw;
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
    margin-left: 2.6vw;
    text-align: left;
    h4 {
      margin-top: 0.8vw;
      height: 4.3vw;
      line-height: 1;
      font-size: 4.4vw;
      font-weight: 500;
      color: rgba(18, 18, 18, 1);
    }
    p {
      height: 3.2vw;
      line-height: 1;
      font-size: 3.3vw;
      font-weight: 400;
      color: rgba(93, 93, 93, 1);
      margin-top: 2.7vw;
    }
  }
}
.henglan_title {
  width: 100%;
  height: 10.7vw;
  background: rgba(243, 243, 243, 1);
  line-height: 1;
  display: flex;
  align-items: center;
  p {
    width: 100%;
    height: 4.2vw;
    font-size: 3.7vw;
    font-weight: 400;
    color: rgba(48, 48, 48, 1);
    span {
      color: #fe0000;
      font-size: 4.3vw;
      font-weight: 500;
    }
  }
}
.noinvitation {
  width: 100%;
  margin-top: 33vw;
  img {
    width: 19.43vw;
    height: 19.16vw;
  }
  p {
    margin-top: 3vw;
    height: 3vw;
    line-height: 1;
    font-size: 3vw;
    font-weight: 400;
    color: rgba(110, 110, 110, 1);
  }
}
.hasinvitation {
  .invitation {
    width: 100%;
    height: auto;
    margin-top: 1.1vw;
    margin-bottom: 30vw;
    .invitation_title {
      width: 100%;
      text-align: left;
      line-height: 1;
      position: relative;
      padding: 0 5.6vw;
      div {
        height: 9.7vw;
        width: 100%;
        display: flex;
        align-items: center;
        border-bottom: 1px solid rgba(245, 245, 245, 1);
        padding-left: 3.8vw;
        span {
          height: 3.8vw;
          display: inline-block;
          font-size: 3.9vw;
          font-weight: 400;
          color: rgba(79, 79, 79, 1);
        }
      }
    }
    ul {
      padding: 0 5.6vw;
      li {
        width: 100%;
        height: 15.5vw;
        border-bottom: 0.2vw solid rgba(245, 245, 245, 1);
        padding: 2.6vw 0 0 5.1vw;
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
            color: #2786ff;
          }
        }
        .clear {
          clear: both;
        }
      }
    }
  }
}
.invitationList {
  width: 100%;
  height: 21.1vw;
  background: rgba(255, 255, 255, 1);
  position: fixed;
  bottom: 0vw;
  button {
    width: 79.4vw;
    height: 11.1vw;
    background: linear-gradient(
      267deg,
      rgba(41, 85, 255, 1) 0%,
      rgba(39, 134, 255, 1) 100%
    );
    box-shadow: 0px 0.9vw 2.2vw 0 rgba(0, 53, 233, 0.36);
    border-radius: 0.9vw;
    margin: 0 auto;
    font-size: 4.3vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}

.get_more {
  padding: 1vw 2vw;
  margin: 2vw auto;
  font-size: 3.5vw;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    267deg,
    rgba(41, 85, 255, 1) 0%,
    rgba(39, 134, 255, 1) 100%
  );
  border-radius: 0.9vw;
}

.nomore {
  margin: 2vw auto;
  font-size: 3.5vw;
  color: #666;
}
</style>
