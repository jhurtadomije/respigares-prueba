<!-- src/components/CatalogPreview.vue -->
<template>
  <section class="catalogo-preview contenedor">
    <h2 class="catalogo-preview__title">Nuestro catálogo</h2>
    <div class="catalogo-grid">
      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        class="categoria-card__link-wrapper"
        :to="{ name: 'Catalogo', query: { cat: cat.slug } }"
      >
        <div class="categoria-card">
          <img :src="cat.image" :alt="cat.name" class="categoria-card__img" />
          <h3 class="categoria-card__title">{{ cat.name }}</h3>
          <span class="categoria-card__link">Ver productos →</span>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true // [{ id, slug, name, image }]
  }
})
</script>

<style scoped>
.catalogo-preview__title {
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 2em;
  color: var(--color-main, #ab0a3d);
  font-weight: 900;
}

.catalogo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5em;
  margin-top: 2em;
}

/* --- Card --- */
.categoria-card__link-wrapper {
  text-decoration: none;
  color: inherit;
  display: block;
}

.categoria-card {
  background: #fff;
  border-radius: 0.7em;
  box-shadow: 0 0.14em 0.6em #0001;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: box-shadow .16s, transform .16s;
  height: 100%;
}
.categoria-card:active,
.categoria-card:hover {
  box-shadow: 0 0.4em 1.2em #ab0a3d22;
  transform: translateY(-0.3em) scale(1.015);
}

.categoria-card__img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  display: block;
  background: #f4f4f4;
}

.categoria-card__title {
  margin: 1em 0 0.4em 0;
  font-size: 1.15em;
  font-weight: 700;
  color: #2c2c2c;
}

/* --- Botón dentro de la tarjeta --- */
.categoria-card__link {
  margin-top: auto;
  padding: 0.8em 0;
  background: var(--color-main, #ab0a3d);
  color: #fff;
  font-weight: 700;
  font-size: 1em;
  border-radius: 0 0 0.6em 0.6em;
  letter-spacing: 0.01em;
  transition: background 0.18s;
  display: block;
  text-align: center;
}
.categoria-card__link:hover {
  background: var(--color-blue, #256296);
}

/* --- Responsive Grid --- */
@media (min-width: 40em) {
  .catalogo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.7em;
  }
}

@media (min-width: 62em) {
  .catalogo-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
  }
}

@media (min-width: 80em) {
  .catalogo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.3em;
  }
  .catalogo-preview__title {
    font-size: 2.7rem;
  }
}
</style>
