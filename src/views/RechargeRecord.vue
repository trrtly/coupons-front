<template>
  <div id="RechargeRecord-page">
    <div class="record" v-if="recordList.length">
      <div class="recordList">
        <ul>
          <li v-for="(item, index) in recordList" :key="index">
            <div class="recordlf">
              <div>
                <p>{{ item.title }}</p>
                <p>{{ item.operationTime }}</p>
              </div>
            </div>
            <div class="recordrt">
              <span>{{ item.operationMoney }}</span>
            </div>
            <div class="clear"></div>
          </li>
        </ul>
      </div>
      <p class="allData">已加载全部</p>
    </div>
    <div id="RechargeRecordNoData-page" v-if="!recordList.length">
      <div class="nodata">
        <img src="@/assets/images/noData-img.png" alt="" />
        <p>暂无充值记录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      integralNun: 4579,
      recordList: [
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '1.00'
        },
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '5.00'
        },
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '1.00'
        },
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '1.00'
        },
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '1.00'
        },
        {
          title: '积分充值',
          operationTime: '2019-11-29  21:19:09',
          operationMoney: '1.00'
        }
      ]
    }
  },
  mounted() {},
  methods: {
    jumpUrl(e) {
      this.$router.push({ path: '/' + e })
    }
  }
}
</script>

<style lang="less" scoped>
#RechargeRecord-page {
  background: #fff;
  .record {
    width: 100%;
    margin-top: 0.7vw;
    ul {
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
            height: 4.1vw;
            line-height: 1;
            font-size: 4.3vw;
            font-weight: 400;
            color: rgba(43, 41, 41, 1);
            display: block;
            margin-top: 0.9vw;
            text-align: left;
            margin-left: 1.2vw;
            width: 100%;
            &:nth-of-type(2) {
              height: 2.7vw;
              line-height: 1;
              font-size: 3.3vw;
              color: rgba(138, 138, 138, 1);
              margin-top: 3.5vw;
            }
          }
        }
        .recordrt {
          float: right;
          span {
            height: 2.9vw;
            display: inline-block;
            line-height: 1;
            font-size: 4.4vw;
            font-weight: 500;
            color: #286fff;
            margin-top: 3.4vw;
          }
        }
        .clear {
          clear: both;
        }
      }
    }
    .allData {
      height: 3.2vw;
      font-size: 3.3vw;
      line-height: 1;
      font-weight: 400;
      color: rgba(138, 138, 138, 1);
      margin-top: 3.5vw;
    }
  }
  #RechargeRecordNoData-page {
    background: rgba(245, 245, 245, 1);
    width: 100%;
    height: 177.5vw;
    .nodata {
      width: 100%;
      padding-top: 50vw;
      img {
        width: 48.2vw;
      }
      p {
        margin-top: 7.2vw;
        height: 3.7vw;
        font-size: 3.7vw;
        font-weight: bold;
        color: rgba(179, 179, 179, 1);
        line-height: 1;
      }
    }
  }
}
</style>
