<template>
  <section class="blog-preview">
    <div class="blog-preview__inner contenedor">
      <h2 v-if="showTitle" class="blog-preview__title">
        {{ title }}
      </h2>

      <!-- ====== HERO SOLO SI showHero ====== -->
      <article
        v-if="showHero && hero"
        class="hero-card"
        :class="{ 'is-inactive': !isActiva(hero) }"
      >
        <a href="#" class="hero-card__link" @click.prevent="onClickPromo(hero)">
          <div class="hero-card__media">
            <img
              :src="imgUrl(hero.imagen_banner)"
              :alt="hero.titulo"
              class="hero-card__img"
              loading="lazy"
            />
            <div class="hero-card__overlay">
              <span v-if="!isActiva(hero)" class="status-chip">Inactiva</span>
              <h3 class="hero-card__title">{{ hero.titulo }}</h3>

              <span class="hero-card__cta">
                {{ hero.cta_texto || "Ver promoción" }}
              </span>
            </div>
          </div>
        </a>
      </article>

      <!-- ====== GRID ====== -->
      <div v-if="gridPosts.length" class="blog-grid">
        <article
          v-for="p in gridPosts"
          :key="p.id"
          class="blog-card"
          :class="{ 'is-inactive': !isActiva(p) }"
        >
          <a href="#" class="blog-card__link" @click.prevent="onClickPromo(p)">
            <div class="blog-card__media">
              <img
                :src="imgUrl(p.imagen_banner)"
                :alt="p.titulo"
                class="blog-card__img"
                loading="lazy"
              />
              <div class="blog-card__overlay">
                <span v-if="!isActiva(p)" class="status-chip">Inactiva</span>
                <p class="blog-card__title">{{ p.titulo }}</p>

                <span v-if="p.cta_texto" class="blog-card__cta">
                  {{ p.cta_texto }}
                </span>
              </div>
            </div>
          </a>
        </article>
      </div>

      <p v-else class="blog-empty">Aún no hay promociones publicadas.</p>
    </div>
    
  </section>
  <!-- ✅ BOTÓN "VER TODAS" -->
    <div v-if="showMoreButton" class="blog-preview__footer">
      <RouterLink :to="moreTo" class="blog-more-btn">
        {{ moreText }}
      </RouterLink>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { openContactForPromocion } from "../contactModalState";
import { RouterLink } from "vue-router";

const props = defineProps({
  posts: { type: Array, required: true },
  showTitle: { type: Boolean, default: true },
  title: { type: String, default: "Ofertas y promociones" },
  // ✅ si true => saca destacada grande arriba
  showHero: { type: Boolean, default: false },

  showMoreButton: { type: Boolean, default: true },
  moreTo: { type: [String, Object], default: "/blog" },
  moreText: { type: String, default: "Ver todas las ofertas y promociones" },
});

// ✅ orden: activas primero, luego inactivas.
// dentro de cada grupo: destacada DESC, created_at DESC
const sorted = computed(() => {
  const arr = [...(props.posts || [])];

  return arr.sort((a, b) => {
    const aAct = Number(a?.activa) === 1 ? 1 : 0;
    const bAct = Number(b?.activa) === 1 ? 1 : 0;

    if (aAct !== bAct) return bAct - aAct; // activas arriba

    const d = (b.destacada ?? 0) - (a.destacada ?? 0);
    if (d !== 0) return d;

    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
});

const hero = computed(() => sorted.value[0] || null);

// ✅ qué se pinta en grid:
// - si showHero => quitamos la primera porque ya va en grande
// - si NO showHero => todas iguales en grid
const gridPosts = computed(() =>
  props.showHero ? sorted.value.slice(1) : sorted.value
);

function onClickPromo(promo) {
  openContactForPromocion(promo);
}

function isActiva(p) {
  return Number(p?.activa) === 1;
}

function imgUrl(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;

  const backend = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  if (String(path).startsWith("/uploads")) {
    return new URL(path, backend).href;
  }

  return import.meta.env.BASE_URL + String(path).replace(/^\//, "");
}
</script>

<style scoped>
.blog-preview {
  position: relative;
  padding: 2.6rem 0 2.2rem 0;
  text-align: center;
}

.blog-preview__inner {
  max-width: 75rem;
  padding-inline: 0.5rem;
  box-sizing: border-box;
}

.blog-preview__title {
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  margin-bottom: 1.6rem;
  color: var(--color-main);
  font-weight: 900;
}

/* ===== HERO ===== */
.hero-card {
  margin-bottom: 1.6rem;
  border-radius: 1.2rem;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 0.5rem 1.6rem rgba(0, 0, 0, 0.1);
}
.hero-card__link {
  display: block;
  text-decoration: none;
  color: inherit;
}
.hero-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 21/9;
  background: #e9e9e9;
}
.hero-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.hero-card__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.4rem;
  padding: 1.2rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.25) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  text-align: left;
}
.hero-card__title {
  color: #fff;
  font-size: clamp(1.3rem, 2.4vw, 2rem);
  font-weight: 900;
  margin: 0;
  text-shadow: 0 2px 8px #0009;
  line-height: 1.2;
}
.hero-card__cta {
  align-self: flex-start;
  margin-top: 0.3rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  background: var(--color-main);
  color: #fff;
  font-weight: 800;
  font-size: 0.9rem;
}

/* ===== GRID ===== */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.3rem;
}

.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.9rem;
  box-shadow: 0 0.18rem 0.9rem rgba(0, 0, 0, 0.09);
  background: #fff;
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
  background: #e4e4e4;
}

.blog-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.blog-card__overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 0.65rem 0.8rem;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.78) 0%,
    rgba(0, 0, 0, 0.18) 100%
  );
  min-height: 44px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  gap: 0.25rem;
}

.blog-card__title {
  color: #fff;
  font-size: 0.98rem;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 8px #0007;
  text-align: left;
  line-height: 1.35;
}
.blog-card__cta {
  color: #fff;
  font-size: 0.82rem;
  font-weight: 700;
  opacity: 0.95;
}

.blog-empty {
  margin-top: 1rem;
  color: #777;
  font-weight: 600;
}

.is-inactive {
  opacity: 0.55;
  filter: grayscale(1);
}

/* chip estado */
.status-chip {
  align-self: flex-start;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.25rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.35rem;
  letter-spacing: 0.03em;
}

@media (min-width: 600px) {
  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }
}
@media (min-width: 960px) {
  .blog-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.1rem;
  }
}
.blog-preview__footer{
  margin-top: 1.8rem;
  display: flex;
  justify-content: center;
}

.blog-more-btn{
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.6rem;
  border-radius: 999px;
  background: var(--color-main);
  color: #fff;
  font-weight: 800;
  font-size: 0.95rem;
  text-decoration: none;
  box-shadow: 0 0.4rem 1.2rem rgba(0,0,0,0.12);
  transition: transform .18s ease, filter .18s ease;
}

.blog-more-btn:hover{
  transform: translateY(-2px);
  filter: brightness(1.06);
}
</style>
