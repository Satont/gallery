import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'

import './css/styles.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('navbar', () => import('./components/navbar.vue'))
Vue.use(Router)
Vue.use(BootstrapVue)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import('./pages/home.vue'),
    },
    {
      path: '/pics',
      component: () => import('./pages/pics.vue'),
    },
  ],
})

new Vue({
  data: {
    loading: false,
  },
  router,
  render: (h) => h(App),
}).$mount('#app')
