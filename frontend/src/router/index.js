import { createRouter, createWebHistory } from 'vue-router'
import SelectRole from '../pages/SelectRole.vue'
import LoginOwner from '../pages/Login.vue'
import Dashboard from '../pages/Dashboard.vue'
import RequestFuelForm from '../components/RequestFuelForm.vue'
import RequestMaintenance from '../components/RequestMaintenance.vue'
import ConditionUpdateForm from '../components/ConditionUpdateForm.vue'

const routes = [
  { path: '/', component: SelectRole },
  { path: '/login-owner', component: LoginOwner },
  { path: '/dashboard', component: Dashboard },
  { path: '/request-fuel', component: RequestFuelForm },
  { path: '/request-maintenance', component: RequestMaintenance },
  { path: '/update-condition', component: ConditionUpdateForm },
  { path: '/login-manager', component: () => import('../pages/LoginManager.vue') },
  { path: '/manager-dashboard', component: () => import('../pages/ManagerDashboard.vue') },
  { path: '/login-admin', component: () => import('../pages/LoginAdmin.vue') },
  { path: '/admin-dashboard', component: () => import('../pages/AdminDashboard.vue') },
  { path: '/login-auditor', component: () => import('../pages/LoginAuditor.vue') },
  { path: '/auditor-dashboard', component: () => import('../pages/AuditorDashboard.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
