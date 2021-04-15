import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './EmelentUI'
import Echarts from 'echarts'
import VueEcharts from 'vue-echarts'
import axios from 'axios'
import VCharts from 'v-charts'
import 'v-charts/lib/style.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = Echarts
Vue.component('vue-echarts', VueEcharts)
Vue.use(VCharts)

axios.defaults.baseURL = "/api";
axios.defaults.timeout = 5000
axios.interceptors.response.use((response) => {
  // console.log(response)
  let res = response.data
  if (response.status === 200) {
    return res
  } else {
    return Promise.reject(response.status)
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
