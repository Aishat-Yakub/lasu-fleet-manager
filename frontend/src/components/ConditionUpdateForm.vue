<template>
  <div class="condition-update">
    <h2>Update Vehicle Condition</h2>

    <form @submit.prevent="submitUpdate" enctype="multipart/form-data">
      <div class="form-group">
        <label>Description (optional)</label>
        <textarea v-model="desc" placeholder="Describe any fixes or changes"></textarea>
      </div>

      <div class="form-group">
        <label>Upload New Inspection PDF</label>
        <input type="file" @change="onFileChange" accept="application/pdf" required />
      </div>

      <button type="submit">Submit Update</button>

      <p class="note">Your Fleet Manager will review and approve your update before any further requests.</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const plateNumber = localStorage.getItem('plateNumber') || ''
const desc = ref('')
const file = ref(null)

function onFileChange(e) {
  file.value = e.target.files[0]
}

function submitUpdate() {
  if (!file.value) {
    alert('Please upload a new inspection PDF.')
    return
  }

  if (!plateNumber) {
    alert('Plate number not found. Please log in again.')
    return
  }

  // Simulated submission
  console.log('Condition Update:', {
    plateNumber,
    description: desc.value,
    file: file.value.name
  })

  alert('✅ Update submitted (simulation). Awaiting Fleet Manager approval.')

  // Reset form
  desc.value = ''
  file.value = null
  document.querySelector('input[type=file]').value = ''
}
</script>

<style scoped>
.condition-update {
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
