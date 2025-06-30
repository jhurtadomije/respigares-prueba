// src/directives/scrollFullReveal.js
import { nextTick } from 'vue'

export default {
  mounted(el) {
    // Estado inicial: oculto y desplazado
    el.classList.add('before-reveal')

    nextTick(() => {
      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          // Sólo cuando esté completamente en vista
          if (entry.intersectionRatio === 1) {
            el.classList.remove('before-reveal')
            // Aplica fade-in
            el.classList.add('animated', 'fade-in-slow')
            obs.unobserve(el)
          }
        })
      }, {
        threshold: 1.0,     // 100 % visible
        rootMargin: '0px'
      })

      observer.observe(el)
    })
  }
}
