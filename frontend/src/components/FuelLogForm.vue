<template>
  <div class="fuel-form">
    <h2>Log Fuel Usage</h2>

    <!-- Warning Message -->
    <div v-if="warningMessage" class="warning">
      ⚠️ {{ warningMessage }}
    </div>

    <form @submit.prevent="submitFuelLog">
      <div class="form-group">
        <label for="vehicle">Vehicle</label>
        <select v-model="fuel.vehicleId" required>
          <option disabled value="">Select a vehicle</option>
          <option v-for="v in vehicles" :key="v.id" :value="v.id">
            {{ v.plateNumber }} ({{ v.department }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="litres">Litres</label>
        <input type="number" v-model.number="fuel.litres" min="1" required />
      </div>

      <div class="form-group">
        <label for="amount">Amount (₦)</label>
        <input type="number" v-model.number="fuel.amount" min="1" required />
      </div>

      <div class="form-group">
        <label for="date">Date</label>
        <input type="date" v-model="fuel.date" required />
      </div>

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Form state
const fuel = ref({
  vehicleId: '',
  litres: '',
  amount: '',
  date: ''
})

const vehicles = ref([])
const warningMessage = ref('')

// Fetch vehicles for the dropdown
const fetchVehicles = async () => {
  const res = await axios.get('http://localhost:3001/api/vehicles')
  vehicles.value = res.data
}

// Submit fuel log
const submitFuelLog = async () => {
  try {
    const res = await axios.post('http://localhost:3001/api/fuel', fuel.value)

    // Show maintenance warning if present
    if (res.data.warning) {
      warningMessage.value = res.data.warning
    } else {
      warningMessage.value = ''
      alert('✅ Fuel log submitted successfully.')
    }

    // Reset form
    fuel.value = { vehicleId: '', litres: '', amount: '', date: '' }
  } catch (err) {
    console.error(err)
    alert('❌ Failed to submit fuel log.')
  }
}

onMounted(fetchVehicles)
</script>

<style scoped lang="scss">
.fuel-form {
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
  max-width: 600px;

  h2 {
    margin-bottom: 1rem;
    color: #1a237e;
  }

  .form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    input, select {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 0.5rem;
      font-size: 1rem;
    }
  }

  button {
    padding: 0.7rem 1.5rem;
    background: #1a237e;
    color: #fff;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: bold;

    &:hover {
      background: #0d1644;
    }
  }

  .warning {
    background: #fff3cd;
    border: 1px solid #ffecb5;
    color: #856404;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }
}
</style>
