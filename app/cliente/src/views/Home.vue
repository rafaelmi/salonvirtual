<template>
  <div>
    <v-toolbar color="primary" class="title" dark>
      <span>Mis Cursos</span>
    </v-toolbar>
    <v-card flat height="200px">
      <v-list>
      <template v-for="item in cursos">
        <v-list-item
          :key="item._id"
          @click="$router.push('/cursos/' + item._id)"
        >
          <v-list-item-avatar tile>
            <!--<v-img :src="require('@/assets/' + item.avatar)"></v-img>-->
            <v-img :src="'/api/contenido/' + item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <!--<v-list-item-subtitle v-html="item.descripcion"></v-list-item-subtitle>-->
          </v-list-item-content>
        </v-list-item>
        <v-divider :key="'divider-'+item._id" inset/>
      </template>
    </v-list>
    </v-card>
  </div>
</template>

<script>
import Api from '@/mixins/api'

// const API_URL = '/user'

export default {
  components: {
  },

  mixins: [
    Api
  ],

  data: () => ({
    barColor: 'primary'
    // cursos: []
  }),

  computed: {
    cursos () {
      return this.$store.state.cursos
    }
  },

  /*
  created () {
    this.apiCommand({
      url: API_URL,
      command: 'info',
      args: {}
    })
      .then((result) => {
        if (result.result === 200) {
          this.cursos = result.data.cursos
        } else {
        }
      })
  },
  */

  methods: {
  }
}
</script>
