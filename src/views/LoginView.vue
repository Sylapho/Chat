<script setup>
    import { supabase } from '@/supabase'
    import { useRouter} from 'vue-router'
    import {ref} from 'vue'
    const email = ref('')
    const password = ref('')
    const {push: routerPush} = useRouter()

    const onSubmit = async () =>{
        if(!email.value || !password.value) return;
        const {data, error} = await supabase.auth.signInWithPassword({
            email:email.value,
            password: password.value
        })
        if(error) {
            alert(error.message)
        }else{
            routerPush({name: 'chat'})
        }
        
        return data;
    }
</script>

<template>
    <form class="flex flex-col gap-2 p-4 mx-auto max-w-96" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" class="p-2 bg-slate-500" required/>
      </div>
      <div class="flex flex-col">
        <label for="password">Mot de passe</label>
        <input type="password" id="password" v-model="password" class="p-2 bg-slate-500" required/>
      </div>
      <button type="submit" class="p-2 mt-4 bg-blue-500 rounded-md">Se connecter un compte</button>
    </form>
  </template>