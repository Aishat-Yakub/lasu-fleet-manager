<template>
  <form @submit.prevent="handleSubmit" class="vehicle-form">
    <label>
      Plate Number:
      <input v-model="vehicle.plateNumber" required />
    </label>

    <label>
      Department:
      <input v-model="vehicle.department" required />
    </label>

    <label>
      Driver:
      <input v-model="vehicle.driver" />
    </label>

    <label>
      Vehicle Type:
      <select v-model="vehicle.type" required>
        <option>Car</option>
        <option>Truck</option>
        <option>Motorcycle</option>
      </select>
    </label>

    <label>
      Condition:
      <select v-model="vehicle.condition" required>
        <option>Active</option>
        <option>Under Maintenance</option>
        <option>Out of Service</option>
      </select>
    </label>

    <label>
      Last Maintenance Date:
      <input type="date" v-model="vehicle.lastMaintenanceDate" />
    </label>

    <label>
      Registration Expiry:
      <input type="date" v-model="vehicle.registrationExpiry" />
    </label>

    <label>
      Notes:
      <textarea v-model="vehicle.notes"></textarea>
    </label>

    <button type="submit">Add Vehicle</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const vehicle = ref({
  plateNumber: '',
  department: '',
  driver: '',
  type: 'Car',
  condition: 'Active',
  lastMaintenanceDate: '',
  registrationExpiry: '',
  notes: ''
})

const handleSubmit = async () => {
  try {
    await axios.post('http://localhost:3001/api/vehicles', vehicle.value)
    alert('Vehicle added!')
    // Clear form
    Object.keys(vehicle.value).forEach(key => vehicle.value[key] = '')
  } catch (err) {
    alert('Error adding vehicle')
    console.error(err)
  }
}
</script>

<style scoped lang="scss">
.vehicle-form {
  display: grid;
  gap: 1rem;
  max-width: 500px;
  margin: 0 auto;

  label {
    display: flex;
    flex-direction: column;
  }

  button {
    padding: 0.5rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
}
</style>
