<!-- src/components/FuelRequestTable.vue -->
<template>
  <div class="fuel-requests">
    <h3>Fuel Requests</h3>

    <div v-if="requests.length === 0">No fuel requests yet.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Litres</th>
          <th>Bank</th>
          <th>Account Name</th>
          <th>Account Number</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="req in requests" :key="req.id">
          <td>{{ req.plateNumber }}</td>
          <td>{{ req.litres }}</td>
          <td>{{ req.bank }}</td>
          <td>{{ req.accountName }}</td>
          <td>{{ req.accountNumber }}</td>
          <td :class="req.status">{{ req.status }}</td>
          <td>
            <button 
              @click="approve(req.id)" 
              :disabled="req.status !== 'pending'"
              class="approve"
            >
              Approve
            </button>
            <button 
              @click="reject(req.id)" 
              :disabled="req.status !== 'pending'"
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
import { onMounted, ref } from 'vue'
import axios from 'axios'

const requests = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/fuel-requests')
    requests.value = res.data
  } catch (err) {
    alert('Failed to load fuel requests.')
  }
})

async function approve(id) {
  try {
    await axios.put(`http://localhost:3001/api/fuel-requests/${id}/approve`)
    const r = requests.value.find(r => r.id === id)
    if (r) r.status = 'approved'
    alert('Request approved successfully.')
  } catch (err) {
    alert('Failed to approve request.')
  }
}

async function reject(id) {
  try {
    await axios.put(`http://localhost:3001/api/fuel-requests/${id}/reject`)
    const r = requests.value.find(r => r.id === id)
    if (r) r.status = 'rejected'
    alert('Request rejected.')
  } catch (err) {
    alert('Failed to reject request.')
  }
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
</style>
