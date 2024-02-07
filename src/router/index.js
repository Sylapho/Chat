import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'
import supabase from "@supabase/supabase-js"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/user/:id',
      name: 'chat',
      component: ChatView,
      meta:{
        requiresAuth: true
      }
    },
    {
      path:'/register',
      name:'register',
      component: () => import('@/views/RegisterView.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('@/views/LoginView.vue')
    }
  ]
})



router.beforEach(async(to, from, next) => { 
  const {data} = await supabase.auth.getSession()
  const isLoggedIn =!!data.session 
  if(to.matched.some((record) => record.meta.requiresAuth) && !isLoggedIn){
    next({name: 'login'})
  }else{
    next()
  }
})

export default router
