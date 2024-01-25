<script setup>
    import { computed } from 'vue';
    
    const props = defineProps({
        message:{
            type: Object,
            required: true
        }
    });

    const formatDate = (date)=>{
        let formattedDay = date.toLocaleDateString();
        let formattedTime = date.toLocaleTimeString('default', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDay} à ${formattedTime}`
    }

    const formattedDate = computed(()=>{
        const date = props.message.date
        return formatDate(date);
    });
</script>

<template>
    <div class="flex">
        <img :src="message.user.avatarUrl" class="rounded-full h-14 w-14" alt="avatar">
        <p>{{ message.user.username }} :
            {{ message.text }} <span class="text-xs text-opacity-40">{{ formattedDate }}</span></p>

    </div>
</template>