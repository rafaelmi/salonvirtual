import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/include/api'

Vue.use(Vuex)

const API_URL = '/user'

export default new Vuex.Store({
  state: {
    started: false,
    logged: false,
    nextRoute: '/home',
    user: null,
    cursos: null
  },

  mutations: {
    start (state) {
      state.started = true
    },
    login (state, user) {
      state.cursos = user.cursos
      delete user.cursos
      state.user = Object.assign({}, user)
      state.logged = true
    },
    logout (state) {
      Object.assign(state, {
        logged: false,
        started: false,
        user: null
      })
    },
    setNextRoute (state, route) {
      state.nextRoute = route
    }
  },

  actions: {
    start ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        if (state.started) resolve()
        else {
          api.command({
            url: API_URL,
            command: 'info',
            args: {}
          })
            .then((result) => {
              commit('start')
              if (result.result === 200) {
                commit('login', result.data)
              }
              resolve()
            })
        }
      })
    },

    login ({ dispatch, commit, state }, credentials) {
      return new Promise((resolve, reject) => {
        try {
          api.command({
            url: API_URL,
            command: 'login',
            args: Object.assign(
              {},
              credentials,
              { username: credentials.username.toLowerCase() }
            )
          })
            .then((result) => {
              if (result.result === 200) {
                commit('login', result.data)
                resolve()
              } else {
                reject(new Error(result.details))
              }
            })
        } catch (error) {
          reject(new Error('Error Interno'))
        }
      })
    },

    logout ({ commit, state }) {
      return new Promise((resolve, reject) => {
        try {
          api.command({
            url: API_URL,
            command: 'logout',
            args: {}
          })
            .then((result) => {
              if (result.result === 200) {
                commit('logout')
                resolve()
              } else {
                reject(new Error(result.details))
              }
            })
        } catch (error) {
          reject(new Error('Error Interno'))
        }
      })
    }
  },

  modules: {
  }
})
