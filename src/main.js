import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from "axios"
import moment from "moment"
import '@/assets/styles/global.css'
import '@/assets/styles/styles.css'

Vue.config.productionTip = false
Vue.prototype.$http = Axios
Vue.prototype.$moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
