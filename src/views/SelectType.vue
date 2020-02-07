<template>
  <div id="SelectType">
    <div class="title_name">
      <h2>请选择您领取的红包类型</h2>
    </div>
    <div class="change_type">
      <ul>
        <li
          :class="{ isSelect: currentSort === index }"
          v-for="(item, index) in ReceiveType"
          :key="index"
          @click="changeBg(index)"
        >
          <div class="selectTop">
            <h3>{{ item.title }}</h3>
            <span>{{ item.score }}积分/次</span>
          </div>
          <div class="selectBottom" v-if="currentSort === index">
            <p>{{ item.description }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="phoneInput">
      <h3>请输入饿了么手机号</h3>
      <div class="input-box">
        <input
          type="text"
          placeholder="11位手机号"
          maxlength="11"
          v-model="inputPhoneValue"
          @input="mobileInput"
        />
      </div>
      <div class="input-box" v-if="showSmsBox">
        <input
          type="number"
          placeholder="短信验证码"
          max="6"
          v-model="smsCode"
        />
        <button class="btn btn-send-code" @click="getSmsCode">
          获取验证码
        </button>
      </div>
      <button type="button" @click="onSubmit">
        马上领取饿了么大红包
      </button>
      <h4>领取规则</h4>
      <div class="getrules" v-for="(item, index) in ReceiveType" :key="index">
        <div
          id="homegetRulesstyle"
          v-html="item.rule"
          v-if="currentSort === index"
        ></div>
      </div>
      <!-- <p>asddddd</p> -->
    </div>
    <!-- <van-cell is-link @click="showPopup">展示弹出层</van-cell> -->
    <!-- <van-loading color="#1989fa" /> -->
    <van-popup v-model="showFail">
      <div class="mb-10">
        <van-icon name="close" size="40" color="#f56c6c" />
      </div>
      很抱歉，领取失败!
    </van-popup>

    <div class="success_layer" v-if="showSueccess">
      <div class="bg"></div>
      <div class="content_wrap">
        <p class="title">{{ redPacksRes.title }}</p>
        <p class="spend">{{ redPacksRes.subTitle }}</p>

        <ul>
          <li v-for="(item, index) in redPacksRes.list" :key="index">
            <div class="left_size">
              <span>¥</span>
              {{ item.amount }}
            </div>
            <div class="rigth_size">
              <p>{{ item.title }}</p>
              <span>{{ item.threshold }}</span>
            </div>
          </li>
        </ul>

        <button>再领取一个免费红包（{{ count }}S后跳转）</button>
      </div>

      <img
        src="@/assets/images/circle-close.png"
        alt="close"
        @click="showSueccess = false"
      />
    </div>

    <van-overlay :show="showImgCodeBox" @click="showImgCodeBox = false">
      <div class="wrapper" @click.stop>
        <div class="block">
          <div class="input-box">
            <input
              type="text"
              maxlength="4"
              v-model="captchaCode"
              placeholder="请输入图形验证码"
            />
            <img :src="codeImg" alt="图形验证码" @click="getImgCode" />
          </div>

          <button type="button" class="btn" @click="sendSms">确定</button>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showFail: false,
      showSueccess: false,
      ReceiveType: [],
      currentSort: 0,
      id: '',
      inputPhoneValue: '',
      canSubmit: false,
      redPacksRes: {},

      showSmsBox: false,
      smsCode: '',
      showImgCodeBox: false,
      isLogin: false,
      codeImg: '',
      captchaCode: '', // 字段名是后端定义的
      captchaHash: '',
      validateToken: '',
      count: 3,
      href: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
    this.Redpacks()
    // this.checkUserMobile()
  },

  methods: {
    changeBg(i) {
      this.currentSort = i
    },

    async onSubmit() {
      if (!this.inputPhoneValue) {
        this.$toast('请输入手机号码!')
        return false
      }

      const loginEle = await this.loginEle()
      if (!loginEle) {
        return false
      }
      const { code, data } = await this.$api.getredPacks({
        id: this.ReceiveType[this.currentSort].id,
        mobile: this.inputPhoneValue
      })

      if (code !== 200) {
        this.showFail = true
      } else {
        this.redPacksRes = data

        if (data.type === 1) {
          let platform = JSON.parse(localStorage.getItem('platform'))
          let num = Math.floor(Math.random() * (platform.cps.length + 1))
          this.href = platform.cps[num]
        } else {
          this.href = data.url
        }
        this.showSueccess = true

        setInterval(() => {
          this.count--
          if (this.count == 0) {
            location.href = this.href
          }
        }, 1000)
      }
    },

    async Redpacks() {
      const res = await this.$api.redPacks({})
      this.id = res.data[0].id
      this.ReceiveType = res.data
    },

    loginEle() {
      return new Promise(async resolve => {
        const that = this
        if (this.isLogin) {
          resolve(true)
        }
        if (this.showSmsBox && !this.smsCode) {
          this.$toast('请输入短信验证码!')
          resolve(false)
        }

        let currentScore = this.ReceiveType[this.currentSort].socre
        if (this.userInfo.score < currentScore) {
          this.$dialog
            .alert({
              confirmButtonText: '前往充值',
              showCancelButton: true,
              message: '您的积分余额不足，快来充值积分吧!'
            })
            .then(() => {
              that.$router.push({ path: '/chongzhiIntegral' })
            })
            .catch(() => {})
          resolve(false)
        }

        const { inputPhoneValue, smsCode, validateToken } = this

        this.$toast.loading({
          message: '领取中，请稍等...',
          forbidClick: true
        })

        const loginRes = await this.$api.loginBySms({
          mobile: inputPhoneValue,
          smsCode,
          validateToken
        })

        if (loginRes.code != 200) {
          resolve(false)
        }
        resolve(true)
      })
    },

    async checkUserMobile() {
      const mobile = this.userInfo.mobile
      if (mobile) {
        this.inputPhoneValue = mobile
        const res = await this.$api.getUserCurrent({ mobile })
        if (res.code == 200 && res.data.isLogin) {
          this.canSubmit = true
          this.isLogin = true
        } else {
          this.showSmsBox = true
        }
      } else {
        this.showSmsBox = true
      }
    },

    async mobileInput() {
      let reg = /^1[3|4|5|7|8|9][0-9]{9}$/
      const mobile = this.inputPhoneValue
      if (reg.test(mobile)) {
        const res = await this.$api.getUserCurrent({ mobile })
        if (res.code == 200 && res.data.isLogin) {
          this.canSubmit = true
        } else {
          this.showSmsBox = true
        }
      }

      let reg2 = new RegExp('^[0-9]*$')
      if (!reg2.test(mobile[mobile.length - 1])) {
        this.inputPhoneValue = mobile.substring(0, mobile.length - 1)
      }
    },

    getSmsCode() {
      let reg = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (!reg.test(this.inputPhoneValue)) {
        this.$toast('请输入正确的手机号码!')
        return
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      this.getImgCode(() => {
        this.$nextTick(() => {
          this.$toast.clear()
          this.showImgCodeBox = true
        })
      })
    },

    async getImgCode(cb) {
      const res = await this.$api.getCaptcha({
        mobile: this.inputPhoneValue
      })
      this.captchaHash = res.data.captchaHash
      this.codeImg = 'data:image/jpg;base64,' + res.data.captchaImage

      cb && cb()
    },

    async sendSms() {
      const { inputPhoneValue, captchaHash, captchaCode } = this
      const res = await this.$api.sendSms({
        mobile: inputPhoneValue,
        captchaHash,
        captchaCode
      })

      this.$toast('短信验证码发送成功！请注意查收')
      this.canSubmit = true
      this.validateToken = res.data.validateToken
      this.showImgCodeBox = false
    }
  },
  watch: {
    userInfo: function() {
      this.checkUserMobile()
    }
  }
}
</script>

