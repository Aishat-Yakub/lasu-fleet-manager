import { createRouter, createWebHistory } from 'vue-router'

// Role selection and logins
import SelectRole from '../pages/SelectRole.vue'
import LoginOwner from '../pages/Login.vue'
import LoginManager from '../pages/LoginManager.vue'
import LoginAdmin from '../pages/LoginAdmin.vue'
import LoginAuditor from '../pages/LoginAuditor.vue'

// Dashboards
import Dashboard from '../pages/Dashboard.vue'
import ManagerDashboard from '../pages/ManagerDashboard.vue'
import AdminDashboard from '../pages/AdminDashboard.vue'
import AuditorDashboard from '../pages/AuditorDashboard.vue'

// Requests (Owner)
import RequestFuelForm from '../components/RequestFuelForm.vue'
import RequestMaintenance from '../components/RequestMaintenance.vue'
import ConditionUpdateForm from '../components/ConditionUpdateForm.vue'

// Add Forms (Admin)
import AddVehicleForm from '../components/AddVehicleForm.vue'
import AddFleetManagerForm from '../components/AddFleetManagerForm.vue'
import AddAuditorForm from '../components/AddAuditorForm.vue'

// Tables and Lists (Admin)
import FleetManagerList from '../components/FleetManagerList.vue'
import AuditorList from '../components/AuditorList.vue'
import VehicleList from '../components/VehicleList.vue'
import FuelRequestTable from '../components/FuelRequestTable.vue'
import MaintenanceRequestTable from '../components/MaintenanceRequestTable.vue'
import ConditionUpdateTable from '../components/ConditionUpdateTable.vue'

const routes = [
  // Login and Roles
  { path: '/', component: SelectRole },
  { path: '/login-owner', component: LoginOwner },
  { path: '/login-manager', component: LoginManager },
  { path: '/login-admin', component: LoginAdmin },
  { path: '/login-auditor', component: LoginAuditor },

  // Dashboards
  { path: '/dashboard', component: Dashboard },
  { path: '/manager-dashboard', component: ManagerDashboard },
  { path: '/admin-dashboard', component: AdminDashboard },
  { path: '/auditor-dashboard', component: AuditorDashboard },

  // Owner Requests
  { path: '/request-fuel', component: RequestFuelForm },
  { path: '/request-maintenance', component: RequestMaintenance },
  { path: '/update-condition', component: ConditionUpdateForm },

  // Admin Add Forms
  { path: '/add-vehicle', component: AddVehicleForm },
  { path: '/add-fleet-manager', component: AddFleetManagerForm },
  { path: '/add-auditor', component: AddAuditorForm },

  // Admin Tables & Lists
  { path: '/fleet-manager-list', component: FleetManagerList },
  { path: '/auditor-list', component: AuditorList },
  { path: '/vehicle-list', component: VehicleList },
  { path: '/fuel-request-table', component: FuelRequestTable },
  { path: '/maintenance-request-table', component: MaintenanceRequestTable },
  { path: '/condition-updates-table', component: ConditionUpdateTable }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
