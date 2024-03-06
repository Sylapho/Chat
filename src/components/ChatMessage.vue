<script setup>
    import { computed } from 'vue';
    import{ TrashIcon} from '@heroicons/vue/24/solid';    
    import { useUserStore } from '@/stores/user';
    import { storeToRefs } from 'pinia';

    const { user } = storeToRefs(useUserStore())

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
        const date = new Date(props.message.created_at)
        return formatDate(date);
    });

    const avatarUrl = computed(() => {
    if (!props.message.author.avatar_url)
        return `https://api.dicebear.com/7.x/fun-emoji/svg?seed=${props.message.author.username}`;
    return props.message.author.avatar_url;
});
</script>

<template>
    <div class="flex">
        <img class="bg-slate-600 h-10 w-10 rounded-full mr-2" :src="avatarUrl" />
        <p class="text-xl ">{{ message.author.username }} :
            {{ message.content }} <span class="text-xs text-opacity-40">{{ formattedDate }}</span>
        </p>
        <button v-if="message.author.username === user?.username" @click="emit('delete', message.id)" class="rounded-md ml-3 p-2 hover:bg-red-600" >
           <TrashIcon class="w-8 h-8"/>   
        </button>
    </div>
</template>