<template>
  <div class="tasks-view">
    <div class="tasks-header">
      <h1>Task Management</h1>
      <button @click="showTaskForm = true" class="add-task-btn">
        + Add New Task
      </button>
    </div>

    <TaskForm 
    v-if="showTaskForm" 
    :editing-task="editingTask"
    @close="showTaskForm = false" 
    @save="handleSaveTask" 
    />

    <div class="tasks-content">
      <div class="tasks-filters">
        <select v-model="statusFilter" class="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <select v-model="priorityFilter" class="filter-select">
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div v-if="taskStore.isLoading">Loading tasks...</div>
      <div v-else-if="taskStore.error" class="error-message">
        Error: {{ taskStore.error }}
      </div>
      <TaskList 
        v-else 
        :tasks="filteredTasks" 
        @edit="handleEditTask" 
        @delete="handleDeleteTask" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import TaskForm from '../components/TaskForm.vue'
import TaskList from '../components/TaskList.vue'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()
const showTaskForm = ref(false)
const statusFilter = ref('all')
const priorityFilter = ref('all')
const editingTask = ref(null)

onMounted(() => {
  taskStore.fetchTasks()
})

const filteredTasks = computed(() => {
  return taskStore.tasks.filter(task => {
    const statusMatch = statusFilter.value === 'all' || task.status === statusFilter.value
    const priorityMatch = priorityFilter.value === 'all' || task.priority === priorityFilter.value
    return statusMatch && priorityMatch
  })
})

const handleSaveTask = async (taskData) => {
  if (editingTask.value) {
    await taskStore.updateTask(editingTask.value.id, taskData)
    editingTask.value = null
  } else {
    await taskStore.addTask(taskData)
  }
  showTaskForm.value = false
}

const handleEditTask = (task) => {
  editingTask.value = task
  showTaskForm.value = true
}

const handleDeleteTask = async (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await taskStore.deleteTask(taskId)
  }
}
</script>

<style scoped>
.tasks-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.tasks-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tasks-header h1 {
  color: var(--text-light);
  font-size: 1.75rem;
  margin: 0;
}

.add-task-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.add-task-btn:hover {
  background-color: var(--primary-hover);
}

.tasks-content {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.tasks-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-light);
  cursor: pointer;
}

.error-message {
  color: #ff6b6b;
  padding: 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
}
</style>