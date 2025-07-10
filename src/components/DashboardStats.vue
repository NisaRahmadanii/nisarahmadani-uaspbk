<template>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">{{ totalTasks }}</div>
      <div class="stat-label">Total Tasks</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ completedTasks }}</div>
      <div class="stat-label">Completed</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ inProgressTasks }}</div>
      <div class="stat-label">In Progress</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">{{ overdueTasks }}</div>
      <div class="stat-label">Overdue</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()

const totalTasks = computed(() => taskStore.tasks.length)
const completedTasks = computed(() => taskStore.tasks.filter(task => task.status === 'completed').length)
const inProgressTasks = computed(() => taskStore.tasks.filter(task => task.status === 'in-progress').length)
const overdueTasks = computed(() => {
  const today = new Date()
  return taskStore.tasks.filter(task => {
    return new Date(task.dueDate) < today && task.status !== 'completed'
  }).length
})
</script>

<style scoped>
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--text-light);
  opacity: 0.8;
}
</style>