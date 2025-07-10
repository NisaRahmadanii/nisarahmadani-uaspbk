import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const router = useRouter()

  const login = async (credentials) => {
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          username: credentials.username,
          password: credentials.password
        }
      })
      
      if (response.data.length > 0) {
        user.value = response.data[0]
        isAuthenticated.value = true
        router.push('/')
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
    router.push('/login')
  }

  return { user, isAuthenticated, login, logout }
})