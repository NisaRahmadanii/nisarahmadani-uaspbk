import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const isLoading = ref(false)
  const error = ref(null)

  const fetchTasks = async () => {
    isLoading.value = true
    try {
      const response = await axios.get('http://localhost:3001/tasks')
      tasks.value = response.data
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/tasks', {
        ...task,
        createdAt: new Date().toISOString()
      })
      tasks.value.push(response.data)
    } catch (err) {
      error.value = err.message
    }
  }

  const updateTask = async (id, updates) => {
    try {
      const response = await axios.patch(`http://localhost:3001/tasks/${id}`, updates)
      const index = tasks.value.findIndex(task => task.id === id)
      if (index !== -1) {
        tasks.value[index] = response.data
      }
    } catch (err) {
      error.value = err.message
    }
  }

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`)
      tasks.value = tasks.value.filter(task => task.id !== id)
    } catch (err) {
      error.value = err.message
    }
  }

  return {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask
  }
})