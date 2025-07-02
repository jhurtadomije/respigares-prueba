<!-- src/components/CatalogPreview.vue -->
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
defineProps({
  categories: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
/* ===== MOBILE FIRST ===== */
.catalogo-preview {
  padding: 1.5rem 0.5rem;
  text-align: center;
}
.catalogo-preview__title {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: var(--color-main);
  letter-spacing: .01em;
}
.catalogo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.categoria-card {
  background: #fff;
  border-radius: 9px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: box-shadow .18s, transform .18s;
}
.categoria-card:active,
.categoria-card:hover {
  box-shadow: 0 6px 18px rgba(171,10,61,0.07);
  transform: translateY(-4px) scale(1.01);
}

.categoria-card__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}

.categoria-card__title {
  margin: 1rem 0 0.5rem 0;
  font-size: 1.07rem;
  font-weight: 700;
}

.categoria-card__link {
  margin-top: auto;
  padding: 0.6rem;
  background: var(--color-main);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.97rem;
  border-radius: 0 0 8px 8px;
  letter-spacing: 0.01em;
  transition: background 0.2s;
  display: block;
}
.categoria-card__link:hover {
  background: var(--color-blue);
}

/* ====== TABLET (min 500px) ====== */
@media (min-width: 500px) {
  .catalogo-preview__title {
    font-size: 1.7rem;
  }
  .catalogo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.2rem;
  }
  .categoria-card__title {
    font-size: 1.12rem;
  }
}

/* ====== TABLET GRANDE (min 800px) ====== */
@media (min-width: 800px) {
  .catalogo-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
  }
  .categoria-card__title {
    font-size: 1.15rem;
  }
}

/* ====== DESKTOP (min 1150px) ====== */
@media (min-width: 1150px) {
  .catalogo-preview__title {
    font-size: 2.1rem;
    margin-bottom: 2rem;
  }
  .catalogo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }
  .categoria-card__title {
    font-size: 1.22rem;
  }
  .categoria-card__link {
    font-size: 1.05rem;
    padding: 0.9rem 0;
  }
}
</style>
