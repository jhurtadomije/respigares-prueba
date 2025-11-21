<template>
  <section class="hero">
    <!-- Vídeo de fondo (sin sonido, autoplay, bucle) -->
    <video
      class="hero-video"
      autoplay
      muted
      loop
      playsinline
    >
      <source src="/videos/video-hero.mp4" type="video/mp4" />
      Tu navegador no soporta vídeo en HTML5.
    </video>
    <div class="hero-overlay"></div>
    <div class="hero-content">
      <h1 class="hero-title">
        Especialistas en <span>productos gourmet</span>
      </h1>
      <p class="hero-subtitle">
        Calidad y tradición desde 1971 &bull; Conservas &bull; Aceites &bull; Encurtidos
      </p>
      <router-link to="/catalogo" class="hero-btn">
        Ver Catálogo
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  const video = document.querySelector('.hero-video')
  if (video) video.playbackRate = 0.7
})
</script>

<style scoped>
.hero {
  position: relative;
  width: 100%;
  max-width: 100vw;          /* 👈 evita que algo se pase del viewport */
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  overflow-x: clip;          /* 👈 cinturón anti-scroll horizontal */
  box-sizing: border-box;
  margin-top: -3.6rem;       /* pegar al header */
}

.hero-video {
  position: absolute;
  inset: 0;                  /* 👈 mejor que top/left/width/height sueltos */
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.82) saturate(1.1);
  pointer-events: none;
  user-select: none;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #16430044 30%, #0000 100%);
  z-index: 2;
}

.hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; 
  color: #fff;
  text-align: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;

  /* ✅ en vez de margin-top fijo monstruoso */
  padding: clamp(6rem, 14vh, 12rem) 1rem 2.5rem 1rem;

  animation: fadeIn 1.8s cubic-bezier(.8,.1,.1,1);
}

.hero-title {
  font-size: clamp(1.8rem, 5vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: 0.03em;
  text-shadow: 0 2px 12px #0006;
  padding: 1rem 0.4rem;
}

.hero-title span {
  color: #e7c953;
  font-weight: 800;
  letter-spacing: 0.03em;
}

.hero-subtitle {
  font-size: clamp(1rem, 2.4vw, 1.3rem);
  margin-bottom: 2.2rem;
  font-weight: 400;
  color: #f5efda;
  text-shadow: 0 1px 8px #0006;
}

.hero-btn {
  background: linear-gradient(90deg, #e7c953, #c99e36);
  color: #222;
  border: none;
  padding: 1rem 2.2rem;
  border-radius: 35px;
  font-weight: 800;
  font-size: 1.12rem;
  text-decoration: none;
  box-shadow: 0 3px 18px #c99e3633;
  transition: filter .17s, background .2s;
  text-shadow: none;
  letter-spacing: 0.03em;
}

.hero-btn:hover {
  filter: brightness(1.08);
  background: linear-gradient(90deg, #f5e396, #b38b25);
}

/* Mobile */
@media (max-width: 600px) {
  .hero {
    min-height: calc(100vh - 3.6rem);
  }

  .hero-content {
    padding: clamp(5rem, 18vh, 9rem) 1rem 2.5rem 1rem;
  }

  .hero-title {
    font-size: 1.6rem;
    margin-bottom: 0.7rem;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin-bottom: 1.7rem;
  }

  .hero-btn {
    font-size: 1rem;
    padding: 0.75rem 1.6rem;
  }
}

/* Desktop */
@media (min-width: 900px) {
  .hero {
    min-height: 80vh;
    margin: 0;
  }

  /* ya no hace falta margin-top aquí */
  .hero-content {
    padding: clamp(7rem, 16vh, 13rem) 1rem 2.5rem 1rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(35px); }
  to   { opacity: 1; transform: none; }
}
</style>
