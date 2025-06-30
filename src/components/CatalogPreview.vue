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
}
.catalogo-preview__title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}
.catalogo-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 2rem;
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
  height: 150px;
  object-fit: cover;
}
.categoria-card__title {
  margin: 1rem 0 0.5rem;
  font-size: 1.25rem;
}
.categoria-card__link {
  margin-top: auto;
  padding: 0.75rem;
  background: #ab0a3d;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
}
.categoria-card__link:hover {
  background: #92243d;
}
</style>