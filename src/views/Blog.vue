<!-- src/views/Blog.vue -->
<template>
  <Header />
  <main class="page contenedor">
    <h1>Blog</h1>
    <div v-if="posts.length" class="grid-productos">
      <BlogPreview :posts="posts" />
      <!-- Si prefieres un componente distinto, podrías usar BlogFull aquí -->
    </div>
    <p v-else>Cargando noticias…</p>
  </main>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Header       from '../components/Header.vue'
import Footer       from '../components/Footer.vue'
import BlogPreview  from '../components/BlogPreview.vue'

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
</script>

<style scoped>
.page {
  margin-top: 80px;
  padding: 2rem 0;
}
</style>
