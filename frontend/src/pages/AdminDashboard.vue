<!-- src/pages/AdminDashboard.vue -->
<template>
  <div class="admin-dashboard">
    <h2>Admin Dashboard</h2>
    <FleetManagerList />
  </div>
</template>

<script setup>
import FleetManagerList from '../components/FleetManagerList.vue'
</script>

<style scoped>
.admin-dashboard {
  padding: 2rem;
  max-width: 900px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
  text-align: center;
}
</style>
