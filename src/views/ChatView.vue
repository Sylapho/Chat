<script setup>
    import { onMounted, ref } from 'vue'
    import ChatMessage from '@/components/ChatMessage.vue'
    import AppNavbar from '@/components/AppNavbar.vue'
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import {insertMessage, fetchMessages, subscribeToMessage, messageList, deleteMessage} from '@/api/messages'

    const messageText = ref('')
    const messagesContainer = ref(null)

    subscribeToMessage((messages) => {
        messageList.value = messages
    })

    const textarea = ref(null)
    const { user } = storeToRefs(useUserStore())

    onMounted( async () => {
       await fetchMessages()
       scrollToBottom()
    })

    const addMessage = async () => {
        await insertMessage(messageText.value, user.value.id)
        // Vider le contenu du textarea
        messageText.value = ''
        textarea.value.focus()
    }

    const scrollToBottom = () => {
        messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }

</script>

<template>
    <div class="flex flex-col h-full overflow-hidden">
        <AppNavbar></AppNavbar>
        <div class="overflow-auto grow" ref="messagesContainer">
            <div v-for="(message, index) in messageList" :key="index" class="p-4">
                <ChatMessage @delete="deleteMessage" :message="message"></ChatMessage>
            </div>
        </div>
        <div class="flex align-center p-4 border-t border-t-slate-700">
            <textarea ref="textarea" @keyup.enter.exact ="addMessage" v-model="messageText" name="message" id="message" rows="1" class="text-black rounded-md"></textarea>
            <button class="p-2 bg-orange-600 rounded-md ml-3 hover:bg-orange-400" @click="addMessage">Envoyer</button>
        </div>
    </div>
</template>