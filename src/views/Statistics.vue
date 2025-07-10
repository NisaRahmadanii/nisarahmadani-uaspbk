<template>
  <div class="statistics-view">
    <h1>Task Statistics</h1>
    
    <div v-if="taskStore.isLoading" class="loading">
      Loading statistics...
    </div>
    
    <div v-else-if="taskStore.error" class="error-message">
      Error loading statistics: {{ taskStore.error }}
    </div>
    
    <div v-else class="stats-container">
      <div class="chart-container">
        <h2>Tasks by Status</h2>
        <div class="chart-content">
          <div v-if="taskStore.tasks.length === 0" class="no-data">
            No tasks available
          </div>
          <div v-else class="pie-chart">
            <svg viewBox="0 0 200 200" class="pie-svg">
              <circle
                v-for="(slice, index) in statusChartData"
                :key="slice.label"
                :cx="100"
                :cy="100"
                :r="80"
                :fill="slice.color"
                stroke="#2d3748"
                stroke-width="2"
                :stroke-dasharray="`${slice.percentage * 2.51} 502`"
                :stroke-dashoffset="slice.offset"
                transform="rotate(-90 100 100)"
                class="pie-slice"
              />
            </svg>
            <div class="chart-legend">
              <div 
                v-for="item in statusChartData" 
                :key="item.label"
                class="legend-item"
              >
                <div 
                  class="legend-color" 
                  :style="{ backgroundColor: item.color }"
                ></div>
                <span>{{ item.label }}: {{ item.count }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chart-container">
        <h2>Tasks by Priority</h2>
        <div class="chart-content">
          <div v-if="taskStore.tasks.length === 0" class="no-data">
            No tasks available
          </div>
          <div v-else class="bar-chart">
            <div class="bar-container">
              <div 
                v-for="item in priorityChartData" 
                :key="item.label"
                class="bar-item"
              >
                <div class="bar-label">{{ item.label }}</div>
                <div class="bar-wrapper">
                  <div 
                    class="bar" 
                    :style="{ 
                      height: `${item.percentage}%`, 
                      backgroundColor: item.color 
                    }"
                  ></div>
                </div>
                <div class="bar-value">{{ item.count }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-if="!taskStore.isLoading && !taskStore.error" class="completion-rate">
      <h2>Completion Rate</h2>
      <div class="progress-container">
        <div 
          class="progress-bar" 
          :style="{ width: completionRate + '%' }"
        ></div>
        <span class="progress-text">{{ Math.round(completionRate) }}%</span>
      </div>
      <div class="stats-summary">
        <div class="stat-item">
          <span class="stat-label">Total Tasks:</span>
          <span class="stat-value">{{ taskStore.tasks.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Completed:</span>
          <span class="stat-value">{{ completedTasks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Pending:</span>
          <span class="stat-value">{{ pendingTasks }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">In Progress:</span>
          <span class="stat-value">{{ inProgressTasks }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/tasks'

const taskStore = useTaskStore()

// Fetch tasks when component mounts
onMounted(() => {
  if (taskStore.tasks.length === 0) {
    taskStore.fetchTasks()
  }
})

const completedTasks = computed(() => 
  taskStore.tasks.filter(task => task.status === 'completed').length
)

const pendingTasks = computed(() => 
  taskStore.tasks.filter(task => task.status === 'pending').length
)

const inProgressTasks = computed(() => 
  taskStore.tasks.filter(task => task.status === 'in-progress').length
)

const completionRate = computed(() => {
  if (taskStore.tasks.length === 0) return 0
  return (completedTasks.value / taskStore.tasks.length) * 100
})

const statusChartData = computed(() => {
  const data = [
    { label: 'Completed', count: completedTasks.value, color: '#10b981' },
    { label: 'In Progress', count: inProgressTasks.value, color: '#f59e0b' },
    { label: 'Pending', count: pendingTasks.value, color: '#ef4444' }
  ]
  
  const total = taskStore.tasks.length
  let cumulativeOffset = 0
  
  return data.map(item => {
    const percentage = total > 0 ? (item.count / total) * 100 : 0
    const offset = cumulativeOffset
    cumulativeOffset += percentage * 2.51
    
    return {
      ...item,
      percentage,
      offset: -offset
    }
  }).filter(item => item.count > 0)
})

const priorityChartData = computed(() => {
  const highCount = taskStore.tasks.filter(task => task.priority === 'high').length
  const mediumCount = taskStore.tasks.filter(task => task.priority === 'medium').length
  const lowCount = taskStore.tasks.filter(task => task.priority === 'low').length
  
  const maxCount = Math.max(highCount, mediumCount, lowCount) || 1
  
  return [
    { 
      label: 'High', 
      count: highCount, 
      percentage: (highCount / maxCount) * 100,
      color: '#ef4444'
    },
    { 
      label: 'Medium', 
      count: mediumCount, 
      percentage: (mediumCount / maxCount) * 100,
      color: '#f59e0b'
    },
    { 
      label: 'Low', 
      count: lowCount, 
      percentage: (lowCount / maxCount) * 100,
      color: '#10b981'
    }
  ]
})
</script>

<style scoped>
.statistics-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.statistics-view h1 {
  color: var(--text-light);
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: var(--text-light);
  font-size: 1.1rem;
}

.error-message {
  color: #ff6b6b;
  padding: 1rem;
  background-color: rgba(255, 107, 107, 0.1);
  border-radius: 8px;
  text-align: center;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.chart-container {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.chart-container h2 {
  color: var(--text-light);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.chart-content {
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.no-data {
  color: var(--text-light);
  opacity: 0.7;
  text-align: center;
}

.pie-chart {
  display: flex;
  align-items: center;
  gap: 2rem;
  width: 100%;
}

.pie-svg {
  width: 200px;
  height: 200px;
}

.pie-slice {
  transition: all 0.3s ease;
}

.chart-legend {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-light);
  font-size: 0.9rem;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
}

.bar-chart {
  width: 100%;
  height: 250px;
}

.bar-container {
  display: flex;
  align-items: end;
  justify-content: space-around;
  height: 100%;
  gap: 1rem;
}

.bar-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  flex: 1;
}

.bar-label {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.bar-wrapper {
  flex: 1;
  width: 40px;
  display: flex;
  align-items: end;
  justify-content: center;
}

.bar {
  width: 100%;
  min-height: 4px;
  border-radius: 4px 4px 0 0;
  transition: height 0.5s ease;
}

.bar-value {
  color: var(--text-light);
  font-size: 0.9rem;
  margin-top: 0.5rem;
  font-weight: 500;
}

.completion-rate {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.completion-rate h2 {
  color: var(--text-light);
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.progress-container {
  height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.progress-bar {
  height: 100%;
  background-color: var(--primary);
  border-radius: 15px;
  transition: width 0.5s ease;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 500;
  font-size: 0.9rem;
}

.stats-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  color: var(--text-light);
  font-size: 0.9rem;
  opacity: 0.8;
}

.stat-value {
  color: var(--text-light);
  font-size: 1.5rem;
  font-weight: 600;
}
</style>