<template>
  <div class="app-container">
    <Sidebar />
    <div class="main-content">
      <Navbar />
      <div class="content-wrapper">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import Sidebar from '../components/Sidebar.vue'
import Navbar from '../components/Navbar.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
  background-color: var(--bg-dark);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}
</style>