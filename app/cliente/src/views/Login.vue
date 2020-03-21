<template>
  <v-dialog v-model="swDialog" fullscreen>
    <v-card
      class="mx-auto"
      max-width="600"
    >
      <v-card-title>
        <span class="headline">Login</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field v-model="credentials.username" label="Usuario">
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field v-model="credentials.password" type="password" label="Contraseña">
              </v-text-field>
            </v-col>
          </v-row>
          <v-alert v-if="error" dense text type="error">
            <strong>{{error.title}}:</strong> {{error.details}}
          </v-alert>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="send">ENVIAR</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Api from '@/mixins/api'

const API_URL = '/user'

export default {
  components: {
  },
  mixins: [
    Api
  ],
  data: () => ({
    swDialog: true,
    credentials: {
      username: '',
      password: ''
    },
    error: ''
  }),
  methods: {
    send () {
      this.apiCommand({
        url: API_URL,
        command: 'login',
        args: this.credentials
      })
        .then((result) => {
          if (result.result === 200) {
            this.error = ''
            this.$router.push('/home')
            this.swDialog = false
          } else {
            this.error = result
          }
        })
    }
  }
}
</script>
