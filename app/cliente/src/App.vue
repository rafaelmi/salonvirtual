<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="elevation-1"
    >
      <div class="d-flex align-left">
        <!--<v-list-item-avatar>
          <v-img
            contain
            :src="require('@/assets/logo_capensa.jpeg')"
            transition="scale-transition"
            width="40"
          />
        </v-list-item-avatar>-->
        <!--
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />-->
        <span class="headline font-weight-bold">Capensa</span>
      </div>

      <v-spacer></v-spacer>

      <template v-if="$store.state.logged">
        <v-btn
          text
          @click="$router.push('/home')"
        >
          <v-icon>mdi-home</v-icon>
          Cursos
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              text
              v-on="on"
            >
              <v-icon>mdi-account</v-icon>
              <span class="text-lowercase px-0">
                {{$store.state.user.username}}
              </span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="$router.push('/logout')"
            >
              <v-list-item-title>Salir</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn
          text
          @click="$router.push('/login')"
        >
          <v-icon>mdi-login</v-icon>
          Ingresar
        </v-btn>
      </template>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
    // cmpLogin () { return import('@/components/Login.vue') }
  },

  data: () => ({
    //
  }),

  created: {
  }
}
</script>
