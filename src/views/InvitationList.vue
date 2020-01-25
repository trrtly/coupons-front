<template>
  <div id="personal-page">
    <div class="top_bg">
      <div class="userimg">
        <img :src="userInfo.headimgurl" alt="" />
      </div>
      <div class="username">
        <h4>{{ userInfo.nickname }}</h4>
        <p id="userid">UID:{{ userInfo.id }}</p>
      </div>
    </div>
    <div class="henglan_title">
      <p>
        每邀请一位好友关注本公众号，你的
        <span>积分+12</span>
      </p>
    </div>
    <div class="noinvitation" v-if="!recordList.length">
      <img src="@/assets/images/noinvitation-img.png" alt="0元购" />
      <p>您还没有任何邀请</p>
    </div>
    <div class="hasinvitation" v-if="recordList.length">
      <div class="invitation">
        <div class="invitation_title">
          <div><span>邀请列表:</span></div>
        </div>
        <div class="recordList">
          <ul>
            <li v-for="(item, index) in recordList" :key="index">
              <div class="recordlf">
                <img :src="item.src" alt="" />
                <div>
                  <p>{{ item.username }}</p>
                  <p>{{ item.withdrawalTime }}</p>
                </div>
              </div>
              <div class="clear"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="invitationList">
      <button @click="openPopup">马上邀请</button>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
      <img src="@/assets/images/share_bg.png" alt="邀请" />
      <div class="close-btn" @click="closePopup">
        <img src="@/assets/images/close-btn.png" alt="关闭" />
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  components: {},
  data() {
    return {
      show: false,
      recordList: [
        {
          src: require('@/assets/images/user_small_1.png'),
          username: '想吃烧烤',
          withdrawalTime: '2019-11-29  21:19:09'
        },
        {
          src: require('@/assets/images/user_small_2.png'),
          username: '想吃火锅',
          withdrawalTime: '2019-11-29  21:19:09'
        },
        {
          src: require('@/assets/images/user_small_3.png'),
          username: '想看电影',
          withdrawalTime: '2019-11-29  21:19:09'
        },
        {
          src: require('@/assets/images/user_small_3.png'),
          username: '想看电影',
          withdrawalTime: '2019-11-29  21:19:09'
        },
        {
          src: require('@/assets/images/user_small_3.png'),
          username: '想看电影',
          withdrawalTime: '2019-11-29  21:19:09'
        },
        {
          src: require('@/assets/images/user_small_3.png'),
          username: '想看电影',
          withdrawalTime: '2019-11-29  21:19:09'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    },
    openPopup() {
      this.show = true
    },
    closePopup() {
      this.show = false
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
            color: rgba(255, 79, 50, 1);
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
/deep/.van-popup {
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
