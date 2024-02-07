<script setup>
    import { computed } from 'vue';
    import{ TrashIcon} from '@heroicons/vue/24/solid';    
    const props = defineProps({
        message:{
            type: Object,
            required: true
        }
    });

    const emit = defineEmits(['delete'])

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
        <img :src="message.user.avatarUrl" class="rounded-full h-12 w-12" alt="avatar">
        <p class="text-xl ">{{ message.user.username }} :
            {{ message.text }} <span class="text-xs text-opacity-40">{{ formattedDate }}</span>
        </p>
        <button @click="emit('delete', message.id)" class="rounded-md ml-3 p-2 hover:bg-red-600" >
           <TrashIcon class="w-8 h-8"/>   
        </button>
    </div>
</template>