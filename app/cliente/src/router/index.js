import Vue from 'vue'
import VueRouter from 'vue-router'
import Init from '../views/Init.vue'
import Presentacion from '../views/Presentacion.vue'
import Registro from '../views/Registro.vue'
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
    path: '/presentacion/:id',
    name: 'Presentacion',
    component: Presentacion
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: { requiresAuth: true }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  },
  {
    path: '/curso/:idCurso',
    name: 'Curso',
    component: Curso,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'contenido/:idContenido',
        component: Contenido
      },
      {
        path: 'chat',
        name: 'Chat',
        component: Chat,
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/download/:idDownload',
    name: 'Download',
    meta: { requiresAuth: true },
    // redirect: '/api/contenido/5e77e132d9fd1eaa0f1dba7e'
    redirect: to => {
      return 'localhost:8080/api/contenido/' + to.params.idDownload
    }
  },
  /*
  {
    path: '/contenido/:id',
    name: 'Contenido',
    component: Contenido,
    meta: { requiresAuth: true }
  }, */
  {
    path: '/chat/:id',
    name: 'Chat',
    component: Chat,
    meta: { requiresAuth: true }
  }
  /*
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import( webpackChunkName: "about"  '../views/About.vue')
    }
  }
  */
]

const router = new VueRouter({
  routes
})

export default router
