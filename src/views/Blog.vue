<!-- src/views/Blog.vue  (Historial Promociones) -->
<template>
  <!-- Cabecera visual con imagen de fondo -->
  <div class="section-hero">
    <img src="/img/hero-blog.jpg" alt="Promociones Respigares" class="section-hero-img" />
    <div class="section-title-tab animate-fadein">
      <h1>Promociones</h1>
    </div>
  </div>

  <div class="page-wrap">
    <div v-if="promos.length">
      <BlogPreview
        :posts="promos"
        :showTitle="false"
        :showHero="true"
        :showMoreButton="false"
      />
    </div>
    <p v-else class="loading-posts">Cargando promociones…</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BlogPreview from "../components/BlogPreview.vue";
import { useHead } from "@vueuse/head";
import { publicPromocionesService } from "../services/publicPromocionesService.js";

// aquí metes el historial completo (activas + inactivas)
const promos = ref([]);

onMounted(async () => {
  try {
    const { data } = await publicPromocionesService.listAll();
    promos.value = data || [];
  } catch (e) {
    console.error("No se pudo cargar historial de promos", e);
    promos.value = [];
  }
});

useHead({
  title: "Promociones | Respigares",
  meta: [
    { name: "description", content: "Historial de ofertas y promociones de Respigares." },
    { property: "og:title", content: "Promociones | Respigares" },
    { property: "og:description", content: "Consulta todas nuestras promociones activas y anteriores." },
    { property: "og:image", content: "https://www.respigares.es/img/hero-catalogo.jpg" },
    { property: "og:type", content: "website" }
  ],
  link: [{ rel: "canonical", href: "https://www.respigares.es/blog" }]
});
</script>

<style scoped>

.section-hero {
  position: relative;
  width: 100vw;
  min-height: 25vw;
  max-height: 20em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #afacacff;
  margin-bottom: 0;
}
.section-hero-img {
  position: absolute;
  top: 0; left: 0;
  width: 100vw;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(1.05) saturate(1.05);
  pointer-events: none;
  user-select: none;
}
.section-title-tab {
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, #f7f9fb 100%, #f1f4f7 0%);
  border-radius: 2em 2em 1.5em 0;
  padding: 0.1em 2em 0.5em 2em;
  min-width: 8em;
  margin-bottom: -1.3em;
  margin-top: 2em;
  box-shadow: 0 0.1em 1em #0001;
  display: flex;
  justify-content: center;
}
.section-title-tab h1 {
  color: var(--color-main);
  font-size: 2.7rem;
  font-weight: 800;
  text-align: center;
  margin: 1rem;
  letter-spacing: 0.01em;
}
@media (max-width: 700px) {
  .section-hero-img { min-height: 110px; }
  .section-title-tab { padding: 0.5em 0.5em 0.5em 0.5em; }
  .section-title-tab h1 { font-size: 1.5rem; }
}

.animate-fadein {
  animation: aparecer 1.25s cubic-bezier(0.8, 0.1, 0.1, 1);
}
@keyframes aparecer {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.page-wrap {
  margin-top: 1.5rem;
  padding: 2rem 0;
  background: linear-gradient(180deg, #f7f9fb 0%, #f1f4f7 100%);
  min-height: 70vh;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
}
.loading-posts {
  text-align: center;
  color: #999;
  font-size: 1.1rem;
  margin-top: 4rem;
}
@media (max-width: 600px) {
  .page-wrap {
    padding: 0.5rem 0 1.2rem;
  }
}
</style>
