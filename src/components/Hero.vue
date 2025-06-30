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
      <!-- Fallback para navegadores antiguos -->
      Tu navegador no soporta vídeo en HTML5.
    </video>

    <!-- Capa oscura para mejorar el contraste -->
    <div class="hero-overlay"></div>

    <!-- Contenido centrado -->
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

  /* Ocupa toda la ventana menos el header fijo de 64px */
  height: calc(100vh - 64px);

  /* Si prefieres un porcentaje fijo, por ejemplo 80% de alto */
  /* height: 80vh; */

  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100vw;
  object-fit: cover;
  z-index: 1;
  filter: brightness(0.82) saturate(1.1);
}

.hero-overlay {
  position: absolute;
  top: 0; left: 0; width: 100vw; height: 100%;
  background: linear-gradient(90deg, #16430044 30%, #0000 100%);
  z-index: 2;
}

.hero-content {
  margin-top: 20rem;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-align: center;
  width: 100%;
  padding: 2.5rem 1rem;
  animation: fadeIn 1.2s cubic-bezier(.8,.1,.1,1);
}

.hero-logo {
  width: 170px;
  margin-bottom: 1.7rem;
  filter: drop-shadow(0 2px 18px #2228);
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

/* Responsive: móvil */
@media (max-width: 650px) {
  .hero-title {
    font-size: 2rem;
  }
  .hero-logo {
    width: 110px;
    margin-bottom: 1.1rem;
  }
  .hero-content {
    padding: 1.1rem 0.3rem;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px);}
  to   { opacity: 1; transform: none;}
}
</style>
