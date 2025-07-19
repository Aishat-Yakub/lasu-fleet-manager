<template>
  <div class="form-container">
    <h2>Add Fleet Manager</h2>
    <form @submit.prevent="handleSubmit">
      <label>
        Full Name:
        <input type="text" v-model="form.name" required />
      </label>

      <label>
        Username:
        <input type="text" v-model="form.username" required />
      </label>

      <label>
        Password:
        <input type="password" v-model="form.password" required />
      </label>

      <button type="submit">Add Fleet Manager</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  name: '',
  username: '',
  password: ''
})

function handleSubmit() {
  console.log('Fleet Manager added:', form)
  alert('✅ Fleet Manager added (placeholder)')
  form.name = ''
  form.username = ''
  form.password = ''
}
</script>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 600;
}

input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

button {
  padding: 0.75rem;
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #0d1644;
}
</style>