import Vue from 'vue'
import VueCookies from 'vue-cookies'
import VueSocketIO from 'vue-socket.io'
import Chat from 'vue-beautiful-chat'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(VueCookies)

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://capensacursos.com', //  'http://192.168.0.3:8080',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: {
    // autoConnect: false,
    // path: '/api/socket.io'
  }
}))

Vue.use(Chat)

router.beforeEach((to, from, next) => {
  if (!store.state.started && to.params.idContenido) {
    next({ path: '/curso/' + to.params.idCurso })
  } else {
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
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
