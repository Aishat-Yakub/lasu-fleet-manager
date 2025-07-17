<!-- src/components/ManagerVehicleList.vue -->
<template>
  <div class="vehicle-list">
    <h3>All Vehicles</h3>

    <div v-if="vehicles.length === 0">No vehicles yet.</div>

    <table v-else>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Department</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="v in vehicles" :key="v.id">
          <td>{{ v.plateNumber }}</td>
          <td>{{ v.department }}</td>
          <td>{{ v.approved ? '✅ Approved' : '⏳ Pending' }}</td>
          <td>
            <button @click="approveVehicle(v.id)" :disabled="v.approved">Approve</button>
            <button @click="deleteVehicle(v.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const vehicles = ref([])

onMounted(async () => {
  const res = await axios.get('http://localhost:3001/api/vehicles')
  vehicles.value = res.data
})

async function approveVehicle(id) {
  await axios.put(`http://localhost:3001/api/vehicles/${id}/approve`)
  const vehicle = vehicles.value.find(v => v.id === id)
  if (vehicle) vehicle.approved = 1
}

async function deleteVehicle(id) {
  await axios.delete(`http://localhost:3001/api/vehicles/${id}`)
  vehicles.value = vehicles.value.filter(v => v.id !== id)
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
