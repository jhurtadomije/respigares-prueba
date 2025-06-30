// src/directives/scrollRandomReveal.js
import { nextTick } from 'vue'

const EFFECTS = [
  'fade-in',
  'slide-in-left',
  'slide-in-right',
  'zoom-in',
  'rotate-in'
]

export default {
  mounted(el) {
    // Estado inicial: oculto + desplazado
    el.classList.add('before-reveal')

    nextTick(() => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Quita el estado oculto
            el.classList.remove('before-reveal')
            // Aplica un efecto aleatorio
            const effect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
            el.classList.add('animated', effect)
            // Ya no necesitamos observarlo más
            obs.unobserve(el)
          }
        })
      }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',  // disparamos justo cuando salga un 10% del bottom
        threshold: 0                     // con cualquier píxel visible
      })

      observer.observe(el)
    })
  }
}
