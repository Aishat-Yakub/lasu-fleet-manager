<template>
  <div class="admin-dashboard">
    <h2 class="dashboard-title">Admin Dashboard</h2>

    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab"
        :class="{ active: currentTab === tab }"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
    </div>

    <div class="tab-content">
      <!-- Fleet Managers -->
      <div v-if="currentTab === 'Fleet Managers'">
        <div class="button-group">
          <button @click="router.push('/fleet-managers')">View Fleet Managers Table</button>
          <button @click="router.push('/add-fleet-manager')">Add Fleet Manager</button>
        </div>
      </div>

      <!-- Auditors -->
      <div v-if="currentTab === 'Auditors'">
        <div class="button-group">
          <button @click="router.push('/auditors')">View Auditors Table</button>
          <button @click="router.push('/add-auditor')">Add Auditor</button>
        </div>
      </div>

      <!-- Vehicle Owners -->
      <div v-if="currentTab === 'Vehicle Owners'">
        <div class="button-group">
          <button @click="router.push('/vehicle-owners')">View Vehicle Owners</button>
          <button @click="router.push('/add-vehicle-owner')">Add Vehicle Owner</button>
        </div>
      </div>

      <!-- Requests -->
      <div v-if="currentTab === 'Requests'">
        <div class="button-group">
          <button @click="router.push('/fuel-requests')">View Fuel Requests</button>
          <button @click="router.push('/maintenance-requests')">View Maintenance Requests</button>
          <button @click="router.push('/condition-updates')">View Condition Updates</button>
        </div>
      </div>

      <!-- Audit Logs -->
      <div v-if="currentTab === 'Audit Logs'">
        <AuditorDashboard />
      </div>
    </div>

    <button class="logout-btn" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import AuditorDashboard from './AuditorDashboard.vue'

const router = useRouter()

const tabs = [
  'Fleet Managers',
  'Auditors',
  'Vehicle Owners',
  'Requests',
  'Audit Logs'
]

const currentTab = ref(tabs[0])

function logout() {
  localStorage.removeItem('adminLoggedIn')
  router.push('/login-admin')
}
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 1100px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.dashboard-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tabs button {
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.5rem;
  background-color: #ddd;
  cursor: pointer;
  font-weight: bold;
  transition: background 0.3s;
}

.tabs button.active {
  background-color: #1976d2;
  color: white;
}

.tab-content {
  background: #f9f9f9;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.03);
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.button-group button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 0.7rem 1.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.3s ease;
  font-weight: 600;
}

.button-group button:hover {
  background-color: #145ea8;
}

.logout-btn {
  display: block;
  margin: 2rem auto 0;
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
</style>
