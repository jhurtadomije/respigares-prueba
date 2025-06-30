<!-- src/views/NoticiaDetalle.vue -->
<template>
  <section class="noticia-detalle contenedor">
    <h1 class="noticia-detalle__titulo">{{ noticia?.title || 'Noticia no encontrada' }}</h1>
    <p v-if="noticia" class="noticia-detalle__fecha">{{ noticia.date }}</p>
    <p v-if="noticia" class="noticia-detalle__lead">{{ noticia.lead }}</p>

    <div v-if="noticia" class="noticia-detalle__content">
      <p v-for="(p, i) in noticia.content" :key="i">{{ p }}</p>
    </div>

    <p v-if="noticia" class="noticia-detalle__fuente">
      Fuente: <a :href="noticia.source" target="_blank" rel="noopener">{{ noticia.source }}</a>
    </p>

    <p v-else>Lo sentimos, no hemos encontrado esa noticia.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug  = route.params.slug
const noticia = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/posts.json')
    if (!res.ok) throw new Error('No se pudo cargar posts.json')
    const all = await res.json()
    noticia.value = all.find(n => n.slug === slug) || null
  } catch (e) {
    console.error(e)
  }
})
</script>

<style scoped>
.noticia-detalle {
  max-width: 800px;
  margin: 4rem auto;
  padding: 0 1rem;
  color: var(--color-gray);
  line-height: 1.6;
}

.noticia-detalle__titulo {
  font-size: 2.5rem;
  color: var(--color-main);
  text-align: center;
  margin-bottom: 0.5rem;
}

.noticia-detalle__fecha {
  font-size: 0.95rem;
  color: #707070;
  text-align: center;
  margin-bottom: 2rem;
}

.noticia-detalle__lead {
  font-size: 1.15rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.noticia-detalle__content p {
  margin-bottom: 1.25rem;
}

.noticia-detalle__fuente {
  font-size: 0.9rem;
  margin-top: 2rem;
}

.noticia-detalle__fuente a {
  color: var(--color-main);
  text-decoration: underline;
}
</style>
