<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="elevation-1"
    >
      <div class="d-flex align-center">
        <v-list-item-avatar>
          <!--<v-img
            class="shrink mr-2"
            contain
            :src="require('@/assets/logo_capensa.jpg')"
            transition="scale-transition"
            width="40"
          />-->
          <v-img
            contain
            :src="require('@/assets/logo_capensa.jpg')"
            transition="scale-transition"
            width="40"
          />
        </v-list-item-avatar>
        <!--
        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />-->
        <span class="headline">Capensa Cursos</span>
      </div>

      <v-spacer></v-spacer>

      <!--<v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
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
  },

  data: () => ({
    //
  })
}
</script>
