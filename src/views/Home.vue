<!-- src/views/Home.vue -->
<template>
  <section v-scroll-random-reveal>
    <Hero />
  </section>

  <main class="home-content contenedor">
    <CatalogPreview :categories="categoriesPreview" />

    <section v-scroll-random-reveal>
      <SomosPreview />
    </section>

    <section v-scroll-random-reveal>
      <BrandsCarousel />
    </section>

    <section v-scroll-random-reveal>
      <BlogPreview :posts="postsPreview" />
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useHead } from "@vueuse/head";

import Hero from "../components/Hero.vue";
import SomosPreview from "../components/SomosPreview.vue";
import CatalogPreview from "../components/CatalogPreview.vue";
import BrandsCarousel from "../components/BrandsCarousel.vue";
import BlogPreview from "../components/BlogPreview.vue";

const categoriesPreview = ref([]);
const postsPreview = ref([]);
const isLoading = ref(false);
const loadError = ref(null);

async function loadHomeData() {
  isLoading.value = true;
  loadError.value = null;

  const base = import.meta.env.BASE_URL;

  try {
    // Cargar en paralelo (mejor TTFB/LCP)
    const [catRes, postRes] = await Promise.all([
      fetch(`${base}categorias.json`, { cache: "force-cache" }),
      fetch(`${base}posts.json`, { cache: "force-cache" }),
    ]);

    if (catRes.ok) {
      categoriesPreview.value = await catRes.json();
    } else {
      console.warn("No se encontró categorias.json en", `${base}categorias.json`);
      categoriesPreview.value = [];
    }

    if (postRes.ok) {
      const allPosts = await postRes.json();
      postsPreview.value = allPosts.slice(0, 4);
    } else {
      console.warn("No se encontró posts.json en", `${base}posts.json`);
      postsPreview.value = [];
    }
  } catch (err) {
    console.error("Error cargando datos de Home:", err);
    loadError.value = err;
    categoriesPreview.value = [];
    postsPreview.value = [];
  } finally {
    isLoading.value = false;
  }
}

onMounted(loadHomeData);

// Head SEO (home)
useHead(() => ({
  title: "Respigares | Distribución de productos gourmet en Andalucía",
  meta: [
    {
      name: "description",
      content:
        "Distribuimos más de 4.000 referencias de alimentos gourmet y productos premium para hostelería y particulares. Calidad, confianza y cercanía desde 1971.",
    },

    // Robots explícito (por claridad)
    { name: "robots", content: "index,follow" },

    // Open Graph
    {
      property: "og:title",
      content: "Respigares | Distribución de productos gourmet en Andalucía",
    },
    {
      property: "og:description",
      content:
        "Representaciones Espigares: calidad, confianza y un amplio catálogo de productos de alimentación.",
    },
    {
      property: "og:image",
      content: "https://www.respigares.es/img/hero-catalogo.jpg",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.respigares.es/" },
    { property: "og:site_name", content: "Respigares" },
    { property: "og:locale", content: "es_ES" },

    // Twitter Cards
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Respigares | Distribución de productos gourmet en Andalucía",
    },
    {
      name: "twitter:description",
      content:
        "Distribuimos más de 4.000 referencias gourmet para hostelería y particulares.",
    },
    {
      name: "twitter:image",
      content: "https://www.respigares.es/img/hero-catalogo.jpg",
    },
  ],
  link: [{ rel: "canonical", href: "https://www.respigares.es/" }],

  // JSON-LD básico para Home
  // Si ya lo tienes en App.vue/Layout, puedes quitar este bloque para no duplicar.
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Respigares",
        url: "https://www.respigares.es/",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://www.respigares.es/catalogo?search={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      }),
    },
  ],
}));
</script>

<style scoped>
.home-content {
  margin-top: 70px;
  padding: 1.5rem 1rem 3rem;
  box-sizing: border-box;
}

/* Espaciado entre secciones de la home */
.home-content > section {
  margin-bottom: 2.5rem;
}

/* Ajustes responsive */
@media (min-width: 768px) {
  .home-content {
    margin-top: 6rem;
    padding: 3rem 0 4rem;
  }

  .home-content > section {
    margin-bottom: 3.5rem;
  }
}
</style>
