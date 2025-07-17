<template>
  <div class="vehicle-list">
    <h2>All Vehicles</h2>

    <!-- Debug: Show how many records -->
    <p>Total vehicles loaded: {{ vehicles.length }}</p>

    <table>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Department</th>
          <th>Driver</th>
          <th>Type</th>
          <th>Condition</th>
          <th>Last Maintenance</th>
          <th>Registration Expiry</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="vehicle in vehicles" :key="vehicle.id">
          <td>{{ vehicle.plateNumber }}</td>
          <td>{{ vehicle.department }}</td>
          <td>{{ vehicle.driver }}</td>
          <td>{{ vehicle.type }}</td>
          <td>{{ vehicle.condition }}</td>
          <td>{{ vehicle.lastMaintenanceDate }}</td>
          <td>{{ vehicle.registrationExpiry }}</td>
          <td>{{ vehicle.notes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const vehicles = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/api/vehicles')
    vehicles.value = await res.json()
  } catch (err) {
    console.error('Error fetching vehicles:', err)
  }
})
</script>

<style scoped lang="scss">
.vehicle-list {
  padding: 20px;

  h2 {
    text-align: center;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: white;

    th, td {
      border: 1px solid #ccc;
      padding: 10px;
      text-align: left;
    }

    th {
      background-color: #f4f4f4;
    }

    tr:nth-child(even) {
      background-color: #fafafa;
    }
  }
}
</style>
