<template>
  <div v-if="show" class="cookies-modal-backdrop">
    <div class="cookies-modal">
      <h2>Política de Cookies</h2>
      <div class="cookies-scroll">
        <p>
          Esta web utiliza cookies, tanto propias como de terceros. Una cookie es un fichero...
          <!-- ... El resto del texto hasta "Cookies que se utilizan" ... -->
        </p>
        <!-- Puedes pegar aquí el resto del texto (ocúltalo con un v-if más adelante si lo prefieres) -->
        <details class="cookies-details">
          <summary>Ver política completa</summary>
          <div>
            <!-- Aquí copia todo el contenido que tenías en tu página (listas, tablas, etc) -->
            <!-- Puedes usar <component :is="'section'"> ... </component> para dividir si lo prefieres -->
            <slot />
          </div>
        </details>
      </div>
      <div class="cookies-modal-actions">
        <button class="btn-cookies-all" @click="acceptAll">Aceptar todas las cookies</button>
        <button class="btn-cookies-tech" @click="acceptTech">Aceptar solo técnicas</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const show = ref(false)

onMounted(() => {
  // Si ya ha aceptado, no mostrar el modal
  const c = localStorage.getItem('cookies_consent')
  if (!c) show.value = true
})

function acceptAll() {
  localStorage.setItem('cookies_consent', 'all')
  show.value = false
  // Aquí puedes disparar evento/emit/callback para activar Google Analytics o similares
}

function acceptTech() {
  localStorage.setItem('cookies_consent', 'tech')
  show.value = false
  // Aquí podrías bloquear/limpiar cookies no técnicas si ya existían
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
.cookies-modal {
  background: #fff;
  max-width: 530px;
  width: 94vw;
  border-radius: 15px;
  padding: 2.2rem 1.5rem 1.3rem;
  box-shadow: 0 6px 44px #0002;
  position: relative;
  color: #443;
}
.cookies-modal h2 {
  color: var(--color-main, #ab0a3d);
  font-size: 1.25rem;
  margin-bottom: .9rem;
  text-align: center;
  font-weight: 900;
}
.cookies-scroll {
  max-height: 260px;
  overflow-y: auto;
  font-size: 1.01rem;
  margin-bottom: 1.5rem;
}
.cookies-modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: .4rem;
}
.btn-cookies-all,
.btn-cookies-tech {
  padding: 0.72em 1.7em;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 22px;
  border: none;
  cursor: pointer;
  box-shadow: 0 2px 14px #ab0a3d19;
  transition: background 0.17s, color 0.17s;
}
.btn-cookies-all {
  background: var(--color-main, #ab0a3d);
  color: #fff;
}
.btn-cookies-all:hover { background: #7b0729; }
.btn-cookies-tech {
  background: #e4e7ea;
  color: #ab0a3d;
}
.btn-cookies-tech:hover {
  background: #fff7e7;
  color: #533;
  border: 1px solid #ab0a3d55;
}
.cookies-details summary {
  font-weight: bold;
  color: #ab0a3d;
  cursor: pointer;
  padding: .4em 0;
}
.cookies-details[open] summary {
  color: #7b0729;
}
.cookies-details {
  margin-top: .6em;
}
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
