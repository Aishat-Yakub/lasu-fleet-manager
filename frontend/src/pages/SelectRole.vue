<!-- src/pages/SelectRole.vue -->
<template>
  <div class="select-role">
    <h2>Login As:</h2>
    <div class="roles">
      <router-link to="/login-owner" class="btn">Vehicle Owner</router-link>
      <router-link to="/login-manager" class="btn alt">Fleet Manager</router-link>
      <router-link to="/login-auditor" class="btn purple">Auditor</router-link>
      <router-link to="/login-admin" class="btn dark">Admin</router-link>
    </div>
  </div>
</template>

<style scoped>
.select-role {
  padding: 3rem;
  text-align: center;
}
.roles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 300px;
  margin: 2rem auto;
}
.btn {
  display: block;
  padding: 1rem;
  background: #1a237e;
  color: white;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: bold;
}
.btn:hover {
  background: #0d1644;
}
.btn.alt {
  background: #4a148c;
}
.btn.purple {
  background: #6a1b9a;
}
.btn.dark {
  background: #333;
}
</style>