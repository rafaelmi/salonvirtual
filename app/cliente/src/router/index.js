import Vue from 'vue'
import VueRouter from 'vue-router'
import Init from '../views/Init.vue'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Curso from '../views/Curso.vue'
import Contenido from '../views/Contenido.vue'
import Chat from '../views/Chat.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Init',
    component: Init
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos/:id',
    name: 'Cursos',
    component: Curso
  },
  {
    path: '/contenido/:id',
    name: 'Contenido',
    component: Contenido
  },
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
