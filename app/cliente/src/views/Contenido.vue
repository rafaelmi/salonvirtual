<template>
  <div>
    <!--<v-toolbar color="primary" class="title" dark fixed>
      <span>{{info.title}}</span>
      <v-spacer/>
    </v-toolbar>-->
    <template v-if="info.ext == 'pdf'">
      <pdf :src="src"
        :page="pdf.setPage"
        @num-pages="pdf.pageCount = $event"
        @page-loaded="pdf.currentPage = $event"
        @loaded="pdf.loading = false"
      >
      </pdf>
      <div class="text-center">
        <v-bottom-sheet
          inset
          :value="true"
          hide-overlay
          persistent
        >
          <v-card tile>
            <v-progress-linear
              :value="pdf.currentPage/pdf.pageCount*100"
              class="my-0"
              height="3"
            ></v-progress-linear>

            <v-list dense class="green lighten-4">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>{{info.title}}</v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon>
                  <v-btn
                    icon
                    small
                    :disabled="pdf.currentPage == 1"
                    @click="pdf.setPage = pdf.currentPage - 1"
                  >
                    <v-icon large>mdi-menu-left</v-icon>
                  </v-btn>
                  <span class="caption my-auto">{{pagination}}</span>
                  <v-btn
                    icon
                    small
                    :disabled="pdf.currentPage == pdf.pageCount"
                    @click="pdf.setPage = pdf.currentPage + 1"
                  >
                    <v-icon large>mdi-menu-right</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>
    </template>
    <template v-else>
      <v-card
        class="mx-auto"
        max-width="900"
        color="green lighten-5"
      >
        <v-card-title class="headline font-weight-bold blue--text text--darken-4">
          {{info.title}}
        </v-card-title>
        <v-card-text class="text-center display-1 font-weight-light blue--text text--darken-4">
          <template v-if="swDownload">
            <video controls class="black" width="100%" oncontextmenu="return false;" preload="auto"> <!-- width="320" height="240" -->
              <source :src="src" type="video/mp4"/>
              <!--<source :src="'/api/contenido/' + info._id + '/key/' + key" type="video/mp4"/>-->
            </video>
          </template>
        </v-card-text>
      </v-card>
      <!--<chat :messages="$store.state.chats[$route.params.idContenido]"/>-->
    </template>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import Api from '@/mixins/api'
// import Chat from '@/components/Chat.vue'

// const API_URL = '/contenido'

export default {
  components: {
    // Chat,
    pdf
  },

  mixins: [
    Api
  ],

  data: () => ({
    barColor: 'primary',
    pdf: {
      currentPage: 0,
      pageCount: 0,
      setPage: 1,
      loading: true
    },
    key: null
  }),

  computed: {
    info () {
      let contenido
      this.$store.state.cursos.find(
        el => {
          return (contenido = el.contenido.find(
            el => el._id === this.$route.params.idContenido
          ))
        }
      )
      return contenido
    },
    pagination () {
      return 'Pág. ' + this.pdf.currentPage + ' de ' + this.pdf.pageCount
    },
    swDownload () {
      return !!this.key || !this.info.keyRequired
    },
    src () {
      const src = '/api/contenido/' + this.$route.params.idContenido
      return src + (this.key ? '/key/' + this.key : '')
    }
  },

  created () {
    if (this.info.keyRequired) {
      this.$store.dispatch('requestKey', this.info._id)
        .then((key) => {
          this.key = key
        })
    }
  },

  methods: {
    swipe (dir) {
      switch (dir) {
        case 'Left':
          this.pdf.setPage = this.pdf.currentPage - 1
          break
        case 'Right':
          this.pdf.setPage = this.pdf.currentPage + 1
          break
        default:
      }
    }
  }
}
</script>
