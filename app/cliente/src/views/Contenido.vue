<template>
  <div>
    <!--<v-toolbar color="primary" class="title" dark fixed>
      <span>{{info.title}}</span>
      <v-spacer/>
    </v-toolbar>-->
    <template v-if="info.ext == 'pdf'">
      <pdf :src="'/api/contenido/' + $route.params.id"
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
      <v-card-text class="text-center">
        <video controls class="black" width="280"> <!-- width="320" height="240" -->
          <source :src="'/api/contenido/' + $route.params.id" type="video/mp4"/>
        </video>
      </v-card-text>
      <chat/>
    </template>
  </div>
</template>

<script>
import pdf from 'vue-pdf'
import Api from '@/mixins/api'
import Chat from '@/components/Chat.vue'

// const API_URL = '/contenido'

export default {
  components: {
    Chat,
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
    }
  }),

  computed: {
    info () {
      let contenido
      this.$store.state.cursos.find(
        el => {
          return (contenido = el.contenido.find(
            el => el._id === this.$route.params.id
          ))
        }
      )
      return contenido
    },
    pagination () {
      return 'Pág. ' + this.pdf.currentPage + ' de ' + this.pdf.pageCount
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
