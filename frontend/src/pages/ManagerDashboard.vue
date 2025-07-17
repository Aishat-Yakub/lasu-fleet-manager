<!-- src/pages/ManagerDashboard.vue -->
<template>
  <div class="manager-dashboard">
    <h2>Fleet Manager Dashboard</h2>
    <p>Welcome, Fleet Manager!</p>

    <div class="top-actions">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>

    <ManagerVehicleList />
    <FuelRequestTable />
    <MaintenanceRequestTable />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import ManagerVehicleList from '../components/ManagerVehicleList.vue'
import FuelRequestTable from '../components/FuelRequestTable.vue'
import MaintenanceRequestTable from '../components/MaintenanceRequestTable.vue'

const router = useRouter()

function logout() {
  localStorage.removeItem('managerLoggedIn')
  router.push('/login-manager')
}
</script>

<style scoped>
.manager-dashboard {
  padding: 2rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  text-align: center;
  max-width: 900px;
  margin: 2rem auto;
}

.logout-btn {
  background: #c62828;
  color: #fff;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  cursor: pointer;
}

.logout-btn:hover {
  background: #8e0000;
}

.top-actions {
  margin-bottom: 1rem;
}
</style>
