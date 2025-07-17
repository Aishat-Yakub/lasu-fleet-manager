import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // ✅ VERY IMPORTANT
import './assets/styles/main.scss'

const app = createApp(App)
app.use(router)               // ✅ MOUNT ROUTER
app.mount('#app')
