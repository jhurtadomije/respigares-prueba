<!-- src/components/BlogPreview.vue -->
<template>
  <section class="blog-preview contenedor">
    <h2 class="blog-preview__title">Blog</h2>
    <div class="blog-grid">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="blog-card"
      >
        <a
          :href="post.source"
          class="blog-card__link"
          target="_blank"
          rel="noopener"
        >
          <div class="blog-card__media">
            <img
              :src="BASE + post.image.replace(/^\//, '')"
              :alt="post.title"
              class="blog-card__img"
              loading="lazy"
            />
            <div class="blog-card__overlay">
              <p class="blog-card__title">{{ post.title }}</p>
            </div>
          </div>
        </a>
      </article>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'

// Base URL de Vite (en dev "/" y en producción "/respigares-prueba/")
const BASE = import.meta.env.BASE_URL

defineProps({
  /**
   * posts: Array de objetos con al menos:
   * {
   *   slug: string,
   *   title: string,
   *   image: string,  // ruta con leading slash, p.ej. "/img/blog/aceitunas-negras.jpg"
   *   source: string
   * }
   */
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
  font-size: 2.25rem;
  margin-bottom: 2rem;
  color: var(--color-main);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}
.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.blog-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

.blog-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
}
.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.blog-card:hover .blog-card__img {
  transform: scale(1.05);
}

.blog-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1rem;
  background: rgba(0,0,0,0.6);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.blog-card:hover .blog-card__overlay {
  opacity: 1;
}

.blog-card__title {
  color: #fff;
  font-size: 1rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.4;
}

/* Ajustes móviles */
@media (max-width: 480px) {
  .blog-preview__title {
    font-size: 1.8rem;
  }
  .blog-card__title {
    font-size: 0.95rem;
  }
  .blog-card__overlay {
    padding: 0.75rem;
  }
}
</style>
