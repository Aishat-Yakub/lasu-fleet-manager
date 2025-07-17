<!-- /src/pages/Login.vue -->
<template>
  <div class="login-page">
    <h2>Login as Vehicle Owner</h2>
    <form @submit.prevent="handleLogin">
      <label>Plate Number</label>
      <input v-model="plateNumber" placeholder="Enter Plate Number" required />
      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const plateNumber = ref('')
const error = ref('')

function handleLogin() {
  if (plateNumber.value.trim() === '') {
    error.value = 'Plate number is required.'
    return
  }

  // Simulate backend check for now
  const allowedPlates = ['LASU-123', 'ABC-456', 'XYZ-789'] // simulate registered vehicles

  const plate = plateNumber.value.toUpperCase()

  if (allowedPlates.includes(plate)) {
    localStorage.setItem('plateNumber', plate)
    router.push('/dashboard')
  } else {
    error.value = 'Plate number not registered. Please contact your Fleet Manager.'
  }
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  background: #fff;
}

input {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
}

button {
  margin-top: 1rem;
  padding: 0.7rem 1.5rem;
  background: #1a237e;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: bold;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
