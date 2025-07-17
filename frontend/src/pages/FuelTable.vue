<template>
  <div class="fuel-table">
    <h2>Fuel Logs</h2>

    <!-- Show table only when there’s at least one log -->
    <table v-if="logs.length">
      <thead>
        <tr>
          <th>Plate Number</th>
          <th>Department</th>
          <th>Condition</th>
          <th>Litres</th>
          <th>Amount (₦)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="log in logs"
          :key="log.id"
          :class="{ inactive: log.condition !== 'Active' }"
        >
          <td>{{ log.plateNumber }}</td>
          <td>{{ log.department }}</td>
          <td>{{ log.condition }}</td>
          <td>{{ log.litres }}</td>
          <td>{{ log.amount }}</td>
          <td>{{ formatDate(log.date) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Message when no logs exist -->
    <p v-else class="no-data">No fuel logs recorded yet.</p>

    <!-- Overall warning for any inactive rows -->
    <p v-if="logs.some(l => l.condition !== 'Active')" class="warning">
      ⚠️ Some vehicles that received fuel are not active!
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const logs = ref([])

async function fetchFuelLogs() {
  try {
    const res = await axios.get('http://localhost:3001/api/fuel')
    console.log('🔥 Fuel logs fetched:', res.data)  // <-- debug output
    logs.value = res.data
  } catch (err) {
    console.error('Failed to load fuel logs:', err)
    alert('❌ Failed to load fuel logs.')
  }
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

onMounted(fetchFuelLogs)
</script>

<style scoped lang="scss">
.fuel-table {
  margin: 2rem 0;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    color: #1a237e;
    margin-bottom: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;

    th,
    td {
      padding: 0.75rem;
      border-bottom: 1px solid #eee;
      text-align: left;
    }

    th {
      background: #f5f5f5;
      font-weight: 600;
    }

    tr.inactive {
      background: #fff3cd; /* light warning bg */
    }

    tr:hover {
      background: #f9f9f9;
    }
  }

  .no-data {
    text-align: center;
    color: #999;
    margin: 1rem 0;
  }

  .warning {
    margin-top: 1rem;
    background: #fff3cd;
    color: #856404;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
  }
}
</style>
