import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './store'
import './config/rem'
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
})
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
})