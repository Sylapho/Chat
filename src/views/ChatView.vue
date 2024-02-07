<script setup>
    import { ref } from 'vue';
    import ChatMessage from '@/components/ChatMessage.vue';

    const messageText = ref('');
    const messageList = ref([]);
    const textarea = ref(null);

    const addMessage = () => {
        // Ajouter message liste
        messageList.value.push({
            id: Math.random().toString(32).slice(2),
            text: messageText.value,
            date: new Date(),
            user:{
                username: 'Arthur',
                avatarUrl: 'https://i.pinimg.com/474x/43/a1/63/43a163901658ae40f37279c49cdcdf4d.jpg'
            }
        });
        // Vider le contenu du textarea
        messageText.value = '';
        textarea.value.focus();
    }

    const deleteMessage= (id) => {
        messageList.value = messageList.value.filter( (message) => message.id != id)
    }

</script>

<template>

    <div v-for="(message, index) in messageList" :key="index" class="p-4">
        <ChatMessage @delete="deleteMessage" :message="message"></ChatMessage>
    </div>

    <div class="flex align-center p-4">
        <textarea ref="textarea" @keyup.enter.exact ="addMessage" v-model="messageText" name="message" id="message" rows="1" class="text-black rounded-md"></textarea>
        <button class="p-2 bg-orange-600 rounded-md ml-3 hover:bg-orange-400" @click="addMessage">Envoyer</button>
    </div>
</template>