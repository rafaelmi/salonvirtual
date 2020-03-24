<template>
  <div>
    <v-toolbar color="primary" class="title" dark>
      <span>{{title}}</span>
      <v-spacer/>
      <!--<v-btn icon @click="$router.push('/chat/' + $route.params.id)">
        <v-icon>mdi-comment-multiple</v-icon>
      </v-btn>-->
    </v-toolbar>
      <v-card-text class="text-center">
        <video controls class="black" width="280"> <!-- width="320" height="240" -->
          <source :src="'/api/contenido/' + $route.params.id" type="video/mp4"/>
        </video>
      </v-card-text>
      <chat/>
  </div>
</template>

<script>
import Api from '@/mixins/api'
import Chat from '@/components/Chat.vue'

// const API_URL = '/contenido'

export default {
  components: {
    Chat
  },

  mixins: [
    Api
  ],

  data: () => ({
    title: 'Electrocardiograma : Clase #1',
    barColor: 'primary'
  }),

  created () {
  },

  methods: {
  }
}
</script>
