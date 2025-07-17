<!-- src/components/AuditorList.vue -->
<template>
  <div class="auditor-list">
    <h3>Auditor Management</h3>

    <form @submit.prevent="addAuditor" class="form">
      <input v-model="newAuditor.username" placeholder="Username" required />
      <input v-model="newAuditor.password" placeholder="Password" type="password" required />
      <button type="submit">Add Auditor</button>
    </form>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search auditors..."
      class="search-input"
    />

    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Username</th>
          <th>Password</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(auditor, index) in filteredAuditors"
          :key="auditor.id"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ auditor.username }}</td>
          <td>{{ auditor.password }}</td>
          <td>
            <button @click="removeAuditor(auditor.id)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const auditors = ref([
  { id: 1, username: 'auditor1', password: 'pass123' },
  { id: 2, username: 'auditor2', password: 'secret456' },
])

const newAuditor = ref({ username: '', password: '' })
const searchQuery = ref('')

function addAuditor() {
  if (newAuditor.value.username && newAuditor.value.password) {
    const id = Date.now()
    auditors.value.push({
      id,
      username: newAuditor.value.username,
      password: newAuditor.value.password,
    })
    newAuditor.value.username = ''
    newAuditor.value.password = ''
  }
}

function removeAuditor(id) {
  auditors.value = auditors.value.filter(a => a.id !== id)
}

const filteredAuditors = computed(() => {
  return auditors.value.filter(auditor =>
    auditor.username.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>

<style scoped>
.auditor-list {
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  max-width: 800px;
  margin: auto;
}

h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.form input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}

.form button {
  padding: 0.6rem 1.2rem;
  background-color: #2e7d32;
  color: white;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
}

.form button:hover {
  background-color: #1b5e20;
}

.search-input {
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.4rem;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.6rem;
  border: 1px solid #eee;
  text-align: left;
}

button {
  background-color: #c62828;
  color: white;
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 0.4rem;
  cursor: pointer;
}

button:hover {
  background-color: #8e0000;
}
</style>
