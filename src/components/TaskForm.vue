<template>
  <div class="task-form-modal">
    <div class="task-form-overlay" @click.self="$emit('close')"></div>
    <div class="task-form-container">
      <div class="task-form-header">
        <h2>{{ editingTask ? 'Edit Task' : 'Add New Task' }}</h2>
        <button @click="$emit('close')" class="close-btn">×</button>
      </div>
      <form @submit.prevent="handleSubmit" class="task-form">
        <div class="form-group">
          <label for="title">Title</label>
          <input
            v-model="form.title"
            type="text"
            id="title"
            required
            placeholder="Task title"
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            v-model="form.description"
            id="description"
            rows="3"
            placeholder="Task description"
          ></textarea>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="dueDate">Due Date</label>
            <input
              v-model="form.dueDate"
              type="date"
              id="dueDate"
              required
            />
          </div>
          <div class="form-group">
            <label for="priority">Priority</label>
            <select v-model="form.priority" id="priority" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select v-model="form.status" id="status" required>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div class="form-actions">
          <button type="button" @click="$emit('close')" class="cancel-btn">
            Cancel
          </button>
          <button type="submit" class="submit-btn">
            {{ editingTask ? 'Update Task' : 'Add Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  editingTask: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'save'])

const form = reactive({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium',
  status: 'pending'
})

// Define resetForm function first
const resetForm = () => {
  form.title = ''
  form.description = ''
  form.dueDate = ''
  form.priority = 'medium'
  form.status = 'pending'
}

// Now watch can safely call resetForm
watch(() => props.editingTask, (task) => {
  if (task) {
    form.title = task.title
    form.description = task.description
    form.dueDate = task.dueDate
    form.priority = task.priority
    form.status = task.status
  } else {
    resetForm()
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('save', { ...form })
  resetForm()
}
</script>

<style scoped>
.task-form-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.task-form-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.task-form-container {
  position: relative;
  background-color: var(--card-bg);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.task-form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid var(--border-color);
}

.task-form-header h2 {
  color: var(--text-light);
  margin: 0;
  font-size: 1.25rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--text-light);
  cursor: pointer;
  padding: 0.25rem;
}

.task-form {
  padding: 1.5rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-row {
  display: flex;
  gap: 1rem;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
  font-weight: 500;
}

input,
textarea,
select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--input-bg);
  color: var(--text-light);
  font-size: 0.95rem;
}

textarea {
  resize: vertical;
  min-height: 80px;
}

select {
  cursor: pointer;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.cancel-btn {
  background-color: transparent;
  color: var(--text-light);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.cancel-btn:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.submit-btn {
  background-color: var(--primary);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: var(--primary-hover);
}
</style>