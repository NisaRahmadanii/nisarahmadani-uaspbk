<template>
  <div class="task-list">
    <div v-if="tasks.length === 0" class="empty-state">
      No tasks found. Add a new task to get started!
    </div>
    <div v-else class="tasks">
      <div v-for="task in tasks" :key="task.id" class="task-item">
        <div class="task-main">
          <div class="task-checkbox">
            <input 
              type="checkbox" 
              :checked="task.status === 'completed'" 
              @change="toggleTaskStatus(task)"
            />
          </div>
          <div class="task-info">
            <h3 class="task-title" :class="{ completed: task.status === 'completed' }">
              {{ task.title }}
            </h3>
            <p class="task-description">{{ task.description }}</p>
            <div class="task-meta">
              <span class="task-due-date">Due: {{ formatDate(task.dueDate) }}</span>
              <span class="task-priority" :class="task.priority">
                {{ task.priority }}
              </span>
            </div>
          </div>
        </div>
        <div class="task-actions">
          <button @click="$emit('edit', task)" class="edit-btn">Edit</button>
          <button @click="$emit('delete', task.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()

defineProps({
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const toggleTaskStatus = async (task) => {
  const newStatus = task.status === 'completed' ? 'pending' : 'completed'
  await taskStore.updateTask(task.id, { status: newStatus })
}
</script>

<style scoped>
.task-list {
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  opacity: 0.7;
}

.tasks {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  background-color: var(--task-bg);
  border-radius: 10px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.2s;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.task-main {
  display: flex;
  gap: 1rem;
}

.task-checkbox {
  display: flex;
  align-items: flex-start;
  padding-top: 0.25rem;
}

.task-checkbox input {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-info {
  flex: 1;
}

.task-title {
  margin: 0 0 0.5rem;
  color: var(--text-light);
  font-size: 1.1rem;
}

.task-title.completed {
  text-decoration: line-through;
  opacity: 0.7;
}

.task-description {
  margin: 0 0 0.75rem;
  color: var(--text-light);
  opacity: 0.8;
  font-size: 0.9rem;
  line-height: 1.5;
}

.task-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  font-size: 0.85rem;
}

.task-due-date {
  color: var(--text-light);
  opacity: 0.7;
}

.task-priority {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: capitalize;
}

.task-priority.low {
  background-color: rgba(67, 160, 71, 0.2);
  color: #43a047;
}

.task-priority.medium {
  background-color: rgba(251, 192, 45, 0.2);
  color: #fbc02d;
}

.task-priority.high {
  background-color: rgba(229, 57, 53, 0.2);
  color: #e53935;
}

.task-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-btn {
  background-color: rgba(103, 58, 183, 0.1);
  color: var(--primary);
  border: 1px solid var(--primary);
}

.edit-btn:hover {
  background-color: rgba(103, 58, 183, 0.2);
}

.delete-btn {
  background-color: rgba(229, 57, 53, 0.1);
  color: #e53935;
  border: 1px solid #e53935;
}

.delete-btn:hover {
  background-color: rgba(229, 57, 53, 0.2);
}
</style>