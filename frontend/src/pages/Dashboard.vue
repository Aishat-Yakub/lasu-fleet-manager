<!-- src/pages/Dashboard.vue -->
<template>
  <div class="dashboard">
    <h2>Welcome</h2>
    <p>You are logged in with plate number: <strong>{{ plateNumber }}</strong></p>

    <div class="actions">
      <router-link to="/request-fuel" class="btn">Request Fuel</router-link>
      <router-link to="/request-maintenance" class="btn alt">Request Maintenance</router-link>
      <router-link to="/update-condition" class="btn purple">Update Vehicle Condition</router-link>
    </div>

    <div class="view-requests">
      <h3>My Submitted Requests</h3>
      <router-link to="/fuel-requests" class="btn outline">Fuel Requests</router-link>
      <router-link to="/maintenance-requests" class="btn outline">Maintenance Requests</router-link>
      <router-link to="/condition-updates" class="btn outline">Condition Updates</router-link>
    </div>

    <div class="logout-wrap">
      <button @click="logout" class="btn danger">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const plateNumber = ref('')
const router = useRouter()

onMounted(() => {
  const saved = localStorage.getItem('plateNumber')
  if (!saved) {
    router.push('/')
  } else {
    plateNumber.value = saved
  }
})

function logout() {
  localStorage.removeItem('plateNumber')
  router.push('/login-owner')
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  text-align: center;
  background: #fff;
  border-radius: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}

h2 {
  color: #1a237e;
  margin-bottom: 1rem;
}

.actions,
.view-requests,
.logout-wrap {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: #1a237e;
  color: #fff;
  border-radius: 0.5rem;
  font-weight: 600;
  text-decoration: none;
  transition: background 0.3s;
}

.btn:hover {
  background: #0d1644;
}

.btn.alt {
  background: #4a148c;
}

.btn.alt:hover {
  background: #2e0854;
}

.btn.purple {
  background: #6a1b9a;
}

.btn.purple:hover {
  background: #4a0072;
}

.btn.danger {
  background: #c62828;
}

.btn.danger:hover {
  background: #8e0000;
}

.btn.outline {
  background: transparent;
  border: 2px solid #1a237e;
  color: #1a237e;
}

.btn.outline:hover {
  background: #1a237e;
  color: white;
}
</style>
