<template>
  <!-- Cabecera visual con imagen de fondo -->
  <div class="section-hero">
    <img src="/img/hero-blog.jpg" alt="Blog Respigares" class="section-hero-img" />
    <div class="section-title-tab animate-fadein">
      <h1>Blog</h1>
    </div>
  </div>
  
  <div class="page-wrap">
    <div v-if="posts.length">
      <BlogPreview :posts="posts" :showTitle="false" />
    </div>
    <p v-else class="loading-posts">Cargando noticias…</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import BlogPreview  from '../components/BlogPreview.vue'
import { useHead } from '@vueuse/head'

const posts = ref([])

onMounted(async () => {
  const base = import.meta.env.BASE_URL
  const res  = await fetch(`${base}posts.json`)
  if (res.ok) {
    posts.value = await res.json()
  } else {
    console.error('No se pudo cargar posts.json en', `${base}posts.json`)
  }
})

useHead({
  title: 'Blog y Novedades | Respigares',
  meta: [
    { name: 'description', content: 'Actualidad, novedades, consejos y noticias sobre productos gourmet, distribución y alimentación en Andalucía. Síguenos en el blog de Respigares.' },
    { property: 'og:title', content: 'Blog y Novedades | Respigares' },
    { property: 'og:description', content: 'Descubre noticias, eventos y tendencias en el sector alimentación de la mano de Respigares.' },
    { property: 'og:image', content: 'https://www.respigares.es/img/hero-catalogo.jpg' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.respigares.es/blog' }
  ]
})

</script>

<style scoped>
/* Hero cabecera */
.section-hero {
  position: relative;
  width: 100vw;
  min-height: 14vw;
  max-height: 20em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0;
}
.section-hero-img {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(1.05) saturate(1.05);
  pointer-events: none;
  user-select: none;
}
.section-title-tab {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 1.3em 1.3em 0 0;
  padding: 1.5em 2em 0.8em 2em;
  min-width: 8em;
  margin-bottom: -1.3em;
  margin-top: 2em;
  box-shadow: 0 0.1em 1em #0001;
  display: flex;
  justify-content: center;
}
.section-title-tab h1 {
  color: #ab0a3d;
  font-size: 2.7rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
  letter-spacing: 0.01em;
}
@media (max-width: 700px) {
  .section-hero-img { min-height: 110px; }
  .section-title-tab { padding: 0.9em 0.5em 0.7em 0.5em; }
  .section-title-tab h1 { font-size: 1.5rem; }
}
/* Animación aparición */
.animate-fadein {
  animation: aparecer 1.25s cubic-bezier(.8,.1,.1,1);
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(35px);}
  to   { opacity: 1; transform: none;}
}
/* Main content */
.page-wrap {
  margin-top: 80px;
  padding: 2.5rem 0 2rem 0;
  background: #fff;
  min-height: 70vh;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.loading-posts {
  text-align: center;
  color: #999;
  font-size: 1.1rem;
  margin-top: 4rem;
}
@media (max-width: 600px) {
  .page-wrap {
    padding: 1.2rem 0 1.2rem 0;
  }
}
</style>
