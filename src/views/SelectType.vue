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
            <p>{{ item.describe2 }}</p>
          </div>
        </li>
      </ul>
    </div>
    <div class="phoneInput">
      <h3>请输入饿了么手机号</h3>
      <div class="input-box">
        <input
          type="tel"
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
          maxlength="6"
          v-model="smsCode"
        />
        <button class="btn btn-send-code" @click="getSmsCode">
          获取验证码
        </button>
      </div>
      <button type="button" @click="onSubmit" :disabled="!canSubmit">
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
    <van-popup v-model="showSueccess">
      <div class="mb-10">
        <van-icon name="passed" size="40" color="#07c160" />
      </div>
      恭喜您，领取成功!
    </van-popup>

    <van-overlay :show="showImgCodeBox">
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

      showSmsBox: false,
      smsCode: '',
      showImgCodeBox: false,
      codeImg: '',
      captchaCode: '', // 字段名是后端定义的
      captchaHash: '',
      validateToken: ''
    }
  },

  computed: {
    ...mapGetters(['userInfo'])
  },

  mounted() {
    this.Redpacks()
    this.checkUserMobile()
  },

  methods: {
    changeBg(i) {
      this.currentSort = i
    },

    async onSubmit() {
      if (!this.smsCode) {
        this.$toast('请输入短信验证码!')
        return false
      }
      const {
        inputPhoneValue,
        smsCode,
        validateToken,
        currentSort,
        ReceiveType
      } = this

      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      const loginRes = await this.$api.loginBySms({
        mobile: inputPhoneValue,
        smsCode,
        validateToken
      })

      if (loginRes != 'ok') return

      const res = await this.$api.getredPacks({
        id: ReceiveType[currentSort].id,
        mobile: inputPhoneValue
      })

      console.log(res)

      if (res.code === 0) {
        this.showFail = true
      } else {
        this.showSueccess = true
      }
    },

    async Redpacks() {
      const res = await this.$api.redPacks({})
      this.id = res[0].id
      this.ReceiveType = res
    },

    async getRedpacks() {
      const res = await this.$api.redPacks({
        id: this.id,
        mobile: this.inputPhoneValue
      })
      console.log(res)
    },

    async checkUserMobile() {
      const mobile = this.userInfo.mobile
      if (mobile) {
        this.inputPhoneValue = mobile
        const isLogin = await this.getUserCurrent(mobile)

        if (isLogin) {
          this.canSubmit = true
        } else {
          this.showSmsBox = true
        }
      } else {
        this.showSmsBox = true
      }
    },

    getUserCurrent(mobile) {
      return new Promise(async resolve => {
        const { isLogin } = await this.$api.getUserCurrent({
          mobile
        })

        resolve(isLogin)
      })
    },

    async mobileInput() {
      let reg = /^1[3|4|5|7|8|9][0-9]{9}$/
      if (reg.test(this.inputPhoneValue)) {
        const isLogin = await this.getUserCurrent(this.inputPhoneValue)
        if (isLogin) {
          this.canSubmit = true
        } else {
          this.showSmsBox = true
        }
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
      const { captchaHash, captchaImage } = await this.$api.getCaptcha({
        mobile: this.inputPhoneValue
      })
      this.captchaHash = captchaHash
      this.codeImg = 'data:image/jpg;base64,' + captchaImage

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
      this.validateToken = res.validateToken
      this.showImgCodeBox = false
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
