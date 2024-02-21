<script setup>
import {useUserStore} from '@/stores/user'
import {storeToRefs} from 'pinia'
import {supabase} from '@/supabase'
import {useRouter} from 'vue-router'
import { ref } from 'vue'

const { user } = storeToRefs(useUserStore())
const router = useRouter()
const loading = ref(false)

const logout = async () => {
    loading.value = true
    await supabase.auth.signOut()
    router.push({ name :'login' })
}

</script>

<template>
    <header class="flex p-3 items-align ">
        <div v-if= "user">
            Username : {{ user.username }}
        </div>
        <button :loading="loading" class=" bg-orange-600 ml-auto p-2 rounded-lg  hover:bg-orange-400" @click="logout">
            <span v-if="loading">...</span>
            <span v-else>Se déconnecter</span>
        </button>
    </header>
</template>

