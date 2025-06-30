<template>
<Hero />
  <main class="home-content contenedor">
    

    <!-- 1. Preview de “Somos” (componente estático) -->
    <SomosPreview />

    <!-- 2. Preview de “Catálogo” con las primeras 6 categorías -->
    <CatalogPreview :categories="categoriesPreview" />

    <!-- 3. Carrusel de marcas -->
    <BrandsCarousel />

    <!-- 4. Preview de “Blog” con las últimas 4 entradas -->
    <BlogPreview :posts="postsPreview" />
  </main>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import Hero           from '../components/Hero.vue'
import SomosPreview   from '../components/SomosPreview.vue'
import CatalogPreview from '../components/CatalogPreview.vue'
import BrandsCarousel from '../components/BrandsCarousel.vue'
import BlogPreview    from '../components/BlogPreview.vue'

const categoriesPreview = ref([])
const postsPreview      = ref([])

onMounted(async () => {
  const base = import.meta.env.BASE_URL

  // Fetch categorías
  const catRes = await fetch(`${base}categorias.json`)
  if (catRes.ok) {
    const allCats = await catRes.json()
    categoriesPreview.value = allCats.slice(0, 16)
  } else {
    console.error('No se encontró categorias.json en', `${base}categorias.json`)
  }

  // Fetch posts (asegúrate de crear public/posts.json)
  const postRes = await fetch(`${base}posts.json`)
  if (postRes.ok) {
    const allPosts = await postRes.json()
    postsPreview.value = allPosts.slice(0, 4)
  } else {
    console.error('No se encontró posts.json en', `${base}posts.json`)
  }
})
</script>


<style>
.home-content {
  margin-top: 60px; /* espacio para el header fijo */
  padding: 2rem 0;
}
.catalogo-grid {
  display: grid;
  /* Fijas 4 columnas iguales */
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
</style>
