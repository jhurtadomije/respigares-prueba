<template>
  <section v-scroll-random-reveal>
    <Hero />
  </section>
  <main class="home-content contenedor">
    <section v-scroll-random-reveal>
      <SomosPreview />
    </section>
    <section v-scroll-random-reveal>
      <CatalogPreview :categories="categoriesPreview" />
    </section>
    <section v-scroll-random-reveal>
      <BrandsCarousel />
    </section>
    <section v-scroll-random-reveal>
      <BlogPreview :posts="postsPreview" />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
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
    categoriesPreview.value = allCats // Ya lo limitas en CatalogPreview si quieres
  } else {
    console.error('No se encontró categorias.json en', `${base}categorias.json`)
  }

  // Fetch posts
  const postRes = await fetch(`${base}posts.json`)
  if (postRes.ok) {
    const allPosts = await postRes.json()
    postsPreview.value = allPosts.slice(0, 4)
  } else {
    console.error('No se encontró posts.json en', `${base}posts.json`)
  }
})

useHead({
  title: 'Respigares | Distribución de productos gourmet en Andalucía',
  meta: [
    { name: 'description', content: 'Distribuimos más de 4.000 referencias de alimentos gourmet y productos premium para hostelería y particulares. Calidad, confianza y cercanía desde 1971.' },
    { property: 'og:title', content: 'Respigares | Distribución de productos gourmet en Andalucía' },
    { property: 'og:description', content: 'Representaciones Espigares: calidad, confianza y un amplio catálogo de productos de alimentación.' },
    { property: 'og:image', content: 'https://www.respigares.es/img/hero-catalogo.jpg' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.respigares.es/' }
  ]
})
</script>

<style>
.home-content {
  margin-top: 70px;
  padding: 2rem 0;
}
</style>
