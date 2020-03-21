<template>
  <v-card
    class="mx-auto"
    max-width="600"
  >
    <v-card-text class="text-justify">
      <span class="title text--primary font-weight-bold">
        Bienvenido al aula virtual de Capensa Cursos
      </span>
    </v-card-text>
    <v-card-actions>
      <v-btn
        block
        color="pink"
        dark
        x-large
        rounded
        class="headline font-weight-bold"
        @click="$router.push('/login')"
      >
        INGRESAR
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [],
  components: {
  },
  data: () => ({
  }),
  methods: {
  }
}
</script>
