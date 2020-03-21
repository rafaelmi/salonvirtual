<template>
  <div>
    <v-toolbar color="primary" class="title" dark>
      <span>{{title}}</span>
    </v-toolbar>
    <v-card flat height="200px">
      <v-list three-line>
      <template v-for="item in items">
        <v-list-item
          :key="item.nombre"
          @click="open(item)"
        >
          <v-list-item-avatar>
            <v-img :src="require('@/assets/' + item.avatar)"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.nombre"></v-list-item-title>
            <v-list-item-subtitle v-html="item.descripcion"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    </v-card>
  </div>
</template>

<script>
import Api from '@/mixins/api'

const API_URL = '/cursos'

export default {
  components: {
  },

  mixins: [
    Api
  ],

  data: () => ({
    title: '',
    barColor: 'primary',
    items: []
  }),

  created () {
    this.apiCommand({
      url: API_URL,
      command: 'get',
      args: { _id: this.$route.params.id }
    })
      .then((result) => {
        console.log(result)
        if (result.result === 200) {
          this.items = result.data.contenido
          this.title = result.data.nombre
        } else {
        }
      })
  },

  methods: {
    open () {
    }
  }
}
</script>
