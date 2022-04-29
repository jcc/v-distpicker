import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
import VDistpicker from '@/Distpicker'
app.component('VDistpicker', VDistpicker)

app.mount('#app')
