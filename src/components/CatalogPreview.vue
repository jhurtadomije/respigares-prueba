/* src/components/CatalogPreview.vue */
<template>
  <section class="catalogo-preview contenedor">
    <h2 class="catalogo-preview__title">Nuestro catálogo</h2>
    <div class="catalogo-grid">
      <div v-for="cat in categories" :key="cat.id" class="categoria-card">
        <img :src="cat.image" :alt="cat.name" class="categoria-card__img" />
        <h3 class="categoria-card__title">{{ cat.name }}</h3>
        <router-link :to="`/catalogo?cat=${cat.id}`" class="categoria-card__link">
          Ver productos →
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps } from 'vue'
// Espera props.categories: Array<{ id: number|string, name: string, image: string }>
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.catalogo-preview {
  padding: 1rem;
  text-align: center;
  overflow-anchor: none;
}
.catalogo-preview__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.catalogo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
  overflow-anchor: none;
}
.categoria-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
}
.categoria-card__img {
  width: 100%;
  /* altura flexible para que crezca según proporción */
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
.categoria-card__title {
  margin: 1rem 0 0.5rem;
  font-size: 1.25rem;
}
.categoria-card__link {
  margin-top: auto;
  padding: 0.75rem;
  background: var(--color-main);
  color: var(--color-white);
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.categoria-card__link:hover {
  background: var(--color-blue);
}

@media (max-width: 400px) {
  .catalogo-grid {
    gap: 1rem;
  }
  .categoria-card__title {
    font-size: 1.1rem;
  }
  .categoria-card__link {
    padding: 0.5rem;
    font-size: 0.9rem;
  }
}
</style>