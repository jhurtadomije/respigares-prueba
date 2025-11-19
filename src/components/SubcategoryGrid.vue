<template>
  <section class="catalogo contenedor animate-fadein">
    <h2 class="catalogo-cat-title">{{ titulo }}</h2>

    <div v-if="items.length === 0" class="no-productos">
      No hay subcategorías disponibles.
    </div>

    <div v-else class="catalogo-grid">
      <!-- Toda la card es clicable -->
      <RouterLink
        v-for="(s, idx) in items"
        :key="s.slug"
        class="categoria-card__wrapper animate-card"
        :style="`animation-delay: ${idx * 110}ms;`"
        :to="{ name:'Catalogo', query:{ ...$route.query, sub: s.slug } }"
      >
        <article class="categoria-card">
          <img
            v-if="s.image"
            :src="s.image"
            :alt="s.name"
            class="categoria-card__img"
          />
          <h3 class="categoria-card__title">
            {{ s.name }}
          </h3>

          <span class="categoria-card__cta">
            VER PRODUCTOS
          </span>
        </article>
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  items:  { type:Array, default:()=>[] }, // [{ slug,name,image,count }]
  titulo: { type:String, default:'Subcategorías' }
})
</script>

<style scoped>
/* =========================
   ANIMACIONES
   ========================= */
@keyframes sectionFadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: none; }
}
@keyframes cardFadeUp {
  from { opacity: 0; transform: translateY(16px) scale(.96); }
  to   { opacity: 1; transform: none; }
}

.animate-fadein {
  animation: sectionFadeIn .9s ease both;
}
.animate-card {
  opacity: 0;
  animation: cardFadeUp .7s ease forwards;
}

/* =========================
   CONTENEDOR
   ========================= */
.catalogo {
  margin: 3.4rem auto 3.2rem auto;
  max-width: 75rem;
  padding-inline: 1.5rem;
  box-sizing: border-box;
  text-align: center;
}

.catalogo-cat-title {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  text-align: center;
  margin-bottom: 2.2rem;
  color: var(--color-main, #ab0a3d);
  font-weight: 800;
  letter-spacing: 0.03em;
}

.no-productos {
  text-align: center;
  font-size: 1.02rem;
  color: #666;
}

/* =========================
   GRID (última fila centrada)
   ========================= */
.catalogo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem 2.3rem;
}

/* Wrapper = RouterLink, toda la card clicable */
.categoria-card__wrapper {
  flex: 1 1 14rem;
  max-width: 18rem;
  text-decoration: none;
  color: inherit;
  display: flex;
}

/* =========================
   CARD TIPO “BOTÓN GORDO”
   ========================= */
.categoria-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fb;
  border-radius: 1.1rem;
  padding: 1.4rem 1.1rem 1.7rem 1.1rem;
  box-shadow: 0 0.18rem 0.9rem rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e9f0;
  text-align: center;
  transition:
    transform 0.18s ease,
    box-shadow 0.2s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

/* Hover: profundidad y sensación de botón premium */
.categoria-card__wrapper:hover .categoria-card {
  background: #ffffff;
  transform: translateY(-0.18rem) scale(1.02);
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.16);
  border-color: rgba(171, 10, 61, 0.55);
}

/* Imagen */
.categoria-card__img {
  width: 7.5rem;
  height: 7.5rem;
  object-fit: contain;
  margin-bottom: 0.9rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px #0002;
}

/* Título */
.categoria-card__title {
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.7rem;
  color: #767676;
  text-align: center;
  letter-spacing: -0.01em;
}

/* CTA tipo pill dentro de la card */
.categoria-card__cta {
  margin-top: 0.2rem;
  padding: 0.55rem 1.9rem;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  box-shadow: 0 0.12rem 0.6rem rgba(0, 0, 0, 0.18);
  text-transform: uppercase;
  display: inline-block;
  transition:
    background 0.2s ease,
    letter-spacing 0.15s ease,
    box-shadow 0.2s ease;
}

/* Hover sobre el wrapper = resalta también el botón */
.categoria-card__wrapper:hover .categoria-card__cta {
  background: #ab0a3d;
  letter-spacing: 0.11em;
  box-shadow: 0 0.25rem 1.1rem rgba(171, 10, 61, 0.3);
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 700px) {
  .catalogo {
    margin: 3rem auto 2.6rem auto;
    padding-inline: 1rem;
  }

  .catalogo-grid {
    gap: 1.5rem;
  }

  .categoria-card__wrapper {
    max-width: 100%;
  }

  .categoria-card {
    padding: 1.2rem 0.9rem 1.5rem 0.9rem;
  }

  .categoria-card__img {
    width: 6.2rem;
    height: 6.2rem;
  }
}
</style>
