import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import App from './App.vue'
import router from './router'


import scrollRandomReveal from './directives/scrollRandomReveal'
import scrollFullReveal   from './directives/scrollFullReveal'

import './assets/style.css'

const app = createApp(App)
const head = createHead()
app.directive('scroll-random-reveal', scrollRandomReveal)
app.directive('scroll-full-reveal', scrollFullReveal)
app.use(head)
app.use(router)
app.mount('#app')
