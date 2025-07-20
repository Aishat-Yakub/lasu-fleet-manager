<template>
  <div class="login-page">
    <h2>Login as Vehicle Owner</h2>
    <form @submit.prevent="handleLogin">
      <label for="plateNumber">Plate Number</label>
      <input
        id="plateNumber"
        v-model="plateNumber"
        placeholder="e.g., LASU-123"
        required
        autofocus
        @input="plateNumber = plateNumber.toUpperCase()"
      />

      <label for="password">Password</label>
      <input
        id="password"
        type="password"
        v-model="password"
        placeholder="Enter your password"
        required
      />

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
const password = ref('')
const error = ref('')

// Simulated user database
const allowedUsers = [
  { plate: 'LASU-123', password: 'owner123' },
  { plate: 'ABC-456', password: 'test456' },
  { plate: 'XYZ-789', password: 'pass789' }
]

function handleLogin() {
  const plate = plateNumber.value.trim().toUpperCase()
  const pass = password.value.trim()

  if (!plate || !pass) {
    error.value = 'Both plate number and password are required.'
    return
  }

  const user = allowedUsers.find(
    u => u.plate === plate && u.password === pass
  )

  if (user) {
    localStorage.setItem('plateNumber', plate)
    error.value = ''
    router.push('/dashboard')
  } else {
    error.value = 'Invalid plate number or password.'
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
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  font-size: 1rem;
}

button {
  width: 100%;
  padding: 0.8rem;
  background: #1a237e;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
