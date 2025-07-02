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
      <img src="/img/Logomasde50anos.png" alt="Respigares" class="hero-logo" />
      <h1 class="hero-title">
        Especialistas en <span>productos gourmet</span>
      </h1>
      <p class="hero-subtitle">
        Calidad y tradición desde 1991 &bull; Conservas &bull; Aceites &bull; Encurtidos
      </p>
      <router-link to="/catalogo" class="hero-btn">
        Ver Catálogo
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
onMounted(() => {
  const video = document.querySelector('.hero-video');
  if (video) video.playbackRate = 0.7;
});
</script>

<style scoped>
.hero {
  position: relative;
  width: 100vw;
  height: calc(100vh - 64px); /* 64px = altura de tu header fijo */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  min-height: 400px;
}

.hero-video {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.82) saturate(1.1);
  pointer-events: none;
  user-select: none;
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0;
  width: 100vw; height: 100%;
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
  padding: 2.5rem 1rem 1.5rem 1rem;
  animation: fadeIn 1.8s cubic-bezier(.8,.1,.1,1);
}

.hero-logo {
  width: 170px;
  margin-bottom: 1.7rem;
  filter: drop-shadow(0 2px 18px #2228);
  max-width: 80vw;
}
.hero-title {
  font-size: 2.7rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.15;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px #0006;
}
.hero-title span {
  color: #e7c953;
  font-weight: 800;
  letter-spacing: 0.03em;
}
.hero-subtitle {
  font-size: 1.2rem;
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

/* Mobile first: menos separación, textos pequeños, sin desbordes */
@media (max-width: 700px) {
  .hero {
    height: calc(90vh - 56px);
    min-height: 300px;
  }
  .hero-logo {
    width: 110px;
    margin-bottom: 1.1rem;
  }
  .hero-title {
    font-size: 1.4rem;
    margin-bottom: 0.6rem;
  }
  .hero-content {
    padding: 1.2rem 0.2rem;
  }
  .hero-btn {
    font-size: 1rem;
    padding: 0.75rem 1.5rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(35px);}
  to   { opacity: 1; transform: none;}
}
</style>
