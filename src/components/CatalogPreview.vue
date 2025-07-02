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

defineProps({
  categories: {
    type: Array,
    required: true
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

.categoria-card {
  background: #fff;
  border-radius: 0.7em;
  box-shadow: 0 0.14em 0.6em #0001;
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  transition: box-shadow .16s, transform .16s;
}
.categoria-card:active,
.categoria-card:hover {
  box-shadow: 0 0.4em 1.2em #ab0a3d12;
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

.categoria-card__link {
  margin-top: auto;
  padding: 0.8em 0;
  background: var(--color-main, #ab0a3d);
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 1em;
  border-radius: 0 0 0.6em 0.6em;
  letter-spacing: 0.01em;
  transition: background 0.18s;
  display: block;
}
.categoria-card__link:hover {
  background: var(--color-blue, #256296);
}

/* Tablet: 2 columnas */
@media (min-width: 40em) {
  .catalogo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.7em;
  }
}

/* Desktop: 3 columnas */
@media (min-width: 62em) {
  .catalogo-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2em;
  }
}

/* Desktop grande: 4 columnas */
@media (min-width: 80em) {
  .catalogo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.3em;
  }
  .catalogo-preview__title {
    font-size: 2.7rem;
  }
}

/* --- Clase contenedor global: pon esto en tu estilos base (si no lo tienes ya) --- */
.contenedor {
  max-width: 70em; /* 1120px aprox (ajusta según tu Home) */
  margin-left: auto;
  margin-right: auto;
  padding-left: 2em;
  padding-right: 2em;
  box-sizing: border-box;
}
@media (max-width: 40em) {
  .contenedor {
    padding-left: 0.7em;
    padding-right: 0.7em;
  }
}
</style>
