<template>
  <div>
    <v-card
      class="mx-auto"
      max-width="900"
      color="green lighten-5"
    >
      <v-card-text class="text-center display-1 font-weight-light blue--text text--darken-4">
        Bienvenido(a) al Portal Virtual de
        Capensa Cursos
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="900"
      color="green lighten-5"
    >
      <v-card-text>
        <div class="text-center subtitle font-italic blue--text text--darken-4">
          El portal de capacitación en ciencias de la salud,
          donde puedes asistir a clases sin salir de tu casa
          y desde la comodidad de tu celular o computadora
        </div>
      </v-card-text>
    </v-card>
    <v-card
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
            v-for="(slide, i) in slides"
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
                  :src="require('@/assets/img/' + slide.src)"
                  :contain="slide.contain"
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
      color="yellow lighten-4"
    >
      <v-card-text>
        <div class="text-center title blue--text text--darken-4">
          <div class="font-italic">
            "Que gusto conocer gente linda y con buena energía...
             <span class="font-weight-bold">Capensa Cursos</span>
             gracias por compartir la sabiduría y por la oportunidad
             de hacer amigos fantásticos"
           </div>
         <span class="font-regular">Dra. Laura Avila</span>
       </div>
      </v-card-text>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="900"
      color="green lighten-5"
      @click="$router.push('/home')"
    >
      <v-app-bar
        color="green lighten-5"
        class="blue--text text--darken-4"
        prominent
      >
        <v-container>
          <v-row>
            <v-toolbar-title class="font-weight-bold headline">¿YA TIENES TU CUENTA?</v-toolbar-title>
          </v-row>
          <v-row>
            <v-toolbar-title class="font-weight-bold subtitle-1">Haz click aquí para ingresar</v-toolbar-title>
          </v-row>
        </v-container>
      </v-app-bar>
    </v-card>
    <v-card
      class="mx-auto"
      max-width="900"
      color="green lighten-5"
    >
      <!--<v-card-text class="text-center">
        <video controls class="black" width="100%" autoplay>
          <source :src="require('@/assets/video/5e7a7baa5766d124e3396578.mp4')" type="video/mp4"/>
        </video>
      </v-card-text>-->
      <!--
      <v-card-actions>
        <v-col cols="5">
          <v-btn
            block
            color="green darken-3"
            dark
            large
            rounded
            class="headline font-weight-bold"
            @click="$router.push('/registro')"
          >
            REGISTRARSE
          </v-btn>
        </v-col>
        <v-spacer/>
        <v-col cols="5">
          <v-btn
            block
            color="green darken-3"
            dark
            large
            rounded
            class="headline font-weight-bold"
          >
            INGRESAR
          </v-btn>
        </v-col>
      </v-card-actions>
    -->
    </v-card>
    <cmpResumen/>
  </div>
</template>

<script>
export default {
  props: [],
  components: {
    cmpResumen () { return import('@/views/Resumen.vue') }
  },
  data: () => ({
    slides: [
      { src: '5e7a72955766d124e3396574.jpeg' },
      { src: '5e7a73055766d124e3396576.jpeg' },
      { src: '5e7a72665766d124e3396573.jpeg' },
      { src: '5e7a72d65766d124e3396575.jpeg' },
      { src: '5e7a73145766d124e3396577.jpeg', contain: true }
    ]
  }),
  methods: {
  }
}
</script>
