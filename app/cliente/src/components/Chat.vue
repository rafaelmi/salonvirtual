<template>
  <beautiful-chat
    :participants="participants"
    :titleImageUrl="titleImageUrl"
    :onMessageWasSent="onMessageWasSent"
    :messageList="messageList"
    :newMessagesCount="newMessagesCount"
    :isOpen="isChatOpen"
    :close="closeChat"
    :icons="icons"
    :open="openChat"
    :showEmoji="true"
    :showFile="false"
    :showTypingIndicator="showTypingIndicator"
    :showLauncher="true"
    :showCloseButton="true"
    :colors="colors"
    :alwaysScrollToBottom="alwaysScrollToBottom"
    :messageStyling="messageStyling"
    @onType="handleOnType"
    @edit="editMessage"
    style="z-index: 2"
  >
    <template v-slot:header>
      <span class="title">Chat de Preguntas</span>
    </template>
    <template v-slot:text-message-body="{ message }">
      <span class="font-weight-bold">
        {{message.author}}:
      </span>
      <template v-if="isLink(message)">
        <a :href="message"/>
      </template>
      <template v-else>
        {{message.data.text}}
      </template>
      <small v-if="message.data.meta">
        {{message.data.meta}}
      </small>
    </template>
    <template v-slot:user-avatar="{ message, user }">
      <div style="border-radius:50%; color: pink; line-height:30px; text-align:center;background: tomato; width: 25px !important; height: 25px !important; min-width: 30px;min-height: 30px;margin: 5px; font-weight:bold" v-if="message.type === 'text' && user && user.name">
        <span class="caption font-weight-bold">
          {{user.name.toUpperCase()[0]}}
        </span>
      </div>
    </template>
  </beautiful-chat>
</template>

<script>
import Api from '@/mixins/api'
import CloseIcon from 'vue-beautiful-chat/src/assets/close-icon.png'
import OpenIcon from 'vue-beautiful-chat/src/assets/logo-no-bg.svg'
import FileIcon from 'vue-beautiful-chat/src/assets/file.svg'
import CloseIconSvg from 'vue-beautiful-chat/src/assets/close.svg'
// import { mdiChat } from '@mdi/js'

// const API_URL = '/contenido'

export default {
  components: {
  },

  mixins: [
    Api
  ],

  props: {
    messages: Array
  },

  data: () => ({
    title: '',
    barColor: 'primary',
    icons: {
      open: {
        img: OpenIcon,
        name: 'default'
      },
      close: {
        img: CloseIcon,
        name: 'default'
      },
      file: {
        img: FileIcon,
        name: 'default'
      },
      closeSvg: {
        img: CloseIconSvg,
        name: 'default'
      }
    },
    participants: [
      {
        id: 'profesor',
        name: 'Daniel Reyes',
        imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
      },
      {
        id: 'user2',
        name: 'Support',
        imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
      }
    ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
    // titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
    titleImageUrl: '',
    /* messageList: [
      { type: 'text', author: 'me', data: { text: 'Pregunta!', meta: '23-03-2020 12:43' } },
      { type: 'text', author: 'profesor', data: { text: 'Respuesta', meta: '23-03-2020 12:45' } }
    ], // the list of the messages to show, can be paginated and adjusted dynamically
    */
    newMessagesCount: 0,
    isChatOpen: false, // to determine whether the chat window should be open or closed
    showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
    colors: {
      header: {
        bg: '#4e8cff',
        text: '#ffffff'
      },
      launcher: {
        bg: '#4e8cff'
      },
      messageList: {
        bg: '#ffffff'
      },
      sentMessage: {
        bg: '#C5E1A5', // '#4e8cff',
        text: 'black' // '#ffffff'
      },
      receivedMessage: {
        bg: '#E0E0E0', // '#eaeaea',
        text: 'black' // '#222222'
      },
      userInput: {
        bg: '#f4f7f9',
        text: '#565867'
      }
    }, // specifies the color scheme for the component
    alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
    messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
  }),

  computed: {
    messageList () {
      return this.messages.map(elem => {
        if (elem.author === this.$store.state.user.username) {
          elem.author = 'me'
        }
        return elem
      })
    }
  },

  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        // this.onMessageWasSent({ id: this.$route.params.id, author: this.$store.state.user.username, type: 'text', data: { text } })
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      // this.messageList = [...this.messageList, message]
      Object.assign(message, {
        id: this.$route.params.idCurso,
        author: this.$store.state.user.username
      })
      this.$socket.emit('message', message)
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
    },
    editMessage (message) {
      const m = this.messageList.find(m => m.id === message.id)
      m.isEdited = true
      m.data.text = message.data.text
    },
    isLink (message) {
      return false
    }
  }
}
</script>
