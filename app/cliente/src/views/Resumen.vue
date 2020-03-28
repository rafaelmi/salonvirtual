<template>
  <v-card
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <v-app-bar
      dark
      color="green lighten-2"
    >
      <v-toolbar-title class="font-weight-bold headline">CURSOS DISPONIBLES</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-container>
      <v-row dense>
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="item.color"
            dark
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <v-img
                :src="require('@/assets/img/' + item.id + '.' + item.ext)"
                @click="$router.push('/presentacion/' + item.id)"
              >
              </v-img>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import mixCursos from '@/mixins/cursos'

export default {
  components: {
  },

  mixins: [
    mixCursos
  ],

  data: () => ({
    /* items: [
      { title: 'Alteraciones Cardiovasculares', id: '5e7f733f3ede40fc1961ac3b' },
      { title: 'Electrocardiografía', id: '5e7f76a13ede40fc1961ac3c' },
      { title: 'Manejo de Liquidos y Electrolitos', id: '5e7f78de3ede40fc1961ac3d' },
      { title: 'Alteraciones Neurológicas', id: '5e7fa2993ede40fc1961ac3e' },
      { title: 'Trastornos Respiratorios', id: '5e7fa2dc3ede40fc1961ac3f' }
    ] */
  }),

  computed: {
    items () {
      return this.getCursos()
    }
  }

}
</script>
