<!-- src/components/RequestMaintenanceForm.vue -->
<template>
  <div class="maint-form">
    <h2>Request Maintenance</h2>

    <form @submit.prevent="submitRequest" enctype="multipart/form-data">
      <div class="form-group">
        <label>Description of Issue</label>
        <textarea v-model="request.description" required></textarea>
      </div>

      <div class="form-group">
        <label>Upload Inspection PDF</label>
        <input type="file" accept="application/pdf" @change="onFileChange" required />
      </div>

      <button type="submit">Submit Request</button>

      <p class="note">This request will be reviewed by your Fleet Manager.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const plateNumber = localStorage.getItem('plateNumber') || ''
const request = ref({
  description: '',
  file: null,
})

function onFileChange(e) {
  request.value.file = e.target.files[0]
}

function submitRequest() {
  if (!plateNumber) {
    alert('Plate number missing. Please log in again.')
    return
  }

  if (!request.value.file) {
    alert('Please upload an inspection PDF.')
    return
  }

  // Simulate backend call
  console.log('Maintenance Request:', {
    plateNumber,
    description: request.value.description,
    file: request.value.file.name,
  })

  alert('✅ Maintenance request submitted (simulation).')

  // Reset
  request.value = { description: '', file: null }
  document.querySelector('input[type=file]').value = ''
}
</script>

<style scoped>
.maint-form {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  max-width: 600px;
  margin: 2rem auto;
  box-shadow: 0 0 12px rgba(0,0,0,0.05);
}

h2 {
  color: #1a237e;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  font-weight: 600;
  display: block;
  margin-bottom: .5rem;
}

textarea, input {
  width: 100%;
  padding: .6rem;
  border: 1px solid #ccc;
  border-radius: .5rem;
}

button {
  margin-top: 1rem;
  padding: .7rem 1.5rem;
  background: #1a237e;
  color: #fff;
  border: none;
  border-radius: .5rem;
  cursor: pointer;
  font-weight: 600;
}
button:hover {
  background: #0d1644;
}

.note {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #777;
}
</style>
