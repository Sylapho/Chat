<script setup>
    import { onMounted, ref } from 'vue'
    import ChatMessage from '@/components/ChatMessage.vue'
    import AppNavbar from '@/components/AppNavbar.vue'
    import { useUserStore } from '@/stores/user'
    import { storeToRefs } from 'pinia'
    import {insertMessage, fetchMessages} from '@/api/messages'

    const messageText = ref('')
    const messageList = ref([])
    const textarea = ref(null)
    const { user } = storeToRefs(useUserStore())
    onMounted( async () => {
        messageList.value = await fetchMessages()
    })

    const addMessage = async () => {
        await insertMessage(messageText.value, user.value.id)
        // Vider le contenu du textarea
        messageText.value = ''
        textarea.value.focus()
    }

    const deleteMessage= (id) => {
        messageList.value = messageList.value.filter( (message) => message.id != id)
    }

</script>

<template>
    <AppNavbar></AppNavbar>
    <div v-for="(message, index) in messageList" :key="index" class="p-4">
        <ChatMessage @delete="deleteMessage" :message="message"></ChatMessage>
    </div>

    <div class="flex align-center p-4">
        <textarea ref="textarea" @keyup.enter.exact ="addMessage" v-model="messageText" name="message" id="message" rows="1" class="text-black rounded-md"></textarea>
        <button class="p-2 bg-orange-600 rounded-md ml-3 hover:bg-orange-400" @click="addMessage">Envoyer</button>
    </div>
</template>