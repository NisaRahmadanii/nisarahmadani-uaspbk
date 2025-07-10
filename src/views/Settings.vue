<template>
  <div class="settings-view">
    <h1>Settings</h1>
    <div class="settings-card">
      <h2>Profile Settings</h2>
      <form @submit.prevent="handleSubmit" class="settings-form">
        <div class="form-group">
          <label for="name">Name</label>
          <input
            v-model="form.name"
            type="text"
            id="name"
            required
            placeholder="Your name"
          />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="form.email"
            type="email"
            id="email"
            required
            placeholder="Your email"
          />
        </div>
        <div class="form-group">
          <label for="theme">Theme</label>
          <select v-model="form.theme" id="theme">
            <option value="dark-purple">Dark Purple</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button type="submit" class="save-btn">Save Changes</button>
      </form>
    </div>
    <div class="settings-card">
      <h2>Change Password</h2>
      <form @submit.prevent="handlePasswordChange" class="settings-form">
        <div class="form-group">
          <label for="currentPassword">Current Password</label>
          <input
            v-model="passwordForm.currentPassword"
            type="password"
            id="currentPassword"
            required
            placeholder="Current password"
          />
        </div>
        <div class="form-group">
          <label for="newPassword">New Password</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            id="newPassword"
            required
            placeholder="New password"
          />
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password</label>
          <input
            v-model="passwordForm.confirmPassword"
            type="password"
            id="confirmPassword"
            required
            placeholder="Confirm new password"
          />
        </div>
        <button type="submit" class="save-btn">Change Password</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const form = reactive({
  name: authStore.user?.name || '',
  email: authStore.user?.email || '',
  theme: 'dark-purple'
})

const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const handleSubmit = () => {
  // In a real app, you would update the user profile here
  alert('Profile updated successfully!')
}

const handlePasswordChange = () => {
  if (passwordForm.newPassword !== passwordForm.confirmPassword) {
    alert('New passwords do not match!')
    return
  }
  // In a real app, you would update the password here
  alert('Password changed successfully!')
  passwordForm.currentPassword = ''
  passwordForm.newPassword = ''
  passwordForm.confirmPassword = ''
}
</script>

<style scoped>
.settings-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.settings-view h1 {
  color: var(--text-light);
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.settings-card {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.settings-card h2 {
  color: var(--text-light);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.settings-form {
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

input,
select {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-light);
  font-size: 0.95rem;
}

select {
  cursor: pointer;
}

.save-btn {
  align-self: flex-start;
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.save-btn:hover {
  background-color: var(--primary-hover);
}
</style>