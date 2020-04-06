import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Chat from 'vue-beautiful-chat'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(Chat)

router.beforeEach((to, from, next) => {
  store.dispatch('start').then(() => {
    if (!to.meta || !to.meta.requiresAuth) next()
    else {
      if (store.state.logged) {
        if (to.name === 'Login') next({ name: 'Home' })
        else if (to.name === 'Logout') {
          store.dispatch('logout')
            .then(() => next({ name: 'Init' }))
        } else next()
      } else {
        if (['Login', 'Init'].indexOf(to.name) >= 0) {
          store.commit('setNextRoute', '/home')
          next()
        } else {
          store.commit('setNextRoute', to.path)
          next({ name: 'Login' })
        }
      }
    }
  })
})

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
