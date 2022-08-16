import { createRouter, createWebHistory } from 'vue-router'
import EconomyView from '../views/EconomyView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: EconomyView
    }
  ]
})

export default router
