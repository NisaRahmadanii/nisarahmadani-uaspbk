<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <div class="form-group">
      <label for="username">Username</label>
      <input
        v-model="form.username"
        type="text"
        id="username"
        required
        placeholder="Enter your username"
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="form.password"
        type="password"
        id="password"
        required
        placeholder="Enter your password"
      />
    </div>
    <button type="submit" class="login-button">Login</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['submit'])

const form = reactive({
  username: '',
  password: ''
})

const handleSubmit = () => {
  emit('submit', {
    username: form.username,
    password: form.password
  })
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;
}

input {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-light);
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: var(--primary);
}

.login-button {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.login-button:hover {
  background-color: var(--primary-hover);
}
</style>