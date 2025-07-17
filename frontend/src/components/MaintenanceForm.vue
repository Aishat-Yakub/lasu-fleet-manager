<template>
  <div class="maint-form">
    <h2>Submit Maintenance Request</h2>

    <!-- Excessive‑requests warning -->
    <div v-if="warning" class="warning">
      ⚠️ {{ warning }}
    </div>

    <form @submit.prevent="submitRequest" enctype="multipart/form-data">
      <div class="form-group">
        <label for="vehicle">Vehicle</label>
        <select id="vehicle" v-model="req.vehicleId" required>
          <option disabled value="">Select a vehicle</option>
          <option v-for="v in vehicles" :key="v.id" :value="v.id">
            {{ v.plateNumber }} ({{ v.department }})
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="description">Description of Issue</label>
        <textarea
          id="description"
          v-model="req.description"
          required
          placeholder="Describe the issue..."
        ></textarea>
      </div>

      <div class="form-group">
        <label for="amount">Amount Requested (₦)</label>
        <input
          id="amount"
          type="number"
          v-model.number="req.amount"
          min="1"
          required
        />
      </div>

      <div class="form-group">
        <label for="date">Date of Request</label>
        <input
          id="date"
          type="date"
          v-model="req.date"
          required
        />
      </div>

      <div class="form-group">
        <label for="proof">Upload Inspection PDF</label>
        <input
          id="proof"
          type="file"
          @change="onFileChange"
          accept="application/pdf"
          required
        />
      </div>

      <button type="submit">Submit Request</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

// Reactive form state
const req = ref({
  vehicleId: '',
  description: '',
  amount: '',
  date: '',
  file: null
})

const vehicles = ref([])
const warning = ref('')

// Fetch vehicles for dropdown
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3001/api/vehicles')
    vehicles.value = res.data
  } catch (err) {
    console.error('Vehicle load failed:', err)
  }
})

// Capture selected file
function onFileChange(e) {
  req.value.file = e.target.files[0]
}

// Submit maintenance request
async function submitRequest() {
  if (!req.value.file) {
    alert('Please upload a PDF proof.')
    return
  }

  const formData = new FormData()
  formData.append('vehicleId', req.value.vehicleId)
  formData.append('description', req.value.description)
  formData.append('amount', req.value.amount)
  formData.append('date', req.value.date)
  formData.append('proof', req.value.file)

  try {
    const res = await axios.post(
      'http://localhost:3001/api/maintenance',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    warning.value = res.data.warning || ''
    if (!warning.value) {
      alert('✅ Maintenance request submitted.')
    }
    // Reset form
    req.value = { vehicleId: '', description: '', amount: '', date: '', file: null }
    document.getElementById('proof').value = ''
  } catch (e) {
    console.error(e)
    alert('❌ Failed to submit maintenance request.')
  }
}
</script>

<style scoped lang="scss">
.maint-form {
  background: #fff;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin: 2rem auto;
  max-width: 600px;

  h2 {
    color: #1a237e;
    margin-bottom: 1rem;
  }

  .warning {
    background: #fff3cd;
    color: #856404;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
  }

  .form-group {
    margin-bottom: 1rem;

    label {
      display: block;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    input,
    select,
    textarea {
      width: 100%;
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
    transition: background 0.3s;

    &:hover {
      background: #0d1644;
    }
  }
}
</style>
