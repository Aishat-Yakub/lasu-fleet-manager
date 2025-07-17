<!-- src/components/FleetManagerList.vue -->
<template>
  <div class="fleet-manager-list">
    <h3>Registered Fleet Managers</h3>

    <ul v-if="managers.length > 0">
      <li v-for="(manager, index) in managers" :key="index">
        {{ manager.name }} - {{ manager.username }}
      </li>
    </ul>
    <p v-else>No fleet managers yet.</p>

    <form @submit.prevent="addManager">
      <h4>Add New Fleet Manager</h4>
      <input v-model="newManager.name" placeholder="Name" required />
      <input v-model="newManager.username" placeholder="Username" required />
      <input v-model="newManager.password" type="password" placeholder="Password" required />
      <button type="submit">Add Fleet Manager</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Dummy state for now (we’ll connect backend later)
const managers = ref([
  { name: 'Tunde', username: 'tunde123' }
])

const newManager = ref({
  name: '',
  username: '',
  password: ''
})

function addManager() {
  if (!newManager.value.name || !newManager.value.username || !newManager.value.password) return

  managers.value.push({ ...newManager.value })
  newManager.value = { name: '', username: '', password: '' }
  alert('Fleet Manager added successfully!')
}
</script>

<style scoped>
.fleet-manager-list {
  max-width: 600px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}

h3, h4 {
  color: #1a237e;
  margin-bottom: 1rem;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

button {
  padding: 0.7rem 1.5rem;
  background: #1a237e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}
</style>
