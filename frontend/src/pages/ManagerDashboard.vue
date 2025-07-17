<!-- src/pages/ManagerDashboard.vue -->
<template>
  <div class="manager-dashboard">
    <h2>Fleet Manager Dashboard</h2>
    <p>Welcome, Fleet Manager!</p>



    <!-- Tab Buttons -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'vehicles' }" @click="activeTab = 'vehicles'">Vehicle List</button>
      <button :class="{ active: activeTab === 'fuel' }" @click="activeTab = 'fuel'">Fuel Requests</button>
      <button :class="{ active: activeTab === 'maintenance' }" @click="activeTab = 'maintenance'">Maintenance Requests</button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <ManagerVehicleList v-if="activeTab === 'vehicles'" />
      <FuelRequestTable v-if="activeTab === 'fuel'" />
      <MaintenanceRequestTable v-if="activeTab === 'maintenance'" />
    </div>
  </div>

    <div class="logout-tab">
      <div class="top-actions">
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ManagerVehicleList from '../components/ManagerVehicleList.vue'
import FuelRequestTable from '../components/FuelRequestTable.vue'
import MaintenanceRequestTable from '../components/MaintenanceRequestTable.vue'

const router = useRouter()
const activeTab = ref('vehicles')

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
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
  max-width: 900px;
  margin: 2rem auto;
  text-align: center;
}

.logout-btn {
  display: block;
  margin: 1rem 15rem;
  background-color: #c62828;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
 
}

.logout-btn:hover {
  background-color: #8e0000;
}

.top-actions {
  margin-bottom: 1rem;
  text-align: right;
}

.tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.tabs button {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background: #e0e0e0;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s;
}

.tabs button.active {
  background: #1a237e;
  color: #fff;
}

.tab-content {
  border-top: 1px solid #ccc;
  padding-top: 1rem;
}

.logout-tab {
  padding: 0.3rem 1.5rem 0.3rem;
  border: none;
  border-radius: 0.5rem;
  background: #ffffffff;
  cursor: pointer;
}

</style>
