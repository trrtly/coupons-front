<template>
  <div>
    <van-nav-bar title="英语四六级准考证号码找回" />
    <van-form>
      <van-field
        readonly
        clickable
        :value="provinceName"
        label="省份：	"
        placeholder="请选择省份"
        @click="showProvince = true"
      />
      <van-field
        readonly
        clickable
        :value="IDTypeName"
        label="证件类型：	"
        placeholder="请选择证件类型"
        @click="showIDType = true"
      />
      <van-field
        v-model="IDNumber"
        label="证件号码："
        placeholder=""
        :rules="[{ required: true, message: '请填写证件号码' }]"
      />
      <van-field
        v-model="Name"
        label="姓名："
        placeholder=""
        :rules="[{ required: true, message: '请填写姓名' }]"
      />
      <van-field
        v-model="imgCode"
        center
        clearable
        label="验证码："
        placeholder=""
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <van-icon
          slot="right-icon"
          :name="codeImg"
          size="5rem"
          @click="getCodeImg"
        />
      </van-field>
      <div class="submit">
        <van-button
          round
          block
          type="primary"
          @click="onSubmit"
        >
          点击找回
        </van-button>
      </div>
    </van-form>

    <van-popup
      v-model="showProvince"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="provinceList"
        @confirm="onConfirm"
        @cancel="showProvince = false"
      />
    </van-popup>
    <van-popup
      v-model="showIDType"
      position="bottom"
    >
      <van-picker
        show-toolbar
        :columns="IDTypeList"
        @confirm="onIDTypeConfirm"
        @cancel="showIDType = false"
      />
    </van-popup>
    <van-popup
      v-model="showResult"
      :style="{ width: '80%' }"
    >
      <van-cell-group
        border
        v-for="(item, index) in result"
        :key="index"
        :title="item.SubjectName"
      >
        <van-cell
          title="准考证号"
          :value="item.TestTicket"
        />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar, Form, Picker, Popup, Field, Icon, Button, Cell, CellGroup } from 'vant';
import {provinceList} from '../assets/untils/province'
import {IDTypeList} from '../assets/untils/idtypelist'

Vue.use(NavBar);
Vue.use(Form);
Vue.use(Picker);
Vue.use(Popup);
Vue.use(Field);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Cell);
Vue.use(CellGroup);

export default {
  data () {
    return {
      showProvince: false,
      showIDType: false,
      showResult: false,
      provinceCode: null,
      provinceName: null,
      IDTypeCode: null,
      IDTypeName: null,
      IDNumber: '',
      Name: '',
      codeImg: '',
      imgCode: '',
      provinceList: provinceList,
      IDTypeList: IDTypeList,
      result: null
    }
  },
  mounted () {
    this.getCodeImg()
  },
  methods: {
    async getCodeImg () {
      const res = await this.$api.cet4ValidateImg()
      if (res.code !== 200) {
        this.$toast(res.msg)
        return
      }
      this.codeImg = 'data:image/jpg;base64,' + res.data
    },
    onConfirm(value) {
      this.provinceName = value.text;
      this.provinceCode = value.key;
      this.showProvince = false;
    },
    onIDTypeConfirm(value) {
      this.IDTypeName = value.text;
      this.IDTypeCode = value.key;
      this.showIDType = false;
    },
    async onSubmit() {
      // this.result = [{"SubjectName":"英语四级笔试","TestTicket":"358010192102821"}];
      // this.showResult = true
      // return
      const res = await this.$api.cet4Find({
        provinceCode: this.provinceCode,
        IDTypeCode: this.IDTypeCode,
        IDNumber: this.IDNumber,
        Name: this.Name,
        verificationCode: this.imgCode,
      })
      if (res.code !== 200) {
        this.getCodeImg()
        this.$toast(res.msg)
        return
      }
      this.result = res.data
      this.showResult = true
      console.log(this.result)
    }
  }
}
</script>
.submit {
  margin-top: 30px;
}
<style>
.submit {
  margin-top: 30px;
}
</style>
