import { createApp } from 'vue'
import 'virtual:svg-icons-register'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/reset.css'
import { useSvgIcon } from '@/plugins/iconSvg'

const app = createApp(App)

useSvgIcon(app)

app.use(router).use(store).mount('#app')
