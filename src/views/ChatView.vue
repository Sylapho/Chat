<script setup>
    import { ref } from 'vue';
    import ChatMessage from '@/components/ChatMessage.vue';

    const messageText = ref('');
    const messageList = ref([]);

    const addMessage = () => {
        // Ajouter message liste
        messageList.value.push({
            text: messageText.value,
            date: new Date(),
            user:{
                username: 'SIUU',
                avatarUrl: 'https://i.pinimg.com/474x/43/a1/63/43a163901658ae40f37279c49cdcdf4d.jpg'
            }
        });
        // Vider le contenu du textarea
        messageText.value = '';
    }

</script>

<template>

    <div v-for="(message, index) in messageList" :key="index" class="p-4">
        <ChatMessage :message="message"></ChatMessage>
    </div>

    <div class="flex align-center p-4">
        <textarea v-model="messageText" name="message" id="message" rows="1" class="text-black rounded-md"></textarea>
        <button class="p-2 bg-orange-600 rounded-md ml-3" @click="addMessage">Envoyer</button>
    </div>
</template>