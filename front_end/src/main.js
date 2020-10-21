import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import login from './views/Login'
import register from './views/Register'
import main from './views/MainPage'
import VueCookie from 'vue-cookie'
import axios from 'axios'

Vue.config.productionTip = false
export const EventBus = new Vue();

const routes = [
  { path: "/login", component: login },
  { path: "/register", component: register },
  { path: "/main", component: main },
]
Vue.use(axios );
Vue.use(VueCookie )
Vue.use(VueRouter)
const router = new VueRouter({ routes });

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
