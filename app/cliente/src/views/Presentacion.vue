<template>
<div>
  <v-card
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <v-card-text class="text-center display-1 font-weight-bold blue--text text--darken-4">
      {{item.title}}
    </v-card-text>
  </v-card>

  <v-card v-if="item.video"
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <v-card-text class="text-center">
      <video controls class="black" width="100%" autoplay>
        <source :src="require('@/assets/video/' + item.video)" type="video/mp4"/>
      </video>
    </v-card-text>
  </v-card>

  <v-card v-else
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <v-card-text class="text-center">
      <v-carousel
        cycle
        height="100%"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item
          v-for="(slide, i) in item.slides"
          :key="i"
        >
          <v-sheet
            height="100%"
          >
            <v-row
              align="center"
              justify="center"
            >
              <v-img
                height="400"
                width="580"
                :src="require('@/assets/img/' + slide.id + '.' + slide.ext)"
                contain
              >
              </v-img>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </v-card-text>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <v-app-bar
      :color="swInscripcion ? 'green lighten-5' : 'green lighten-3'"
      prominent
    >
      <v-container v-if="!swInscripcion">
        <v-row>
          <v-toolbar-title class="font-weight-bold headline">INSCRIPCIÓN COMPLETADA!</v-toolbar-title>
        </v-row>
        <v-row>
          <v-toolbar-title class="font-weight-bold subtitle-1">Pronto nos pondrémos en contacto con vos</v-toolbar-title>
        </v-row>
        <v-row>
          <v-icon>mdi-whatsapp</v-icon>
          <v-toolbar-title class="font-weight-bold subtitle-1">0971 429 999</v-toolbar-title>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row>
        <v-toolbar-title class="font-weight-bold headline">INSCRÍBETE YA!</v-toolbar-title>
        </v-row>
        <v-row>
          <v-toolbar-title class="font-weight-bold subtitle-1">Al whatsapp: 0971 429 999</v-toolbar-title>
        </v-row>
        <v-row>
          <v-toolbar-title class="font-weight-bold subtitle-1">O ingresando tus datos a continuación:</v-toolbar-title>
        </v-row>
      </v-container>
    </v-app-bar>
  </v-card>
  <v-card
    class="mx-auto"
    max-width="900"
    color="green lighten-5"
  >
    <cmpRegistro v-if="swInscripcion"
      :swCloseButton="false"
      title="Inscripción"
      :api="api"
      :id="item.id"
      @success="swInscripcion = false"
    />
  </v-card>
</div>
</template>

<script>
import mixCursos from '@/mixins/cursos'

export default {
  components: {
    cmpRegistro () { return import('@/views/Registro.vue') }
  },

  mixins: [
    mixCursos
  ],

  data: () => ({
    api: {
      url: 'inscripciones',
      command: 'create'
    },
    swInscripcion: true
  }),

  computed: {
    item () {
      return this.getCurso(this.$route.params.id)
    }
  }
}
</script>
