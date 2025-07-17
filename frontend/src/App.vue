<script setup>
import AddVehicleForm from './components/AddVehicleForm.vue'
import VehicleList     from './components/VehicleList.vue'
import FuelLogForm     from './components/FuelLogForm.vue'
import FuelTable       from './pages/FuelTable.vue'
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
      <MaintenanceTable />
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* any global App.vue styles here */
</style>
