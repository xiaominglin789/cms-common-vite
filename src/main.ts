import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'
import './styles/import.scss'
import App from './App.vue'
import router from './router'
import { useSvgIcon } from '@/plugins/iconSvg'
import './permission'
import 'element-plus/es/components/message/style/css'

const app = createApp(App)

useSvgIcon(app)

app.use(router).use(createPinia()).mount('#app')
