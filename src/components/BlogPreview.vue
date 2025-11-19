<template>
  <section class="blog-preview">
      
    <div class="blog-preview__inner contenedor">
    <div class="logo-gris-fondo">
        <img src="/img/logo-gris.png" alt="Logo Respigares" class="footer-logo-bg" />
      </div>
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
    </div>
  </section>
</template>

<script setup>

const BASE = import.meta.env.BASE_URL

defineProps({
  posts: { type: Array, required: true },
  showTitle: { type: Boolean, default: true }
})
</script>


<style scoped>
/* Sección a ancho completo */
.blog-preview {
  position: relative;              /* 👉 para poder posicionar el logo de fondo */
  padding: 2.4rem 0 2rem 0;
  text-align: center;
  overflow: visible;                /* por si el logo sobresale un poco */
}


/* Contenedor interno alineado con el resto de la web */
.blog-preview__inner {
  max-width: 75rem;
  padding-inline: 0.5rem;
  box-sizing: border-box;
  position: relative;
  z-index: 0;                      /* 👉 contenido por encima de la marca de agua */
}

.logo-gris-fondo {
  position: absolute;
  top: 130%;
  left: -16rem;
  transform: translate(-35%, -50%);
  width: min(60vw, 35rem);   /* tamaño responsive */
  opacity: 0.05;             /* un poco más de presencia en blanco */
  pointer-events: none;
  user-select: none;
  z-index: 0;
  
}

.footer-logo-bg {
  width: 100%;
  height: auto;
  display: block;
  /* Pasamos de blanco/gris muy claro a gris más intenso */
  filter: grayscale(1) brightness(0.5) contrast(1.2);
  margin-bottom: 2.5rem;
}


/* Título */
.blog-preview__title {
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  margin-bottom: 1.6rem;
  color: var(--color-main);
  font-weight: 900;
  letter-spacing: 0.03em;
}

/* Grid de posts */
.blog-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.3rem;
}

/* Card */
.blog-card {
  position: relative;
  overflow: hidden;
  border-radius: 0.9rem;
  box-shadow: 0 0.18rem 0.9rem rgba(0, 0, 0, 0.09);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
  background: #fff;

  /* animación de aparición */
  opacity: 0;
  transform: translateY(12px);
  animation-name: blogFadeUp;
  animation-duration: 0.55s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

/* Escalonado suave */
.blog-card:nth-child(1) { animation-delay: 0.05s; }
blog-card:nth-child(2) { animation-delay: 0.13s; }
.blog-card:nth-child(3) { animation-delay: 0.21s; }
.blog-card:nth-child(4) { animation-delay: 0.29s; }

/* Hover */
.blog-card:hover {
  transform: translateY(-2px) scale(1.01);
  box-shadow: 0 0.4rem 1.5rem rgba(0, 0, 0, 0.16);
}

/* Enlace clickable */
.blog-card__link {
  display: block;
  color: inherit;
  text-decoration: none;
}

/* Media (imagen + overlay) */
.blog-card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
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

/* Overlay con título */
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
  align-items: flex-end;
}

.blog-card__title {
  color: #fff;
  font-size: 0.98rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 8px #0007;
  width: 100%;
  text-align: left;
  line-height: 1.35;
}

/* Animación keyframes */
@keyframes blogFadeUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ====== TABLET ====== */
@media (min-width: 600px) {
  .blog-preview {
    padding: 3rem 0 2.4rem 0;
  }

  .blog-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.8rem;
  }

  .blog-card__title {
    font-size: 1.05rem;
  }
}

/* ====== DESKTOP ====== */
@media (min-width: 960px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 2.1rem;
  }

  .blog-preview__title {
    font-size: 2.3rem;
    margin-bottom: 2rem;
  }

  .blog-preview {
    padding: 3.4rem 0 2.8rem 0;
  }
}

/* Ajuste de la marca de agua en móvil si la ves muy grande */
@media (max-width: 600px) {
  .logo-gris-fondo {
    left: -2rem;
    bottom: -1.5rem;
    width: min(55vw, 14rem);
    opacity: 0.04;
  }
}
</style>
