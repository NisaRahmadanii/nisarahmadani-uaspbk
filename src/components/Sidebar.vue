<template>
  <aside class="sidebar">
    <div class="logo">
      <h2>TaskDash</h2>
    </div>
    <nav class="nav">
      <router-link to="/" class="nav-item">
        <span class="icon">📊</span>
        <span class="text">Dashboard</span>
      </router-link>
      <router-link to="/tasks" class="nav-item">
        <span class="icon">✅</span>
        <span class="text">Tasks</span>
      </router-link>
      <router-link to="/calendar" class="nav-item">
        <span class="icon">📅</span>
        <span class="text">Calendar</span>
      </router-link>
      <router-link to="/statistics" class="nav-item">
        <span class="icon">📈</span>
        <span class="text">Statistics</span>
      </router-link>
      <router-link to="/settings" class="nav-item">
        <span class="icon">⚙️</span>
        <span class="text">Settings</span>
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
const authStore = useAuthStore()
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: var(--sidebar-bg);
  color: var(--text-light);
  padding: 1.5rem 1rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.logo {
  padding: 0 1rem 2rem;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 1.5rem;
}

.logo h2 {
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
}

.nav {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: var(--text-light);
  text-decoration: none;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background-color: var(--primary-hover);
}

.nav-item.router-link-exact-active {
  background-color: var(--primary);
  color: white;
}

.icon {
  margin-right: 0.75rem;
  font-size: 1.1rem;
}

.text {
  font-size: 0.95rem;
  font-weight: 500;
}
</style>