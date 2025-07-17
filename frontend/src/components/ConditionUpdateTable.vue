<!-- src/components/ConditionUpdateTable.vue -->
<template>
  <div class="table-container">
    <h3>Condition Updates</h3>
    <table>
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Status</th>
          <th>Inspection Document</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(update, index) in conditionUpdates" :key="index">
          <td>{{ update.plateNumber }}</td>
          <td>{{ update.status }}</td>
          <td>
            <a :href="update.proofUrl" target="_blank">View Proof</a>
          </td>
          <td>{{ update.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy data for now
const conditionUpdates = ref([
  {
    plateNumber: 'LASU-123',
    status: 'Pending Review',
    proofUrl: '#',
    date: '2025-07-16',
  },
  {
    plateNumber: 'ABC-456',
    status: 'Approved',
    proofUrl: '#',
    date: '2025-07-14',
  },
])
</script>

<style scoped>
.table-container {
  margin-top: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0 0 8px rgba(0,0,0,0.05);
}

h3 {
  margin-bottom: 1rem;
  color: #1a237e;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
}
</style>
