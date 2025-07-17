<!-- src/components/FuelRequestTable.vue -->
<template>
  <div class="fuel-requests">
    <h3>Fuel Requests</h3>

    <input
      v-model="search"
      type="text"
      placeholder="Search requests..."
      class="search-bar"
    />

    <div v-if="filteredRequests.length === 0">No fuel requests found.</div>

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
        <tr v-for="req in filteredRequests" :key="req.id">
          <td>{{ req.plateNumber }}</td>
          <td>{{ req.litres }}</td>
          <td>{{ req.bank }}</td>
          <td>{{ req.accountName }}</td>
          <td>{{ req.accountNumber }}</td>
          <td :class="req.status.toLowerCase()">{{ req.status }}</td>
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
import { onMounted, ref, computed } from 'vue'

const requests = ref([])
const search = ref('')

// Dummy data for frontend-only testing
onMounted(() => {
  requests.value = [
    {
      id: 1,
      plateNumber: 'LASU-001',
      litres: 30,
      bank: 'GTBank',
      accountName: 'John Doe',
      accountNumber: '0123456789',
      status: 'pending'
    },
    {
      id: 2,
      plateNumber: 'LASU-002',
      litres: 40,
      bank: 'UBA',
      accountName: 'Jane Smith',
      accountNumber: '9876543210',
      status: 'approved'
    }
  ]
})

const filteredRequests = computed(() => {
  const term = search.value.toLowerCase()
  return requests.value.filter(req =>
    Object.values(req).some(val =>
      String(val).toLowerCase().includes(term)
    )
  )
})

function approve(id) {
  const r = requests.value.find(r => r.id === id)
  if (r && r.status === 'pending') {
    r.status = 'approved'
    alert('Request approved successfully.')
  }
}

function reject(id) {
  const r = requests.value.find(r => r.id === id)
  if (r && r.status === 'pending') {
    r.status = 'rejected'
    alert('Request rejected.')
  }
}
</script>

<style scoped>
.fuel-requests {
  padding: 1rem;
}
.search-bar {
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

th,
td {
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
