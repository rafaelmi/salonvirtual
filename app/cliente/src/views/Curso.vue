<template>
  <div>
    <v-toolbar color="primary" class="title" dark>
      <span>{{curso.title}}</span>
    </v-toolbar>
    <template v-if="$route.params.idContenido">
      <router-view/>
    </template>
    <template v-else>
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

                <v-list-item-action v-if="!item.keyRequired">
                  <v-btn
                    icon
                    :href="'/api/contenido/' + item._id"
                    :download="item.title + '.' + item.ext"
                    @click.stop
                  >
                    <v-icon color="green">mdi-download</v-icon>
                  </v-btn>
                </v-list-item-action>

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
    </template>
    <chat :messages="$store.state.chats[$route.params.idCurso]"/>
  </div>
</template>

<script>
import Api from '@/mixins/api'
import Chat from '@/components/Chat.vue'

// const API_URL = '/cursos'

export default {
  components: {
    Chat
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
      return this.$store.state.cursos.find(el => el._id === this.$route.params.idCurso)
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
      // this.$router.push('/contenido/' + item._id)
      this.$router.push(this.$route.path + '/contenido/' + item._id)
    },
    icon (ext) {
      const icons = {
        pdf: 'pdf.png',
        mp4: 'mp4.jpg'
      }
      return icons[ext]
    }
  }
}
</script>
