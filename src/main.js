import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import Vant from 'vant'

import './assets/less/index.less'
import 'vant/lib/index.css'

async function initail() {
  const res = await api.getPlatformInfo()
  
  localStorage.setItem('platform', JSON.stringify(res.data))

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

Vue.prototype.$api = api
Vue.config.productionTip = false
Vue.use(Vant)

initail()
