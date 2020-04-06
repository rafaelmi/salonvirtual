<template>
  <div>
    <v-toolbar color="primary" class="title" dark>
      <span>{{'CURSO: ' + curso.title}}</span>
    </v-toolbar>
    <v-card flat height="200px">
      <template v-if="items.length">
        <v-list>
          <template v-for="item in items">
            <v-list-item
              :key="item._id"
              @click="open(item)"
            >
              <v-list-item-avatar tile>
                <v-img :src="require('@/assets/icons/' + icon(item.ext))"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-html="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider :key="'divider-'+item._id" inset/>
          </template>
        </v-list>
      </template>
      <template v-else>
        <v-card-title class="blue--text text--darken-4">
          <v-icon class="mx-4" color="blue darken-4">mdi-calendar-clock</v-icon>
          Inicia el 13 de Abril de 2020
          <v-spacer/>
        </v-card-title>
      </template>
    </v-card>
  </div>
</template>

<script>
import Api from '@/mixins/api'

// const API_URL = '/cursos'

export default {
  components: {
  },

  mixins: [
    Api
  ],

  data: () => ({
    barColor: 'primary'
    // items: []
  }),

  computed: {
    curso () {
      return this.$store.state.cursos.find(el => el._id === this.$route.params.id)
    },
    items () {
      return this.curso.contenido
    }
  },

  /*
  created () {
    this.apiCommand({
      url: API_URL,
      command: 'get',
      args: { _id: this.$route.params.id }
    })
      .then((result) => {
        if (result.result === 200) {
          this.items = result.data.contenido
          this.title = result.data.nombre
        } else {
        }
      })
  },
  */

  methods: {
    open (item) {
      this.$router.push('/contenido/' + item._id)
    },
    icon (ext) {
      const icons = {
        pdf: 'pdf.png'
      }
      return icons[ext]
    }
  }
}
</script>
