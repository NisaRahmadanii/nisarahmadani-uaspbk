<template>
  <div class="calendar-view">
    <h1>Task Calendar</h1>
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="prevMonth" class="nav-btn">←</button>
        <h2>{{ currentMonthName }} {{ currentYear }}</h2>
        <button @click="nextMonth" class="nav-btn">→</button>
      </div>
      <div class="calendar-grid">
        <div class="day-header" v-for="day in dayNames" :key="day">
          {{ day }}
        </div>
        <div 
          v-for="day in calendarDays" 
          :key="day.date" 
          class="calendar-day"
          :class="{ 
            'current-month': day.isCurrentMonth,
            'today': day.isToday
          }"
        >
          <div class="day-number">{{ day.day }}</div>
          <div class="day-tasks">
            <div 
              v-for="task in getTasksForDay(day.date)" 
              :key="task.id" 
              class="task-badge"
              :class="task.priority"
            >
              {{ task.title }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()

const currentDate = ref(new Date())
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

onMounted(() => {
  taskStore.fetchTasks()
})

const currentMonth = computed(() => currentDate.value.getMonth())
const currentYear = computed(() => currentDate.value.getFullYear())
const currentMonthName = computed(() => {
  return currentDate.value.toLocaleString('default', { month: 'long' })
})

const calendarDays = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  
  // Get first day of month and last day of month
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  
  // Get days from previous month to show
  const prevMonthDays = firstDay.getDay()
  
  // Get days from next month to show
  const nextMonthDays = 6 - lastDay.getDay()
  
  // Calculate total days to show (usually 35 or 42)
  const totalDays = prevMonthDays + lastDay.getDate() + nextMonthDays
  
  const days = []
  
  // Previous month days
  for (let i = 1; i <= prevMonthDays; i++) {
    const date = new Date(year, month, -prevMonthDays + i)
    days.push({
      day: date.getDate(),
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false
    })
  }
  
  // Current month days
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const date = new Date(year, month, i)
    days.push({
      day: date.getDate(),
      date: date.toISOString().split('T')[0],
      isCurrentMonth: true,
      isToday: isToday(date)
    })
  }
  
  // Next month days
  for (let i = 1; i <= nextMonthDays; i++) {
    const date = new Date(year, month + 1, i)
    days.push({
      day: date.getDate(),
      date: date.toISOString().split('T')[0],
      isCurrentMonth: false
    })
  }
  
  return days
})

const isToday = (date) => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}

const prevMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value - 1, 1)
}

const nextMonth = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value + 1, 1)
}

const getTasksForDay = (date) => {
  return taskStore.tasks.filter(task => task.dueDate === date)
}
</script>

<style scoped>
.calendar-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.calendar-view h1 {
  color: var(--text-light);
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.calendar-container {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.calendar-header h2 {
  color: var(--text-light);
  font-size: 1.25rem;
  margin: 0;
}

.nav-btn {
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
}

.day-header {
  text-align: center;
  color: var(--text-light);
  font-weight: 500;
  padding: 0.5rem;
}

.calendar-day {
  min-height: 100px;
  background-color: var(--task-bg);
  border-radius: 8px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.calendar-day.current-month {
  background-color: var(--card-bg);
}

.calendar-day.today {
  border: 2px solid var(--primary);
}

.day-number {
  font-weight: 500;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

.calendar-day:not(.current-month) .day-number {
  opacity: 0.5;
}

.day-tasks {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.task-badge {
  font-size: 0.7rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.task-badge.low {
  background-color: rgba(67, 160, 71, 0.2);
  color: #43a047;
}

.task-badge.medium {
  background-color: rgba(251, 192, 45, 0.2);
  color: #fbc02d;
}

.task-badge.high {
  background-color: rgba(229, 57, 53, 0.2);
  color: #e53935;
}
</style>