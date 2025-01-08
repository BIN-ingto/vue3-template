import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/base.scss'
import { useTheme } from '@/hooks/theme'

useTheme().initTheme()
setTimeout(() => {
	createApp(App).use(router).mount('#SviAnL')
}, 500)
