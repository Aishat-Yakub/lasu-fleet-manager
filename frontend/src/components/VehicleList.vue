<!-- src/components/VehicleList.vue -->
<template>
  <div class="vehicle-list">
    <h2>All Registered Vehicles</h2>

    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search by Plate, Owner, Model, etc..."
      class="search-input"
    />

    <p class="result-count">
      Showing {{ filteredVehicles.length }} of {{ vehicles.length }} vehicles
    </p>

    <div class="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Plate Number</th>
            <th>Registration Date</th>
            <th>Model</th>
            <th>Color</th>
            <th>Condition</th>
            <th>Owner</th>
            <th>Contact</th>
            <th>Staff Post</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="vehicle in filteredVehicles"
            :key="vehicle.plateNumber"
          >
            <td v-html="highlight(vehicle.plateNumber)"></td>
            <td v-html="highlight(vehicle.registrationDate)"></td>
            <td v-html="highlight(vehicle.model)"></td>
            <td v-html="highlight(vehicle.color)"></td>
            <td v-html="highlight(vehicle.condition)"></td>
            <td v-html="highlight(vehicle.ownerName)"></td>
            <td v-html="highlight(vehicle.ownerContact)"></td>
            <td v-html="highlight(vehicle.staffPost)"></td>
          </tr>
          <tr v-if="filteredVehicles.length === 0">
            <td colspan="8">No matching vehicles found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchQuery = ref('')

const vehicles = ref([
  {
    plateNumber: 'LSU123AB',
    registrationDate: '2024-01-01',
    model: 'Toyota Corolla',
    color: 'White',
    condition: 'Good',
    ownerName: 'Mr. Yakubu',
    ownerContact: '08012345678',
    staffPost: 'Lecturer'
  },
  {
    plateNumber: 'LSU234CD',
    registrationDate: '2023-08-12',
    model: 'Honda Accord',
    color: 'Black',
    condition: 'Needs service',
    ownerName: 'Mrs. Janet',
    ownerContact: '08098765432',
    staffPost: 'Driver'
  }
])

const filteredVehicles = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return vehicles.value.filter(vehicle =>
    Object.values(vehicle).some(val =>
      String(val).toLowerCase().includes(q)
    )
  )
})

function highlight(text) {
  const q = searchQuery.value.trim()
  if (!q) return text
  const regex = new RegExp(`(${q})`, 'gi')
  return String(text).replace(regex, '<mark>$1</mark>')
}
</script>

<style scoped>
.vehicle-list {
  max-width: 1000px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #1a237e;
}

.search-input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

.result-count {
  text-align: right;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  color: #444;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.95rem;
}

th, td {
  padding: 0.75rem;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f7fa;
  font-weight: 600;
}

tbody tr:hover {
  background: #f9f9f9;
}

td[colspan="8"] {
  text-align: center;
  color: #999;
}

mark {
  background-color: #ffff99;
  padding: 0 2px;
  border-radius: 3px;
}
</style>
