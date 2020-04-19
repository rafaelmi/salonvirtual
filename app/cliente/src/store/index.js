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
    cursos: null,
    chats: {},
    appBarOverlay: 'z-index: auto'
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
      state.cursos.forEach(curso => {
      // curso.contenido.forEach(contenido => {
      // if (contenido.hasChat) {
        const chatId = curso._id
        const chat = {}
        chat[chatId] = []
        state.chats = Object.assign({}, state.chats, chat)
        this._vm.$socket.emit('subscribe', { id: chatId })
      // }
      // })
      })
    },
    logout (state) {
      Object.keys(state.chats).forEach(chatId => {
        this._vm.$socket.emit('unsubscribe', { id: chatId })
      })
      Object.assign(state, {
        logged: false,
        started: false,
        user: null,
        chats: {}
      })
    },
    setNextRoute (state, route) {
      state.nextRoute = route
    },
    message (state, messages) {
      messages.forEach((data) => {
        state.chats[data.curso].push(data.message)
        // state.chats = Object.assign({}, state.chats)
        // state.chats[data.contenido] = [...state.chats[data.contenido], data.message]
      })
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
    },

    SOCKET_message ({ commit }, messages) {
      commit('message', messages)
    }

  },

  modules: {
  }
})
