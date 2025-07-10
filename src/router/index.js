import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import MainLayout from '../layouts/MainLayout.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue')
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('../views/Tasks.vue')
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('../components/Calendar.vue')
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: () => import('../views/Statistics.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('../views/Settings.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

  router.beforeEach(async (to, from, next) => {
    const { useAuthStore } = await import('../stores/auth')
    const authStore = useAuthStore()
    
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  })

export default router