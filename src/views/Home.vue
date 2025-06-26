<!-- src/views/Home.vue -->
<template>
  <div>
    <!-- 1. Hero -->
    <Hero />

    <!-- 2. Tres bloques de info -->
    <InfoBlocks :blocks="infoBlocks" />

    <!-- 3. Breve sección “Somos” -->
    <section class="somos-preview contenedor">
      <h2 class="somos-preview__title">Somos</h2>
      <p class="somos-preview__text">
        En Respigares llevamos más de 50 años distribuyendo productos de alimentación profesional…
      </p>
      <router-link to="/nosotros" class="somos-preview__link">
        Más información →
      </router-link>
    </section>

    <!-- 4. Avance del catálogo -->
    <CatalogPreview :categories="categoriesPreview" />

    <!-- 5. Carrusel de marcas -->
    <BrandsCarousel />

    <!-- 6. Previsualización del blog -->
    <BlogPreview :posts="postsPreview" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Componentes
import Hero           from '../components/Hero.vue'
import Nosotros from './Nosotros.vue'
import InfoBlocks     from '../components/InfoBlocks.vue'
import CatalogPreview from '../components/CatalogPreview.vue'
import BrandsCarousel from '../components/BrandsCarousel.vue'
import BlogPreview    from '../components/BlogPreview.vue'

// Bloques de info (estático)
const infoBlocks = [
  {
    icon: '/icons/marcas.ico',
    title: 'Primeras marcas, mejores personas',
    text: 'Seleccionamos solo primeras marcas y contamos con el mejor equipo humano para atenderte.',
    link: '/catalogo'
  },
  {
    icon: '/icons/tamano.ico',
    title: 'El tamaño sí importa',
    text: 'Nuestra infraestructura nos permite almacenar y entregar grandes volúmenes con la máxima calidad.',
    link: '/nosotros'
  }
]

// Datos dinámicos
const categoriesPreview = ref([])
const postsPreview      = ref([])

onMounted(async () => {
  // Cargar categorías desde public/categorias.json
  const catRes = await fetch('/categorias.json')
  if (catRes.ok) {
    const allCategories = await catRes.json()
    categoriesPreview.value = allCategories.slice(0, 6)
  }

  // Cargar posts desde public/posts.json
  const postRes = await fetch('/posts.json')
  if (postRes.ok) {
    const allPosts = await postRes.json()
    postsPreview.value = allPosts.slice(0, 4)
  }
})
</script>

<style scoped>
.somos-preview {
  text-align: center;
  padding: 4rem 1rem;
}
.somos-preview__title {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.somos-preview__text {
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}
.somos-preview__link {
  font-weight: bold;
  color: #ab0a3d;
  text-decoration: none;
}
.somos-preview__link:hover {
  text-decoration: underline;
}
</style>
