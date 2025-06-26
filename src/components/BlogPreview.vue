/* src/components/BlogPreview.vue */
<template>
  <section class="blog-preview contenedor">
    <h2 class="blog-preview__title">Últimas noticias</h2>
    <div class="blog-grid">
      <article v-for="post in posts" :key="post.id" class="blog-card">
        <img :src="post.image" :alt="post.title" class="blog-card__img" />
        <div class="blog-card__body">
          <h3 class="blog-card__title">{{ post.title }}</h3>
          <p class="blog-card__excerpt">{{ post.excerpt }}</p>
          <router-link :to="`/blog/${post.slug}`" class="blog-card__link">
            Ver noticia →
          </router-link>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
// Espera props.posts: Array<{ id: number|string, title: string, image: string, excerpt: string, slug: string }>
defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.blog-preview {
  padding: 4rem 1rem;
  text-align: center;
}
.blog-preview__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
}
.blog-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.blog-card__img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}
.blog-card__body {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.blog-card__title {
  margin: 0 0 0.5rem;
  font-size: 1.25rem;
}
.blog-card__excerpt {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.4;
  margin-bottom: 1rem;
}
.blog-card__link {
  align-self: flex-start;
  color: #ab0a3d;
  text-decoration: none;
  font-weight: bold;
}
.blog-card__link:hover {
  text-decoration: underline;
}
.catalogo-preview__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
}
.categoria-card__img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
}
.categoria-card__title {
  margin: 0.5rem 0;
}
.categoria-card__link {
  display: inline-block;
  margin-top: auto;
  padding: 0.5rem 1rem;
  background: #ab0a3d;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}
.categoria-card__link:hover {
  background: #92243d;
}

</style>