<style lang="less" scoped>
#SelectType {
  padding-bottom: 5vw;
}
.title_name {
  height: 9.4vw;
  width: 100%;
  line-height: 9.4vw;
  text-align: left;
  padding-left: 7.3vw;
  box-sizing: border-box;
  h2 {
    font-size: 3.9vw;
    font-weight: 400;
    color: rgba(33, 33, 33, 1);
  }
}
.change_type {
  width: 90.2vw;
  // height: 93.6vw;
  padding-bottom: 3vw;
  margin: 0 auto;
  background: rgba(233, 240, 245, 1);
  box-shadow: 0 0.5vw 1.5vw 0 rgba(4, 0, 0, 0.07);
  border-radius: 1.5;
  ul {
    width: 100%;
    padding-top: 3.6vw;
    li {
      margin: 0 auto;
      width: 81.1vw;
      background: rgba(255, 255, 255, 1);
      border-radius: 1.3vw;
      margin-bottom: 1.9vw;
      padding: 3.8vw 4.2vw;
      overflow: hidden;
      .selectTop {
        overflow: hidden;
        h3 {
          height: 4.5vw;
          line-height: 1;
          font-size: 4.4vw;
          font-weight: 600;
          color: rgba(33, 33, 33, 1);
          float: left;
        }
        span {
          float: right;
          height: 3.8vw;
          line-height: 1;
          font-size: 3.9vw;
          font-weight: 500;
          color: rgba(243, 74, 0, 1);
        }
      }
      &.isSelect {
        width: 81.1vw;
        background: rgba(243, 248, 255, 1);
        border: 0.2vw solid rgba(41, 89, 255, 1);
        box-shadow: 0 0.6vw 2.2vw 0 rgba(23, 110, 200, 0.27);
        border-radius: 1.3vw;
        h3 {
          color: rgba(41, 89, 255, 1);
        }
        p {
          line-height: 1.4;
          font-size: 3.7vw;
          font-weight: 400;
          color: rgba(84, 84, 84, 1);
          margin: 2.5vw 0 0;
          text-align: left;
          &:last-of-type {
            margin: 0;
          }
        }
      }
    }
  }
}
.phoneInput {
  width: 90.2vw;
  background: rgba(255, 255, 255, 1);
  border-radius: 1.3vw;
  margin: 0 auto;
  padding: 5.3vw 7vw 4.8vw;
  text-align: left;
  margin-bottom: 15vw;
  h3 {
    height: 3.8vw;
    line-height: 1;
    text-align: left;
    font-size: 3.9vw;
    font-weight: 400;
    margin-bottom: 5.3vw;
    color: rgba(33, 33, 33, 1);
  }
  input {
    width: 79.4vw;
    height: 11.1vw;
    background: rgba(242, 242, 242, 1);
    border-radius: 0.9vw;
    padding-left: 2.6vw;
    font-size: 3.5vw;
    font-weight: 400;
  }
  > button {
    width: 100%;
    height: 11.1vw;
    background: linear-gradient(
      267deg,
      rgba(41, 85, 255, 1) 0%,
      rgba(39, 134, 255, 1) 100%
    );
    box-shadow: 0vw 0.9vw 2.2vw 0vw rgba(0, 53, 233, 0.36);
    border-radius: 0.9vw;
    font-size: 4.3vw;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  h4 {
    height: 3.4vw;
    font-size: 3.5vw;
    margin: 4.6vw 0 3.9vw 0;
    font-weight: 400;
    color: rgba(83, 83, 83, 1);
    line-height: 1;
  }
}

.input-box {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4vw 0;
  background: #f7f8fa;
  border-radius: 4px;
}

.btn {
  flex-shrink: 0;
  width: max-content;
  color: #fff;
  font-weight: 700;
  border-radius: 4px;
  background: linear-gradient(267deg, #2955ff 0%, #2786ff 100%);

  &.btn-send-code {
    height: 10vw;
    padding: 2vw 4vw;
    font-size: 2vw;
  }
}

/deep/ .van-popup {
  width: 60.6vw;
  padding: 4vw 6.4vw;
  font-size: 3.6vw;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 5vw;
  text-align: cetner;
  background: linear-gradient(
    88deg,
    rgba(41, 87, 255, 1),
    rgba(39, 134, 255, 1)
  );
  border-radius: 6px;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  // display: flex;
  // align-items: center;
  width: 80%;
  padding: 4vw;
  background-color: #fff;
  border-radius: 6px;

  input {
    flex: 1;
    padding: 2vw 0 2vw 4vw;
    background: rgba(242, 242, 242, 1);
  }

  img {
    width: 20vw;
    height: 9vw;
  }

  button {
    width: 100%;
    padding: 2.5vw;
    margin-top: 1vw;
    margin-bottom: 2vw;
  }
}

// 领取成功的弹窗
.success_layer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 2;

  .bg {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }

  .content_wrap {
    position: absolute;
    top: 18.2vw;
    left: 50%;
    width: 70.3vw;
    height: 112.4vw;
    background: url('../assets/images/success-bg.png') no-repeat top left;
    background-size: 100% 100%;
    transform: translateX(-50%);
    overflow: hidden;

    .title {
      margin-top: 23vw;
      margin-bottom: 2vw;
      font-size: 3.92vw;
      color: #ffce93;
    }

    .spend {
      // margin-top: 31vw;
      font-size: 2.64vw;
      color: rgb(255, 255, 255);
      line-height: 0.189;
    }

    ul {
      width: 47.4vw;
      height: 45.6vw;
      margin-left: 12vw;
      margin-top: 7.5vw;
      overflow-y: scroll;

      li {
        display: flex;
        height: 13.64vw;
        margin-bottom: 2.4vw;
        color: #f53248;
        background: url('../assets/images/bag-item-bg.png') no-repeat center
          center;
        background-size: 100% 100%;

        &:last-of-type {
          margin-bottom: 0;
        }

        .left_size {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 13.6vw;
          height: 100%;
          font-size: 5.24vw;

          span {
            font-size: 3.9vw;
          }
        }

        .rigth_size {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          height: 100%;
          padding-left: 3.4vw;

          p {
            font-size: 3.27vw;
          }

          span {
            font-size: 2.83vw;
          }
        }
      }
    }

    button {
      position: absolute;
      bottom: 3.6vw;
      left: 50%;
      width: 83%;
      height: 10.7vw;
      padding-left: 11px;
      font-size: 3.49vw;
      color: #d14222;
      text-align: center;
      background-color: transparent;
      border: 0;
      transform: translateX(-49%);
      border-radius: 5.4vw;
    }
  }

  img[alt='close'] {
    position: absolute;
    top: 134vw;
    left: 50%;
    width: 8vw;
    height: 8vw;
    transform: translateX(-50%);
  }
}
</style>

<style lang="less">
#homegetRulesstyle {
  p {
    line-height: 1.5;
    font-size: 3.3vw;
    font-weight: 400;
    color: rgba(83, 83, 83, 1);
    margin-bottom: 2vw;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>
