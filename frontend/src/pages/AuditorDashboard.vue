<!-- src/pages/AuditorDashboard.vue -->
<template>
  <div class="auditor-dashboard">
    <h2>Auditor Dashboard</h2>

    <!-- Tab Buttons -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'fuel' }" @click="activeTab = 'fuel'">Fuel Requests</button>
      <button :class="{ active: activeTab === 'maintenance' }" @click="activeTab = 'maintenance'">Maintenance Requests</button>
      <button :class="{ active: activeTab === 'condition' }" @click="activeTab = 'condition'">Condition Updates</button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <FuelRequestTable v-if="activeTab === 'fuel'" />
      <MaintenanceRequestTable v-if="activeTab === 'maintenance'" />
      <ConditionUpdateTable v-if="activeTab === 'condition'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import FuelRequestTable from '../components/FuelRequestTable.vue'
import MaintenanceRequestTable from '../components/MaintenanceRequestTable.vue'
import ConditionUpdateTable from '../components/ConditionUpdateTable.vue'

const activeTab = ref('fuel')
</script>

<style scoped>
.auditor-dashboard {
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
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
</style>
