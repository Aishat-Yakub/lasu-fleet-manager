<script setup>
import SelectRole from './pages/SelectRole.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>LASU Fleet Manager</h1>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* any global App.vue styles here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}
header {
header {
  background: #1a237e;
  color: #fff;
  padding: 1rem;
  text-align: center;
}

}
main {
  padding: 1rem;
}
</style>
