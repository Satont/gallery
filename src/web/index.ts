import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'

Vue.component('navbar', () => import('./components/navbar.vue'))
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('./pages/home.vue'),
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
