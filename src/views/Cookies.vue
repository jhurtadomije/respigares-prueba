<template>
  <div v-if="showCookies" class="cookies-modal-backdrop">
    <div class="cookies-modal" role="dialog" aria-modal="true" aria-labelledby="cookieTitle">
      <h2 id="cookieTitle">Tu privacidad es importante</h2>
      <div class="cookies-info">
        <p>
          Utilizamos cookies propias y de terceros para fines analíticos y para mostrarte publicidad personalizada según un perfil elaborado a partir de tus hábitos de navegación. 
          <a 
          href="/politica-cookies" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label="Leer la Política de cookies de Respigares">
          Política de cookies
          </a>.
        </p>
        <ul>
          <li><b>Cookies técnicas</b> (siempre activas): necesarias para el funcionamiento básico.</li>
          <li><b>Cookies de análisis y personalización</b>: nos ayudan a mejorar la web.</li>
          <li><b>Cookies publicitarias</b>: personalizan la publicidad.</li>
        </ul>
      </div>
      <div class="cookies-modal-actions">
        <button class="btn-cookies-all" @click="acceptAll">Aceptar todas</button>
        <button class="btn-cookies-tech" @click="rejectAll">Rechazar todas</button>
        <button class="btn-cookies-config" @click="configOpen = true">Configurar</button>
      </div>
    </div>

    <!-- Modal de configuración -->
    <div v-if="configOpen" class="cookies-config-modal" role="dialog" aria-modal="true">
      <h3>Configurar cookies</h3>
      <label><input type="checkbox" disabled checked /> Cookies técnicas (obligatorias)</label>
      <label>
        <input type="checkbox" v-model="analytics" /> Cookies de análisis
      </label>
      <label>
        <input type="checkbox" v-model="ads" /> Cookies publicitarias
      </label>
      <div class="cookies-modal-actions">
        <button class="btn-cookies-all" @click="saveConfig">Guardar preferencias</button>
        <button class="btn-cookies-tech" @click="configOpen = false">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { showCookies, configOpen } from '../cookiesState'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['accepted'])

const analytics = ref(false)
const ads = ref(false)
const router = useRouter()

onMounted(() => {
  const c = localStorage.getItem('cookies_consent')
  if (!c) showCookies.value = true
})

function acceptAll() {
  localStorage.setItem('cookies_consent', JSON.stringify({ tech: true, analytics: true, ads: true }))
  showCookies.value = false
  emit('accepted')
  router.push('/')
}

function rejectAll() {
  localStorage.setItem('cookies_consent', JSON.stringify({ tech: true, analytics: false, ads: false }))
  showCookies.value = false
  emit('accepted')
  router.push('/')
}

function saveConfig() {
  localStorage.setItem('cookies_consent', JSON.stringify({ tech: true, analytics: analytics.value, ads: ads.value }))
  showCookies.value = false
  configOpen.value = false
  emit('accepted')
  router.push('/')
}
</script>

<style scoped>
.cookies-modal-backdrop {
  position: fixed;
  z-index: 2222;
  inset: 0;
  background: #000a;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadein .35s;
}

/* --- MOBILE FIRST --- */
.cookies-modal,
.cookies-config-modal {
  background: #fff;
  width: 98vw;
  max-width: 500px;
  min-width: 0;
  border-radius: 10px;
  padding: 1.1rem 0.7rem 0.8rem;
  box-shadow: 0 6px 44px #0002;
  color: #443;
  text-align: center;
  position: relative;
  animation: modalWowIn 0.88s cubic-bezier(.22,1.11,.4,1.01);
  max-height: 92vh;
  overflow-y: auto;
  margin: 4vw auto;
}
.cookies-modal h2 {
  color: var(--color-main, #ab0a3d);
  font-size: 1.03rem;
  margin-bottom: .6rem;
  font-weight: 900;
}
.cookies-info ul {
  text-align: left;
  margin: 0.7rem 0 1rem 0;
  padding-left: 1.3rem;
  font-size: 1em;
}
.cookies-modal-actions {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
  margin-top: .7rem;
}
.btn-cookies-all,
.btn-cookies-tech,
.btn-cookies-config {
  padding: 0.68em 1.5em;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 14px #ab0a3d19;
  transition: background 0.17s, color 0.17s;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
}
.btn-cookies-all {
  background: var(--color-main, #ab0a3d);
  color: #fff;
}
.btn-cookies-all:hover { background: #7b0729; }
.btn-cookies-tech, .btn-cookies-config {
  background: #e4e7ea;
  color: #ab0a3d;
}
.btn-cookies-tech:hover, .btn-cookies-config:hover {
  background: #fff7e7;
  color: #533;
  border: 1px solid #ab0a3d55;
}
.cookies-config-modal {
  margin-top: 1.2rem;
  padding-top: 1.1rem;
}
.cookies-config-modal label {
  display: block;
  text-align: left;
  margin: .8em 0;
  font-size: 1em;
  cursor: pointer;
}
.cookies-modal *,
.cookies-config-modal * {
  box-sizing: border-box;
  word-break: break-word;
}

/* --- ESCRITORIO --- */
@media (min-width: 600px) {
  .cookies-modal,
  .cookies-config-modal {
    width: 94vw;
    padding: 2rem 1.5rem 1rem;
    font-size: 1.04em;
    border-radius: 16px;
    max-width: 500px;
  }
  .cookies-modal-actions {
    flex-direction: row;
    gap: 1rem;
  }
  .btn-cookies-all,
  .btn-cookies-tech,
  .btn-cookies-config {
    width: auto;
    max-width: 220px;
    margin: 0;
  }
  .cookies-modal h2 {
    font-size: 1.18rem;
  }
  .cookies-config-modal h3 {
    font-size: 1.09rem;
  }
}

/* --- Animaciones --- */
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes modalWowIn {
  from {
    opacity: 0;
    transform: scale(0.82) rotate(-8deg);
    filter: blur(7px) brightness(1.3);
  }
  80% {
    opacity: 1;
    transform: scale(1.03) rotate(1.3deg);
    filter: blur(0px) brightness(1);
  }
  to {
    opacity: 1;
    transform: scale(1) rotate(0deg);
    filter: blur(0px) brightness(1);
  }
}
</style>
