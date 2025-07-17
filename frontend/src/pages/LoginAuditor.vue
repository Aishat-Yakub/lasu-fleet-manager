<!-- src/pages/LoginAuditor.vue -->
<template>
  <div class="login-page">
    <h2>Login as Auditor</h2>
    <form @submit.prevent="handleLogin">
      <label>Username</label>
      <input v-model="username" placeholder="Enter Username" required />
      
      <label>Password</label>
      <input v-model="password" type="password" placeholder="Enter Password" required />
      
      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

function handleLogin() {
  // Dummy login: only one auditor
  if (username.value === 'auditor' && password.value === 'audit123') {
    router.push('/auditor-dashboard')
  } else {
    error.value = 'Invalid credentials'
  }
}
</script>

<style scoped>
/* Same styles used for other login pages */
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
