<!-- src/components/FleetManagerList.vue -->
<template>
  <div class="fleet-manager-list">
    <h3>Registered Fleet Managers</h3>

    <input
      v-model="searchTerm"
      type="text"
      placeholder="Search by name or username..."
      class="search-input"
    />

    <table v-if="filteredManagers.length > 0">
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(manager, index) in filteredManagers" :key="index">
          <td>{{ manager.name }}</td>
          <td>{{ manager.username }}</td>
          <td>
            <button @click="deleteManager(index)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No fleet managers found.</p>

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
import { ref, computed } from 'vue'

// Dummy state for now (backend comes later)
const managers = ref([
  { name: 'Tunde', username: 'tunde123' }
])

const newManager = ref({
  name: '',
  username: '',
  password: ''
})

const searchTerm = ref('')

const filteredManagers = computed(() => {
  if (!searchTerm.value.trim()) return managers.value
  return managers.value.filter(manager =>
    manager.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    manager.username.toLowerCase().includes(searchTerm.value.toLowerCase())
  )
})

function addManager() {
  if (!newManager.value.name || !newManager.value.username || !newManager.value.password) return

  managers.value.push({ ...newManager.value })
  newManager.value = { name: '', username: '', password: '' }
  alert('Fleet Manager added successfully!')
}

function deleteManager(index) {
  if (confirm('Are you sure you want to delete this manager?')) {
    managers.value.splice(index, 1)
  }
}
</script>

<style scoped>
.fleet-manager-list {
  max-width: 700px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

h3, h4 {
  color: #1a237e;
  margin-bottom: 1rem;
}

.search-input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th, td {
  padding: 0.75rem;
  border: 1px solid #ddd;
  text-align: left;
}

button {
  padding: 0.5rem 1rem;
  background: #1a237e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
