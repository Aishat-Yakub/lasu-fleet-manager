<script setup>
import AddVehicleForm from './components/AddVehicleForm.vue'
import VehicleList     from './pages/VehicleList.vue'
import FuelLogForm     from './components/FuelLogForm.vue'
import FuelTable from './pages/FuelTable.vue'
import MaintenanceForm  from './components/MaintenanceForm.vue'
import MaintenanceTable from './pages/MaintenanceTable.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>LASU Fleet Manager</h1>
    </header>

    <main>
      <AddVehicleForm />
      <VehicleList />
      <FuelLogForm />
      <FuelTable />
      <MaintenanceForm />      
      <MaintenanceTable />
      <router-view />
           
    </main>
  </div>
</template>

<style scoped>
/* any global App.vue styles here */
</style>
