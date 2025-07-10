<template>
  <header class="navbar">
    <div class="navbar-left">
      <button class="menu-toggle">
        <span>☰</span>
      </button>
      <h1 class="page-title">{{ currentRouteName }}</h1>
    </div>
    <div class="navbar-right">
      <div class="user-profile">
        <span class="username">{{ authStore.user?.name }}</span>
        <button @click="authStore.logout" class="logout-btn">Logout</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const authStore = useAuthStore()

const currentRouteName = computed(() => {
  return route.name ? route.name.toString().charAt(0).toUpperCase() + route.name.toString().slice(1) : 'Dashboard'
})
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: var(--navbar-bg);
  border-bottom: 1px solid var(--border-color);
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu-toggle {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
}

.page-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-light);
  margin: 0;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.username {
  color: var(--text-light);
  font-weight: 500;
}

.logout-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: var(--primary-hover);
}
</style>