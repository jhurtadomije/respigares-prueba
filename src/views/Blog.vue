<template>
  <div class="page-wrap">
    <h1 class="page-title">Blog</h1>
    <div v-if="posts.length">
      <BlogPreview :posts="posts" :showTitle="false" />
    </div>
    <p v-else class="loading-posts">Cargando noticias…</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
.page-wrap {
  margin-top: 80px;
  padding: 2.5rem 0 2rem 0;
  background: #fff;
  min-height: 70vh;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.page-title {
  text-align: center;
  color: var(--color-main, #ab0a3d);
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 2.2rem;
  letter-spacing: 0.01em;
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
  .page-title {
    font-size: 1.2rem;
    margin-bottom: 1.2rem;
  }
}
</style>
