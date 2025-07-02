<!-- src/components/BlogPreview.vue -->
<template>
  <section class="blog-preview contenedor">
    <h2 v-if="showTitle" class="blog-preview__title">
      Blog
    </h2>
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
const BASE = import.meta.env.BASE_URL

defineProps({
  posts: { type: Array, required: true },
  showTitle: { type: Boolean, default: true }
})
</script>


<style scoped>
/* ===== MOBILE FIRST ===== */
.blog-preview {
  padding: 2.2rem 0.5rem 1.7rem 0.5rem;
  text-align: center;
}
.blog-preview__title {
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: var(--color-main);
  font-weight: 900;
  letter-spacing: .01em;
}
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
}
.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.09);
  transition: transform 0.25s, box-shadow 0.25s;
  background: #fff;
}
.blog-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 5px 18px rgba(0,0,0,0.12);
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
  background: #e4e4e4;
}
.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.44s cubic-bezier(.68,-0.55,.27,1.55);
}
.blog-card:hover .blog-card__img {
  transform: scale(1.08);
}
.blog-card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.65rem 0.7rem;
  background: linear-gradient(0deg,rgba(0,0,0,0.72) 85%,rgba(0,0,0,0.15) 100%);
  opacity: 1;
  transition: opacity 0.32s;
  min-height: 44px;
  display: flex;
  align-items: flex-end;
}
.blog-card__title {
  color: #fff;
  font-size: 0.98rem;
  font-weight: bold;
  margin: 0;
  text-shadow: 0 2px 8px #0007;
  width: 100%;
  text-align: left;
  line-height: 1.35;
}

/* ====== TABLET Y ESCRITORIO ====== */
@media (min-width: 600px) {
  .blog-preview {
    padding: 3rem 1rem 2.2rem 1rem;
  }
  .blog-preview__title {
    font-size: 2rem;
  }
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;
  }
  .blog-card__title {
    font-size: 1.1rem;
  }
}
@media (min-width: 960px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.1rem;
  }
  .blog-preview__title {
    font-size: 2.25rem;
    margin-bottom: 2rem;
  }
}

</style>
