<!-- /src/components/RequestFuelForm.vue -->
<template>
  <div class="request-fuel">
    <h2>Request Fuel</h2>

    <form @submit.prevent="submitRequest">
      <div class="form-group">
        <label>Litres of Fuel</label>
        <input type="number" v-model.number="form.litres" min="1" required />
      </div>

      <div class="form-group">
        <label>Account Name</label>
        <input type="text" v-model="form.accountName" required />
      </div>

      <div class="form-group">
        <label>Account Number</label>
        <input type="text" v-model="form.accountNumber" maxlength="10" required />
      </div>

      <div class="form-group">
        <label>Bank Name</label>
        <input type="text" v-model="form.bank" required />
      </div>

      <button type="submit">Submit Fuel Request</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  litres: '',
  accountName: '',
  accountNumber: '',
  bank: ''
})

function submitRequest() {
  alert(`✅ Fuel request submitted!\nLitres: ${form.value.litres}\nAccount: ${form.value.accountName} (${form.value.accountNumber}) - ${form.value.bank}`)
  form.value = { litres: '', accountName: '', accountNumber: '', bank: '' }
}
</script>

<style scoped>
.request-fuel {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;
  max-width: 600px;
}

h2 {
  color: #1a237e;
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1rem;

  label {
    font-weight: bold;
    display: block;
    margin-bottom: 0.5rem;
  }

  input {
    width: 100%;
    padding: 0.6rem;
    border-radius: 0.5rem;
    border: 1px solid #ccc;
  }
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
  width: 100%;
}

button:hover {
  background: #0d1644;
}
</style>
