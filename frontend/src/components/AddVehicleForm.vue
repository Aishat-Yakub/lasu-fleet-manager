<!-- src/components/AddVehicleForm.vue -->
<template>
  <div class="add-vehicle-form">
    <h2>Add Vehicle and Assign Owner</h2>
    <form @submit.prevent="handleSubmit">
      <!-- Vehicle Info -->
      <div class="form-section">
        <h3>Vehicle Information</h3>

        <label>
          Plate Number:
          <input v-model="vehicle.plateNumber" required />
        </label>

        <label>
          Last Registration Date:
          <input type="date" v-model="vehicle.registrationDate" required />
        </label>

        <label>
          Model:
          <input v-model="vehicle.model" required />
        </label>

        <label>
          Color:
          <input v-model="vehicle.color" required />
        </label>

        <label>
          Current Condition:
          <textarea v-model="vehicle.condition" rows="2" required></textarea>
        </label>
      </div>

      <!-- Owner Info -->
      <div class="form-section">
        <h3>Owner Information</h3>

        <label>
          Owner Full Name:
          <input v-model="vehicle.ownerName" required />
        </label>

        <label>
          Owner Contact Phone:
          <input type="tel" v-model="vehicle.ownerContact" required />
        </label>

        <label>
          Staff Post:
          <input v-model="vehicle.staffPost" placeholder="e.g., Lecturer, Driver" required />
        </label>
      </div>

      <button type="submit">Add Vehicle</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const vehicle = reactive({
  plateNumber: '',
  registrationDate: '',
  model: '',
  color: '',
  condition: '',
  ownerName: '',
  ownerContact: '',
  staffPost: ''
})

function handleSubmit() {
  // For now, just log it to console
  console.log('Vehicle submitted:', vehicle)
  alert('Vehicle added (for now, just printed to console)')
  // TODO: Send to backend via API
}
</script>

<style scoped>
.add-vehicle-form {
  max-width: 600px;
  margin: 2rem auto;
  background: #fefefe;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
}

h2, h3 {
  text-align: center;
  color: #222;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-section {
  margin-bottom: 2rem;
}

label {
  display: flex;
  flex-direction: column;
  font-weight: 500;
  gap: 0.3rem;
}

input, textarea {
  padding: 0.6rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  font-size: 1rem;
}

button {
  background: #2b5cb8;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background: #1e4693;
}
</style>
