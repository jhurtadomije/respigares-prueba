<!-- src/components/CatalogPreview.vue -->
<template>
  <section class="catalogo-preview contenedor">
      <!-- imagen decorativa -->
      <img
        src="/img/rama-olivo.png"
        alt=""
        aria-hidden="true"
        class="catalogo-preview__olive"
      />
      <img
        src="/img/rama-olivo.png"
        alt=""
        aria-hidden="true"
        class="catalogo-preview__olive catalogo-preview__olive--right"
      />
      <h2 class="catalogo-preview__title">Nuestros Productos</h2>
      <div class="catalogo-preview__intro">
        <h4>Accede a nuestro catálogo de productos gourmet por categorías:</h4>
      </div>
      <div class="catalogo-grid">
      <router-link
        v-for="cat in categories"
        :key="cat.slug"
        class="categoria-card__link-wrapper"
        :to="{ name: 'Catalogo', query: { cat: cat.id } }"
      >
        <div class="categoria-card">
          <img :src="cat.image" :alt="cat.name" class="categoria-card__img" />
          <h3 class="categoria-card__title">{{ cat.name }}</h3>
          <span class="categoria-card__link">Ver productos</span>
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


.catalogo-preview {
  background: linear-gradient(180deg, #f7f9fb 0%, #f1f4f7 100%);
  position: relative;
  padding: 3rem 0 4rem 0;
  box-shadow: 0 0.13rem 0.75rem #ab0a3d10;
  border-radius: 20px;
}
.catalogo-preview__olive {
  position: absolute;
  top: -11rem;
  left: -20rem;                /* sácala un poco hacia fuera como en el catálogo */
  width: clamp(25rem, 50vw, 10rem);
  opacity: 0.9;
  pointer-events: none;
  user-select: none;
}

.catalogo-preview__olive--right {
  position: absolute;
  top: -11rem;
  left: 70rem;                /* sácala un poco hacia fuera como en el catálogo */
  width: clamp(25rem, 50vw, 10rem);
  opacity: 0.9;
  pointer-events: none;
  user-select: none;
  transform: scaleX(-1);     
}

/* Título bloque */
.catalogo-preview__title {
  margin-top: -7rem; /* si luego molesta, bajamos este valor */
  text-align: center;
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  margin-bottom: 2rem;
  color: var(--color-main, #ab0a3d);
  font-weight: 800;
}
.catalogo-preview__intro {
  text-align: center;
  margin-bottom: 2.5rem;
}



/* CONTENEDOR: FLEX PARA CENTRAR ÚLTIMA FILA */
.catalogo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;   /* última fila centrada */
  gap: 1.5rem;
  padding-inline: 0.75rem;
}

/* --- Card como “botón grande” --- */
.categoria-card__link-wrapper {
  text-decoration: none;
  color: inherit;
  flex: 1 1 14rem;
  max-width: 18rem;
  display: flex;
  cursor: pointer;            /* toda la card se siente como botón */
}

.categoria-card {
  position: relative;
  background: #f7f8fa;                  /* fondo suave tipo botón */
  border-radius: 1rem;                  /* bordes bien redondeados */
  border: 2px solid transparent;        /* borde preparado para el hover */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  text-align: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  transition:
    box-shadow 0.18s ease,
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;

  /* animación de entrada */
  opacity: 0;
  transform: translateY(12px);
  animation-name: catalogFadeUp;
  animation-duration: 0.55s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

/* Hover = botón “encendido” */
.categoria-card:hover {
  border-color: var(--color-main, #ab0a3d);
  background: #ffffff;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

/* Active = botón “pulsado” */
.categoria-card:active {
  transform: translateY(1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.10);
}

/* Imagen */
.categoria-card__img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
  background: #eceff3;
  transform: scale(1);
  transition: transform 0.25s ease-out;
}

.categoria-card:hover .categoria-card__img {
  transform: scale(1.05);
}

/* Título dentro de la card (feeling de botón) */
.categoria-card__title {
  margin: 0.9rem 1rem 0.4rem 1rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: #28323a;
}

/* “Ver productos →” como zona clicable inferior */
.categoria-card__link {
  margin-top: auto;
  padding: 0.7rem 0;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  font-weight: 700;
  font-size: 0.95rem;
  border-radius: 0 0 0.9rem 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  display: block;
  text-align: center;
  transition: background 0.18s ease, letter-spacing 0.18s ease;
}

.categoria-card:hover .categoria-card__link {
  background: var(--color-main);
  letter-spacing: 0.08em;  /* pequeño “empuje” de texto al pasar el ratón */
}

/* ====== STAGGER (una tras otra) ====== */
.categoria-card:nth-child(1)  { animation-delay: 0.05s; }
.categoria-card:nth-child(2)  { animation-delay: 0.12s; }
.categoria-card:nth-child(3)  { animation-delay: 0.19s; }
.categoria-card:nth-child(4)  { animation-delay: 0.26s; }
.categoria-card:nth-child(5)  { animation-delay: 0.33s; }
.categoria-card:nth-child(6)  { animation-delay: 0.40s; }
.categoria-card:nth-child(7)  { animation-delay: 0.47s; }
.categoria-card:nth-child(8)  { animation-delay: 0.54s; }

/* Keyframes de entrada */
@keyframes catalogFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====== BREAKPOINTS ====== */
@media (min-width: 48rem) { /* 768px */
  .catalogo-preview__title {
    margin-bottom: 2.4rem;
  }

  .catalogo-grid {
    gap: 2rem;
  }
}

@media (min-width: 75rem) { /* 1200px */
  .catalogo-grid {
    gap: 2.3rem;
  }

  .catalogo-preview__title {
    font-size: 2.4rem;
  }
}

@media (max-width: 700px) {
  .catalogo-preview__olive {
    display: none;
  }
}
</style>
