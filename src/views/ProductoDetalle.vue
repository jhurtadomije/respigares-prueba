<template>
  <section class="detalle-producto contenedor animate-fadein">
    <h2 class="animate-title">{{ producto?.nombre }}</h2>
    <div v-if="imagenes.length" class="imagenes-galeria">
      <img
        v-for="(img, idx) in imagenes"
        :src="img"
        :key="idx"
        :alt="producto.nombre"
        @click="abrirModal(img)"
        class="img-galeria animate-img"
        tabindex="0"
        @keyup.enter="abrirModal(img)"
        :style="`--delay: ${idx * 50}ms`"
      />
    </div>
    <div class="descripcion animate-fadein-delay" v-html="descripcionSaneada"></div>
    <router-link to="/catalogo" class="btn-volver animate-fadein-delay">← Volver al catálogo</router-link>

    <!-- Modal de imagen grande -->
    <div v-if="modalVisible" class="modal" @click.self="cerrarModal">
      <span class="cerrar-modal" @click="cerrarModal" tabindex="0" @keyup.enter="cerrarModal">&times;</span>
      <div class="modal-content modal-anim">
        <div class="modal-nombre">{{ producto?.nombre }}</div>
        <img :src="imagenModal" class="modal-img" :alt="producto?.nombre" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const producto = ref(null)
const imagenes = ref([])

const modalVisible = ref(false)
const imagenModal = ref('')

function abrirModal(img) {
  imagenModal.value = img
  modalVisible.value = true
}
function cerrarModal() {
  modalVisible.value = false
}

function sanitize(html) {
  return html
    .replace(/<script.*?>.*?<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/g, '')
}

const descripcionSaneada = computed(() =>
  producto.value?.descripcion
    ? sanitize(producto.value.descripcion)
    : ''
)

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}productos.json`)
    if (!res.ok) throw new Error('No se pudo cargar productos.json')
    const lista = await res.json()
    const paramNombre = decodeURIComponent(route.params.nombre)
    producto.value = lista.find(p => p.nombre === paramNombre)

    if (producto.value) {
      if (Array.isArray(producto.value.imagen)) {
        imagenes.value = producto.value.imagen
      } else if (typeof producto.value.imagen === 'string') {
        imagenes.value = [producto.value.imagen]
      } else {
        imagenes.value = []
      }
    }
  } catch (e) {
    console.error("ERROR al cargar productos.json:", e)
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(35px);}
  to   { opacity: 1; transform: none;}
}
@keyframes fadeInTitle {
  from { opacity: 0; transform: translateY(14px);}
  to   { opacity: 1; transform: none;}
}
@keyframes fadeInImg {
  from { opacity: 0; transform: scale(.94) translateY(16px);}
  to   { opacity: 1; transform: none;}
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

/* Fadein principal */
.animate-fadein {
  animation: fadeIn .98s cubic-bezier(.8,.1,.1,1);
}
.animate-fadein-delay {
  animation: fadeIn 1.4s cubic-bezier(.8,.1,.1,1) .25s both;
}
.animate-title {
  animation: fadeInTitle .8s cubic-bezier(.8,.1,.1,1);
}
.animate-img {
  animation: fadeInImg 0.64s cubic-bezier(.8,.1,.1,1) both;
  animation-delay: var(--delay, 0ms);
}
.modal-content.modal-anim {
  animation: modalWowIn 0.88s cubic-bezier(.22,1.11,.4,1.01);
}

.detalle-producto {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 680px;
  margin: 7rem auto 4rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 6px 40px #0002;
}
.imagenes-galeria {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  justify-content: center;
}
.img-galeria {
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 12px;
  background: #f5f5f5;
  box-shadow: 0 2px 16px #0001;
  cursor: pointer;
  transition: transform 0.18s, box-shadow 0.22s, filter 0.22s;
}
.img-galeria:hover,
.img-galeria:focus {
  transform: scale(1.09) translateY(-7px) rotate(-1.5deg);
  box-shadow: 0 12px 36px #28528122, 0 2px 18px #ab0a3d12;
  outline: 2px solid var(--color-main, #285281);
  filter: brightness(1.09) saturate(1.08);
}
.descripcion {
  font-size: 1.1rem;
  color: #252525;
  margin-top: 2rem;
  line-height: 1.6;
  word-break: break-word;
}
.btn-volver {
  display: inline-block;
  margin: 2.5rem auto 0 auto;
  background: var(--color-main, #285281);
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 1px 6px #0002;
  transition: background .2s, box-shadow .2s;
  text-decoration: none;
}
.btn-volver:hover {
  background: var(--color-light, #4e75a9);
  box-shadow: 0 2px 12px #0002;
}

/* MODAL */
.modal {
  position: fixed;
  z-index: 9999;
  inset: 0;
  background: #000a;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modalIn 1s cubic-bezier(.8,.1,.1,1);
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff0;
}
.modal-nombre {
  font-size: 1.18rem;
  color: #fff;
  background: #1c2940cc;
  border-radius: 10px 10px 0 0;
  padding: 1rem 2rem 0.5rem 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 8px #000b;
}
.modal-img {
  max-width: 82vw;
  max-height: 82vh;
  border-radius: 0 0 14px 14px;
  background: #fff;
  box-shadow: 0 8px 32px #0004;
  border: 4px solid #fff;
}
.cerrar-modal {
  position: absolute;
  top: 6vh;
  right: 7vw;
  font-size: 2.5rem;
  color: #fff;
  cursor: pointer;
  z-index: 10000;
  text-shadow: 0 2px 8px #000a;
  transition: color 0.2s;
}
.cerrar-modal:hover,
.cerrar-modal:focus {
  color: #ff5555;
  outline: none;
}
</style>
