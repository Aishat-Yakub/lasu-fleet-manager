<template>
  <div class="card">
    <h3 class="title">Maintenance Requests</h3>

    <div class="controls">
      <input v-model="search" type="text" placeholder="Search by Plate Number..." />
      <select v-model="statusFilter">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>

    <div v-if="filteredRequests.length === 0" class="no-data">No maintenance requests match.</div>

    <table v-else class="request-table">
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Description</th>
          <th>PDF</th>
          <th>Status</th>
          <th>Condition</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in filteredRequests" :key="req.id">
          <td>{{ req.plateNumber }}</td>
          <td>{{ req.description }}</td>
          <td>
            <a :href="`http://localhost:3001/uploads/${req.proof}`" target="_blank">View PDF</a>
          </td>
          <td>
            <span :class="['status', req.status || 'pending']">
              {{ req.status || 'pending' }}
            </span>
          </td>
          <td :style="{ color: req.vehicleCondition === 'bad' ? 'red' : 'green' }">
            {{ req.vehicleCondition }}
          </td>
          <td>{{ formatDate(req.createdAt) }}</td>
          <td>
            <button
              @click="approve(req.id)"
              :disabled="req.status === 'approved' || req.vehicleCondition === 'bad'"
              class="approve"
            >
              Approve
            </button>
            <button
              @click="reject(req.id)"
              :disabled="req.status === 'rejected'"
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

const requests = ref([])
const search = ref('')
const statusFilter = ref('')

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/maintenance-requests')
  requests.value = res.data
})

async function approve(id) {
  await axios.put(`http://localhost:3001/api/maintenance-requests/${id}/approve`)
  const r = requests.value.find(r => r.id === id)
  if (r) r.status = 'approved'
}

async function reject(id) {
  await axios.put(`http://localhost:3001/api/maintenance-requests/${id}/reject`)
  const r = requests.value.find(r => r.id === id)
  if (r) r.status = 'rejected'
}

function formatDate(dateStr) {
  const date = new Date(dateStr)
  return date.toLocaleString('en-GB')
}

const filteredRequests = computed(() => {
  return requests.value.filter(req => {
    const matchesPlate = req.plateNumber.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = statusFilter.value ? req.status === statusFilter.value : true
    return matchesPlate && matchesStatus
  })
})
</script>

<style scoped>
.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.controls input,
.controls select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
}

.no-data {
  padding: 1rem;
  color: #888;
  font-size: 0.9rem;
}

.request-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.request-table th,
.request-table td {
  padding: 0.7rem;
  border: 1px solid #eee;
  text-align: left;
}

.status {
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  font-weight: bold;
  text-transform: capitalize;
}

.status.pending {
  background: #e2e3e5;
  color: #6c757d;
}
.status.approved {
  background: #d4edda;
  color: #155724;
}
.status.rejected {
  background: #f8d7da;
  color: #721c24;
}

.approve {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;
}
.reject {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}

.approve:disabled,
.reject:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
