<!-- src/components/MaintenanceRequestTable.vue -->
<template>
  <div class="maintenance-requests">
    <h3>Maintenance Requests</h3>

    <div v-if="requests.length === 0">No maintenance requests yet.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Description</th>
          <th>PDF Proof</th>
          <th>Status</th>
          <th>Condition</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requests" :key="req.id">
          <td>{{ req.plateNumber }}</td>
          <td>{{ req.description }}</td>
          <td>
            <a :href="`http://localhost:3001/uploads/${req.proof}`" target="_blank">View PDF</a>
          </td>
          <td>{{ req.status }}</td>
          <td :style="{ color: req.vehicleCondition === 'bad' ? 'red' : 'green' }">
            {{ req.vehicleCondition }}
          </td>
          <td>
            <button @click="approve(req.id)" :disabled="req.status === 'approved' || req.vehicleCondition === 'bad'">
              Approve
            </button>
            <button @click="reject(req.id)" :disabled="req.status === 'rejected'">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const requests = ref([])

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
</script>

<style scoped>
table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}
th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}
button {
  margin-right: 0.5rem;
  padding: 0.3rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
</style>
