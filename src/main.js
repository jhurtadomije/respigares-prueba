import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import scrollRandomReveal from './directives/scrollRandomReveal'

import './assets/style.css'

const app = createApp(App)
app.directive('scroll-random-reveal', scrollRandomReveal)
app.use(router)
app.mount('#app')
