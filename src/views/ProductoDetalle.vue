<template>
  <section class="detalle-producto contenedor">
    <h2>{{ producto?.nombre }}</h2>
    <div v-if="imagenes.length" class="imagenes-galeria">
      <img v-for="(img, idx) in imagenes" :src="img" :key="idx" :alt="producto.nombre" />
    </div>
    <div class="descripcion" v-html="descripcionSaneada"></div>
    <router-link to="/catalogo" class="btn-volver">← Volver al catálogo</router-link>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const producto = ref(null)
const imagenes = ref([])

// Función para sanear descripción (opcional, elimina scripts y tags peligrosos)
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

function slugify(str) {
  return str
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
}

onMounted(async () => {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}productos.json`)
    if (!res.ok) throw new Error('No se pudo cargar productos.json')
    const lista = await res.json()
    const paramNombre = decodeURIComponent(route.params.nombre)
    producto.value = lista.find(p => p.nombre === paramNombre)

    // Aquí la gestión de imágenes:
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
.imagenes-galeria img {
  width: 180px;
  height: 180px;
  object-fit: contain;
  border-radius: 12px;
  background: #f5f5f5;
  box-shadow: 0 2px 16px #0001;
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
  margin-bottom: 2rem;
  background: var(--color-main);
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
  background: var(--color-light);
  box-shadow: 0 2px 12px #0002;
}
</style>
