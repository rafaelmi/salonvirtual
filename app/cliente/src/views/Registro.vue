<template>
  <v-row
    justify="center"
  >
  <v-col cols="6">
    <v-snackbar v-model="alert.sw" :color="alert.color" top>
      <v-icon dark>mdi-check-circle</v-icon>
      <span class="title pl-1" :top="true" v-text="alert.msg"/>
      <v-spacer/>
    </v-snackbar>
    <v-card
      class="mx-auto"
      max-width="500"
    >
      <v-card-title>
        <span class="headline">{{ title }}</span>
        <v-spacer/>
        <v-btn
          icon
          x-large
          @click="close"
        >
        <v-icon>mdi-close</v-icon>
      </v-btn>
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-list>
            <v-list-item v-if="swEditButton">
                <v-switch
                  v-model="swModificar"
                  label="Modificar"
                />
            </v-list-item>
            <fieldset :disabled="swFormDisabled" style="border:0">
              <template v-for="(field, i) in cFields">
                <v-list-item v-if="!field.hidden"
                  cols="12"
                  :key="i"
                >
                  <v-list-item-title>
                    <v-menu v-if="field.type === 'fecha'"
                      v-model="menu"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedItem[field.value]"
                          :label="field.text"
                          :prepend-icon="field.icon"
                          :rules="field.rules"
                          :disabled="field.disabled"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="editedItem[field.value]"
                        @input="menu = false"
                      >
                      </v-date-picker>
                    </v-menu>
                    <v-select v-else-if="field.type === 'select'"
                      :items="field.options"
                      :label="field.text"
                      :prepend-icon="field.icon"
                      :rules="field.rules"
                      :readonly="swFormDisabled"
                      :disabled="field.disabled"
                      v-model="editedItem[field.value]"
                    />
                    <v-text-field v-else
                      :label="field.text"
                      :type="field.type"
                      :prepend-icon="field.icon"
                      :rules="field.rules"
                      :messages="field.messages"
                      :disabled="field.disabled"
                      v-model="editedItem[field.value]"
                    />
                  </v-list-item-title>
                </v-list-item>
              </template>
            </fieldset>
          </v-list>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <cmpConfirm v-if="swRemoveButton"
          title="¿Desea eliminar este registro?"
          @confirmado="remove"
        >
          <template #activator="{ on }">
            <v-btn color="error" icon x-large v-on="on">
              <v-icon>
                mdi-delete-circle
              </v-icon>
            </v-btn>
          </template>
        </cmpConfirm>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Cerrar</v-btn>
        <v-btn
          color="blue darken-1"
          text @click="save"
          :disabled="swFormDisabled"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
  </v-row>
</template>

<script>
import mixApi from '@/mixins/api'
import mixUtils from '@/mixins/utils'

