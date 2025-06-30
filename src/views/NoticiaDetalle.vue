<template>
  <Header />
  <main class="page contenedor">
    <article v-if="post">
      <h1>{{ post.title }}</h1>
      <img :src="post.image" :alt="post.title" />
      <div v-html="post.content || post.excerpt"></div>
    </article>
    <p v-else>Cargando noticia…</p>
  </main>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute }      from 'vue-router'
import Header            from '../components/Header.vue'
import Footer            from '../components/Footer.vue'

const route = useRoute()
const post  = ref(null)

onMounted(async () => {
  const base = import.meta.env.BASE_URL
  const res  = await fetch(`${base}posts.json`)
  if (res.ok) {
    const all = await res.json()
    post.value = all.find(p => p.slug === route.params.slug)
  }
})
</script>
