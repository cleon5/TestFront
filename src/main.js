import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router/router'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const rout =  new VueRouter({
  routes:router
})
Vue.use(router)
Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router:rout
}).$mount('#app')