export default {
  components: {
  },

  mixins: [
    mixApi,
    mixUtils
  ],

  props: {
    value: Boolean,
    swEditButton: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: true
    },
    swCreateButton: {
      type: Boolean,
      default: true
    },
    swRemoveButton: {
      type: Boolean,
      default: false
    },
    api: Object
  },

  data: () => ({
    fields: [
      { value: '_id', text: 'Usuario', type: 'username', required: true, editable: false },
      { value: 'password', text: 'Password', type: 'password', required: true, editable: false },
      { value: 'password2', text: 'Repetir Password', type: 'password', required: true, editable: false },
      { value: 'nombre', text: 'Nombre', type: 'nombre', required: true, editable: false },
      {
        value: 'profesion',
        text: 'Profesión',
        type: 'select',
        // icon: 'mdi-doctor',
        icon: 'mdi-stethoscope',
        options: ['LICENCIADO(A)', 'MÉDICO(A)', 'OTRO'],
        required: true
      },
      { value: 'telefono', text: 'Teléfono', type: 'telefono' },
      { value: 'pais', text: 'País', type: 'pais', required: true }
    ],
    title: 'Registrarse',
    editedItem: {
      pais: 'Paraguay'
    },
    datePicker: new Date().toISOString().substr(0, 10),
    valid: false,
    alert: {
      sw: false,
      msg: '',
      color: ''
    },
    menu: false,
    swModificar: false,
    isSave: false
  }),

  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
        if (val) { this.$refs.form.reset() }
      }
    },

    swFormDisabled () {
      return !this.editable || !(!this.swEditButton || this.swModificar)
    },

    cFields () {
      const extras = {
        text: { icon: 'mdi-text-subject', type: 'text' },
        number: { icon: 'mdi-text-short', type: 'number' },
        id: { icon: 'mdi-file-document-edit', type: 'number' },
        username: { icon: 'mdi-account', type: 'text' },
        password: { icon: 'mdi-lock-question', type: 'password' },
        nombre: { icon: 'mdi-card-text', type: 'text' },
        cedula: { icon: 'mdi-card-account-details', type: 'number' },
        direccion: { icon: 'mdi-map-marker', type: 'text' },
        telefono: { icon: 'mdi-phone', type: 'text' },
        ciudad: { icon: 'mdi-home-city', type: 'text' },
        departamento: { icon: 'mdi-city-variant', type: 'text' },
        pais: { icon: 'mdi-flag', type: 'text' },
        fecha: { icon: 'mdi-calendar', type: 'date' },
        dinero: { icon: 'mdi-cash-usd-outline', type: 'number' },
        factura: { icon: 'mdi-receipt', type: 'number' },
        select: { icon: 'mdi-format-list-checks', type: 'text' }
      }
      return this.fields.map(item => {
        const extra = extras[item.type]
        item.icon = item.icon || extra.icon
        item.rules = []
        if (item.required) {
          item.rules.push(val => !!val || 'Este campo es obligatorio')
        }

        switch (item.type) {
          case 'username':
            item.rules.push(val => !/\W/.test(val) || 'Ingrese sólo letras y números')
            item.rules.push(val => /^\D/.test(val) || 'No puede comenzar con número')
            item.rules.push(val => val.length <= 8 || 'Máximo 8 caracteres')
            item.rules.push(val => !this.isSave || val.length >= 4 || 'Mínimo 4 caracteres')
            break
          case 'nombre':
            item.rules.push(val => val.length <= 30 || 'Máximo 30 caracteres')
            item.rules.push(val => !this.isSave || val.length >= 5 || 'Mínimo 5 caracteres')
            break
          case 'cedula': {
            const msg = this.toMilSeparator(this.editedItem[item.value])
            item.messages = Number.isNaN(msg) ? [] : item.messages = msg
            break
          }
          case 'factura':
            item.messages = this.toFacturaId(this.editedItem[item.value])
            break
          case 'dinero':
            item.messages = this.toMoney(this.editedItem[item.value])
            break
          default:
        }

        switch (extra.type) {
          case 'number':
            item.rules.push(val => !/\D/.test(val) || 'Ingrese sólo números')
            break
          case 'password':
            item.rules.push(val => val.length <= 15 || 'Máximo 15 caracteres')
            item.rules.push(val => !this.isSave || val.length >= 6 || 'Mínimo 6 caracteres')
            break
          default:
        }

        switch (item.value) {
          case 'password2':
            item.rules.push(val =>
              !this.isSave ||
              val === this.editedItem.password ||
              'Passwords no coinciden'
            )
            break
        }

        // v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        return item
      })
    }
  },

  methods: {
    close () {
      this.dialog = false
    },

    send (opts) {
      this.apiCommand(Object.assign(
        {},
        opts ? opts.api || this.api : this.api,
        { args: this.editedItem }
      ))
        .then((result) => {
          if (result.result === 200) {
            this.swModificar = false
            if (this.api.command === 'create') {
              this.$refs.form.reset()
            }
            Object.assign(this.alert, {
              msg: 'Operación exitosa.',
              sw: true,
              color: 'success'
            })
            this.$emit('success')
            if (opts.close) { this.dialog = false }
            /* if (this.api.command === 'nuevo') {
              this.editedItem = {}
            } */
          } else {
            Object.assign(this.alert, {
              msg: 'Operación rechazada.',
              sw: true,
              color: 'error'
            })
          }
        })
    },

    save () {
      this.isSave = true
      if (this.$refs.form.validate()) {
        this.send()
      }
    },

    remove () {
      this.send({
        api: Object.assign({}, this.api, { command: 'remove' }),
        close: true
      })
    }
  }
}
</script>
