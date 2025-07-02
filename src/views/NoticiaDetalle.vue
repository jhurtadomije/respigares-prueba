<!-- src/views/NoticiaDetalle.vue -->
<template>
  <section class="noticia-detalle contenedor animated fade-in">
    <h1 class="noticia-detalle__titulo">{{ noticia?.title || 'Noticia no encontrada' }}</h1>
    <p v-if="noticia" class="noticia-detalle__fecha">{{ noticia.date }}</p>
    <p v-if="noticia" class="noticia-detalle__lead">{{ noticia.lead }}</p>

    <div v-if="noticia" class="noticia-detalle__content">
      <p v-for="(p, i) in noticia.content" :key="i">{{ p }}</p>
    </div>

    <p v-if="noticia" class="noticia-detalle__fuente">
      Fuente:
      <a :href="noticia.source" target="_blank" rel="noopener">{{ noticia.source }}</a>
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
    const base = import.meta.env.BASE_URL
    const res = await fetch(`${base}posts.json`)
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
  margin: 2.5rem auto;
  padding: 1.5rem 1rem;
  color: var(--color-gray);
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 14px #0001;
  line-height: 1.6;
  animation: fadeIn 1.1s cubic-bezier(.8,.1,.1,1);
}

.noticia-detalle__titulo {
  font-size: 2.3rem;
  color: var(--color-main);
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 900;
  line-height: 1.1;
}
.noticia-detalle__fecha {
  font-size: 1rem;
  color: #707070;
  text-align: center;
  margin-bottom: 1.5rem;
}
.noticia-detalle__lead {
  font-size: 1.18rem;
  font-weight: bold;
  margin-bottom: 1.25rem;
  color: #353535;
}
.noticia-detalle__content p {
  margin-bottom: 1.1rem;
  font-size: 1.08rem;
}

.noticia-detalle__fuente {
  font-size: 0.98rem;
  margin-top: 2.2rem;
  color: #999;
}
.noticia-detalle__fuente a {
  color: var(--color-main);
  text-decoration: underline;
  word-break: break-all;
}

@media (max-width: 700px) {
  .noticia-detalle {
    padding: 1.1rem 0.3rem;
    border-radius: 7px;
    margin: 1rem 0;
  }
  .noticia-detalle__titulo {
    font-size: 1.35rem;
  }
  .noticia-detalle__lead {
    font-size: 1rem;
  }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px);}
  to   { opacity: 1; transform: none;}
}
</style>
