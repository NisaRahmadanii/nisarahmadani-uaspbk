<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard Overview</h1>
    <DashboardStats />
    <div class="recent-tasks">
      <h2>Recent Tasks</h2>
      <TaskList :tasks="recentTasks" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTaskStore } from '../stores/tasks'
import DashboardStats from '../components/DashboardStats.vue'
import TaskList from '../components/TaskList.vue'

const taskStore = useTaskStore()
taskStore.fetchTasks()

const recentTasks = computed(() => {
  return [...taskStore.tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
})
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.dashboard-title {
  color: var(--text-light);
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.recent-tasks {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.recent-tasks h2 {
  color: var(--text-light);
  font-size: 1.25rem;
  margin-bottom: 1rem;
}
</style>