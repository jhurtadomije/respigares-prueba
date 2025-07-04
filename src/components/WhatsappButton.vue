<template>
  <a
    class="whatsapp-float-btn"
    :class="{ pulse: animar }"
    :href="`https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`"
    target="_blank"
    rel="noopener"
    aria-label="Contactar por WhatsApp"
    @animationend="animar = false"
  >
    <svg width="55" height="55" viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#25d366"/>
      <path d="M23.49 19.85l-2.17-.62a1.12 1.12 0 0 0-1.09.29l-.46.47a9.18 9.18 0 0 1-4.35-4.36l.47-.45a1.11 1.11 0 0 0 .29-1.09l-.62-2.17A1.13 1.13 0 0 0 13.4 11h-2.23A1.18 1.18 0 0 0 10 12.18 10.79 10.79 0 0 0 21.82 24a1.18 1.18 0 0 0 1.18-1.18v-2.24a1.13 1.13 0 0 0-.8-1.07z" fill="#fff"/>
    </svg>
  </a>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const telefono = "34678551801"
const mensaje  = "Hola! Me gustaría pedir información sobre productos de Respigares."
const animar = ref(false)
let intervalo = null

onMounted(() => {
  // Ejecuta animación pulse cada 7 segundos
  intervalo = setInterval(() => {
    animar.value = false // Reset (por si sigue en true)
    // Activa animación (trigger class .pulse)
    setTimeout(() => animar.value = true, 80)
  }, 7000)
})
onUnmounted(() => {
  clearInterval(intervalo)
})
</script>

<style scoped>
.whatsapp-float-btn {
  position: fixed;
  left: 3rem;           
  bottom: 5.4em;
  z-index: 3333;
  background: none;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 18px #0002;
  cursor: pointer;
  opacity: 0.93;
  transition: opacity .17s, transform .18s;
}
.whatsapp-float-btn:hover {
  opacity: 1;
  transform: scale(1.08);
}
.whatsapp-float-btn.pulse {
  animation: pulse 1.1s cubic-bezier(.4,0,.6,1);
}
@keyframes pulse {
  0% { transform: scale(1);}
  20% { transform: scale(1.13);}
  35% { transform: scale(0.98);}
  55% { transform: scale(1.18);}
  70% { transform: scale(0.96);}
  100% { transform: scale(1);}
}
@media (max-width: 700px) {
  .whatsapp-float-btn {
    width: 40px;
    height: 40px;
    left: 0.7em;        
    bottom: 4.3em;
  }
}
</style>
