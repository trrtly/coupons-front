<template>
    <div id="Welfare-page">
        <div
            class="record"
            v-if="recordList.length"
        >
            <div class="recordList">
                <ul>
                    <li
                     v-for="(item,index) in recordList"
                    :key="index"
                    >
                        <img
                            :src="item.src"
                            alt=""
                        >
                        <p>{{item.title}}</p>
                    </li>
                </ul>
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
          src: require('@/assets/images/gouwu-icon.png'),
          title: '0元购'
        },
        {
          src: require('@/assets/images/eleme-icon.png'),
          title: '饿了么大红包'
        },
        {
          title: '免费外卖红包',
          src: require('@/assets/images/hongbao-icon.png')
        },
        {
          title: '美团免费红包',
          src: require('@/assets/images/meituan-icon.png')
        },
        {
          title: '免费领积分',
          src: require('@/assets/images/jifentubiao-icon.png')
        },
        {
          title: '淘宝隐藏优惠券',
          src: require('@/assets/images/taobao-icon.png')
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
#Welfare-page {
  background: rgba(243, 243, 243, 1);
  height: 177.5vw;
  .record {
    width: 100%;
    ul {
      padding: 3.3vw 4.8vw 0;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 43.4vw;
        height: 33.3vw;
        background: rgba(255, 255, 255, 1);
        margin-right: 3.5vw;
        margin-bottom: 2.8vw;
        img {
          width: 15.34vw;
          height: 15.4vw;
          border-radius: 50%;
          overflow: hidden;
          margin-top: 3vw;
        }
        p {
          height: 3.8vw;
          line-height: 1;
          font-size: 3.9vw;
          font-weight: 400;
          color: rgba(21, 21, 21, 1);
          margin-top: 2vw;
          width: 100%;
        }
        &:nth-of-type(2n){
            margin-right: 0;
        }
      }
    }
  }
}
</style>

