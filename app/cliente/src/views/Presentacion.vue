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
</div>
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
  }),

  computed: {
    item () {
      return this.getCurso(this.$route.params.id)
    }
  }
}
</script>
