<template>
    <div id="commissionRules-page">
        <div class="rules">
            <ul>
                <li>
                    <h4>①佣金获取</h4>
                    <p>佣金获取 通过你的专属二维码关注公众号，即属于你邀请 的用户，此邀请关系永久绑定。 </p>
                </li>
                <li>
                    <h4>②佣金比例</h4>
                    <p> 赏金比例为该好友充值金额的20%（直接下线）+10%（间接下线）提成，以红包的形式返现。</p>
                </li>
                <li>
                    <h4>③佣金提现</h4>
                    <p>
                        1.佣金大于1即可提现
                    </p>
                    <p>
                        2.单次提现的金额无上限
                    </p>
                </li>
                <li>
                    <h4>④联系客服</h4>
                    <p> 如还有未详尽问题你还可以联系我们客服小姐姐，微信号：{{platform.kfWechat}}</p>
                </li>

            </ul>
        </div>
        <div class="erweima">
            <img
                :src="platform.kfImg"
                alt=""
            >
            <p>长按图片识别二维码</p>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      platform: JSON.parse(localStorage.getItem('platform'))
    }
  },
  mounted() {},
  methods: {}
}
</script>


<style lang="less" scoped>
#commissionRules-page {
  background: rgba(245, 245, 245, 1);
  padding-bottom: 30vw;
  .rules {
    padding: 6.3vw 8.2vw 0;
    width: 100%;
    ul {
      width: 100%;
      li {
        margin-top: 6.7vw;
        h4 {
          font-size: 3.9vw;
          font-weight: bold;
          text-align: left;
        }
        p {
          font-size: 3.9vw;
          font-weight: 400;
          line-height: 5.56vw;
          text-align: justify;
          margin-top: 1vw;
        }
        &:nth-of-type(1) {
          margin-top: 0;
        }
      }
    }
  }
  .erweima {
    width: 100%;
    margin-top: 10.1vw;
    text-align: center;
    img {
      width: 37vw;
      height: 37vw;
    }
    p {
      margin-top: 3.8vw;
      height: 3.8vw;
      line-height: 1;
      font-size: 3.9vw;
      font-weight: 400;
      color: rgba(18, 18, 18, 1);
    }
  }
}
</style>

