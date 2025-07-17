<template>
  <div class="condition-updates">
    <h2>Condition Updates</h2>

    <div class="filters">
      <input v-model="search" type="text" placeholder="Search by plate or condition..." />
      <select v-model="filterStatus">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <div v-if="filteredUpdates.length === 0" class="empty">
      No condition updates match your criteria.
    </div>

    <table v-else>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Condition</th>
          <th>Comments</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="update in filteredUpdates" :key="update.id">
          <td>{{ update.plateNumber }}</td>
          <td>{{ update.condition }}</td>
          <td>{{ update.comment }}</td>
          <td :class="update.status">{{ update.status }}</td>
          <td>
            <button 
              @click="approve(update.id)" 
              :disabled="update.status !== 'pending'"
              class="approve"
            >
              Approve
            </button>
            <button 
              @click="reject(update.id)" 
              :disabled="update.status !== 'pending'"
              class="reject"
            >
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

const updates = ref([])
const search = ref('')
const filterStatus = ref('')

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/condition-updates')
    updates.value = res.data
  } catch (err) {
    alert('Failed to load condition updates.')
  }
})

const filteredUpdates = computed(() => {
  return updates.value.filter(update => {
    const matchesSearch = update.plateNumber.toLowerCase().includes(search.value.toLowerCase()) ||
                          update.condition.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || update.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

async function approve(id) {
  try {
    await axios.put(`http://localhost:3001/api/condition-updates/${id}/approve`)
    const u = updates.value.find(u => u.id === id)
    if (u) u.status = 'approved'
    alert('Condition update approved.')
  } catch (err) {
    alert('Error approving update.')
  }
}

async function reject(id) {
  try {
    await axios.put(`http://localhost:3001/api/condition-updates/${id}/reject`)
    const u = updates.value.find(u => u.id === id)
    if (u) u.status = 'rejected'
    alert('Condition update rejected.')
  } catch (err) {
    alert('Error rejecting update.')
  }
}
</script>

<style scoped>
.condition-updates {
  padding: 1.5rem;
  font-family: sans-serif;
}

h2 {
  margin-bottom: 1rem;
  font-size: 1.3rem;
  color: #222;
}

.filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

input, select {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  flex: 1;
  max-width: 300px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 0.5rem;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  margin-right: 0.5rem;
  padding: 0.4rem 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
button.approve {
  background-color: #2e7d32;
  color: #fff;
}
button.reject {
  background-color: #c62828;
  color: #fff;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.approved {
  color: green;
  font-weight: bold;
}
.rejected {
  color: red;
  font-weight: bold;
}
.pending {
  color: orange;
  font-weight: bold;
}

.empty {
  margin-top: 1rem;
  font-style: italic;
  color: #666;
}
</style>
