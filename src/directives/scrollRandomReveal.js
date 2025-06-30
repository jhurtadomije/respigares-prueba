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
    // Prepara estado inicial oculto
    el.classList.add('before-reveal')

    // Espera a que el DOM pinte
    nextTick(() => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Elige un efecto al azar
            const effect = EFFECTS[Math.floor(Math.random() * EFFECTS.length)]
            // Añade clases para animar
            el.classList.add('animated', effect)
            // Remueve estado inicial
            el.classList.remove('before-reveal')
            // Ya no hace falta observarlo más
            obs.unobserve(el)
          }
        })
      }, {
        threshold: 0.6
      })

      observer.observe(el)
    })
  }
}
