<template>
  <!-- Cabecera visual con imagen de fondo -->
  <div class="catalogo-hero animate-fadein">
    <img
      src="/img/hero-catalogo.jpg"
      alt="Catálogo de productos"
      class="catalogo-hero-img"
    />
    <div class="catalogo-title-tab animate-fadein">
      <h1>Catálogo</h1>
    </div>
  </div>

  <!-- Descripción debajo de la pestaña -->
  <div class="catalogo-desc-wrap animate-fadein-slow">
    <p class="catalogo-desc">
      Representamos y distribuimos
      <b>más de 4.000 referencias de alimentos de primera calidad</b>, tanto en
      formato de distribución para canal HORECA como en formato para consumo de
      clientes particulares a través de grandes cuentas o detallistas. Te
      invitamos a visitar cada una de las categorías de nuestro catálogo y
      <b
        >no dudes en contactar con nuestro departamento comercial para atenderte
        como mereces</b
      >.
    </p>
  </div>

  <!-- Vista de productos de una categoría -->
  <div v-if="categoriaSeleccionada" class="catalogo-productos-contenedor">
    <h2 class="catalogo-cat-title">
      Productos en "{{ categoriaSeleccionada.name }}"
    </h2>
    <div v-if="isLoading" class="catalogo-loading">
      <img
        src="/img/iconos/loading.gif"
        alt="Cargando productos"
        class="loading-gif"
      />
    </div>

    <div v-else-if="error" class="catalogo-error">
      <p>Ha ocurrido un error al cargar los productos.</p>
      <button class="btn-volver-categorias" @click="load">Reintentar</button>
    </div>
    <div v-else-if="productosFiltrados.length" class="grid-productos">
      <ProductCard
        v-for="(producto, idx) in productosFiltrados"
        :key="producto.sku"
        :producto="producto"
        :delay="idx * 140"
      />
    </div>

    <div v-else class="no-productos">No hay productos para esta categoría.</div>

    <button class="btn-volver-categorias" @click="volverCategorias">
      Volver al catálogo
    </button>
  </div>

  <!-- Si NO hay categoría seleccionada, muestra las categorías como hasta ahora -->
  <section v-else class="catalogo contenedor">
    <div class="catalogo-grid">
      <router-link
        v-for="(cat, idx) in categories"
        :key="cat.id"
        :to="{ name: 'catalogoCategoria', params: { catId: cat.id } }"
        class="categoria-card__wrapper animate-stagger"
        :style="`animation-delay: ${idx * 120}ms;`"
      >
        <article class="categoria-card">
          <img :src="cat.image" :alt="cat.name" class="categoria-card__img" />
          <h3 class="categoria-card__title">{{ cat.name }}</h3>
          <span class="categoria-card__cta">VER PRODUCTOS</span>
        </article>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import ProductCard from "../components/ProductCard.vue";
import { useCatalogo } from "../composables/useCatalogo";

const categories = ref([]);
const route = useRoute();
const router = useRouter();

const { load, list, isLoading, error } = useCatalogo();

onMounted(async () => {
  // 1) Cargar categorías desde categorias.json
  try {
    const catRes = await fetch(`${import.meta.env.BASE_URL}categorias.json`);
    if (catRes.ok) {
      categories.value = await catRes.json();
    } else {
      console.warn("No se pudo cargar categorias.json", catRes.status);
    }
  } catch (e) {
    console.error("Error cargando categorias.json", e);
  }

  // 2) Cargar catálogo (productos.json)
  try {
    await load();
  } catch (e) {
    // ya se muestra el console.error en el composable
  }
});

// Categoría seleccionada a partir de la query ?cat=...
const categoriaSeleccionada = computed(() =>
  categories.value.find((cat) => String(cat.id) === String(route.query.cat))
);

// Productos filtrados por categoría principal y, opcionalmente, subcategoría (?sub=...)
const productosFiltrados = computed(() => {
  if (!route.query.cat) return [];

  const catId = String(route.query.cat);
  const subId = route.query.sub ? String(route.query.sub) : null;

  return list.value.filter((p) => {
    const mismaCat = String(p.categoria) === catId;
    const mismaSub = !subId || String(p.subcategoria) === subId;
    return mismaCat && mismaSub;
  });
});

// Botón "Volver a categorías"
function volverCategorias() {
  router.push({ path: "/catalogo" });
}

useHead({
  title: "Catálogo de productos | Respigares",
  meta: [
    {
      name: "description",
      content:
        "Consulta nuestro catálogo con más de 4.000 referencias de productos de alimentación gourmet y primeras marcas. Distribución profesional para hostelería y particulares.",
    },
    {
      property: "og:title",
      content: "Catálogo de productos | Respigares",
    },
    {
      property: "og:description",
      content:
        "Distribuimos alimentos premium: conservas, aceites, encurtidos, y mucho más. Solicita información sin compromiso.",
    },
    {
      property: "og:image",
      content: "https://www.respigares.es/img/hero-catalogo.jpg",
    },
    { property: "og:type", content: "website" },
  ],
  link: [{ rel: "canonical", href: "https://www.respigares.es/catalogo" }],
});
</script>

<style scoped>
/* =========================
   HERO DEL CATÁLOGO
   ========================= */
.catalogo-hero {
  position: relative;
  width: 100%;
  max-width: 100vw;
  min-height: 14vw;
  max-height: 20rem;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0;
}

.catalogo-hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  filter: brightness(1.05) saturate(1.05);
  pointer-events: none;
  user-select: none;
}

.catalogo-title-tab {
  position: relative;
  z-index: 2;
  background: linear-gradient(180deg, #f7f9fb 100%, #f1f4f7 0%);
  border-radius: 1.3em 1.3em 0 0;
  padding: 1.4em 2.4em 0.85em 2.4em;
  min-width: 8em;
  margin-bottom: -1.3em;
  margin-top: 2.2em;
  box-shadow: 0 0.1em 1em #0001;
  display: flex;
  justify-content: center;
}

.catalogo-title-tab h1 {
  color: #ab0a3d;
  font-size: clamp(1.9rem, 3.3vw, 2.7rem);
  font-weight: 800;
  text-align: center;
  margin: 0.6rem;
  letter-spacing: 0.02em;
}

/* =========================
   DESCRIPCIÓN INTRO
   ========================= */
.catalogo-desc-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
}

.catalogo-desc {
  margin: 3em auto 1.8em auto;
  max-width: 50em;
  color: #4a4a4a;
  text-align: center;
  font-size: 1.08em;
  background: none;
  padding: 0 2em;
  line-height: 1.65;
}

.catalogo-desc b {
  color: #464b55;
  font-weight: 700;
}

/* =========================
   VISTA PRODUCTOS (CAT SELECTED)
   ========================= */
.catalogo-productos-contenedor {
  max-width: 75rem;
  margin: 2.5rem auto 3rem auto;
  padding-inline: 1.5rem;
  box-sizing: border-box;
  text-align: center;
}

.catalogo-cat-title {
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  color: var(--color-main);
  font-weight: 800;
  margin-bottom: 1.6rem;
}

.no-productos {
  margin: 2.2rem 0;
  color: #777;
  font-size: 1rem;
}

/* Grid de cards de producto (ProductCard) */
.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin: 2.2em 0;
}

/* Botón volver */
.btn-volver-categorias {
  margin: 2rem auto 0 auto;
  padding: 0.8rem 1.8rem;
  border-radius: 999px;
  border: none;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: 0.04em;
  cursor: pointer;
  box-shadow: 0 0.15rem 0.9rem rgba(171, 10, 61, 0.28);
  transition: background 0.18s ease, transform 0.12s ease, box-shadow 0.18s ease;
}

.btn-volver-categorias:hover {
  background: #92243d;
  transform: translateY(-1px);
  box-shadow: 0 0.25rem 1.1rem rgba(171, 10, 61, 0.32);
}

/* =========================
   VISTA CATEGORÍAS (SIN CAT)
   ========================= */
.catalogo {
  width: 100%;
  max-width: 78em;
  margin: 0 auto 3em auto;
  padding-inline: 2.5em;
  box-sizing: border-box;
  background: transparent;
}

/* Flex para centrar la última fila como en el preview */
.catalogo-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.4em 2.6em;
  margin: 2em 0 0 0;
}
.loading-gif {
  max-width: 120px;
  width: 20vw;          /* se escala un poco según pantalla */
  height: auto;
}
/* Wrapper = router-link, toda la card es clicable */
.categoria-card__wrapper {
  flex: 1 1 14rem;
  max-width: 18rem;
  text-decoration: none;
  color: inherit;
  display: flex;
}

/* Card de categoría – look de botón gordo */
.categoria-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fb;
  border-radius: 1.4rem;
  padding: 1.5rem 1.1rem 1.7rem 1.1rem;
  text-align: center;
  box-shadow: 0 0.18rem 0.9rem rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e9f0;
  transition: transform 0.18s ease, box-shadow 0.2s ease,
    border-color 0.18s ease, background 0.18s ease;
}

/* hover: botón “premium” sobre TODO el bloque */
.categoria-card__wrapper:hover .categoria-card {
  background: #ffffff;
  transform: translateY(-0.18rem) scale(1.02);
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.16);
  border-color: rgba(171, 10, 61, 0.55);
}

.categoria-card__img {
  width: 13em;
  height: 13em;
  object-fit: cover;
  margin-bottom: 0.9em;
  border-radius: 0.4em;
  box-shadow: 0 2px 8px #0002;
}

.categoria-card__title {
  margin: 0 0 0.7em 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #767676;
  letter-spacing: -0.02em;
  text-align: center;
  line-height: 1.2;
}

/* CTA dentro de la card (botoncito) */
.categoria-card__cta {
  margin-top: auto;
  padding: 0.55em 1.9em;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 999px;
  letter-spacing: 0.08em;
  box-shadow: 0 0.15rem 0.6rem rgba(0, 0, 0, 0.18);
  display: inline-block;
  text-transform: uppercase;
}

/* Hover sobre el wrapper: realzar el CTA también */
.categoria-card__wrapper:hover .categoria-card__cta {
  background: #ab0a3d;
  letter-spacing: 0.11em;
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 700px) {
  .catalogo-hero-img {
    min-height: 110px;
  }
  .catalogo-title-tab {
    padding: 0.9em 0.9em 0.7em 0.9em;
    margin-top: 1.6em;
  }
  .catalogo-title-tab h1 {
    font-size: 1.6rem;
  }
  .catalogo-desc {
    font-size: 0.98rem;
    padding: 0 0.7em;
  }

  .catalogo {
    padding-inline: 0.8em;
  }

  .catalogo-grid {
    gap: 1.4em;
  }

  .categoria-card__wrapper {
    max-width: 100%;
  }

  .categoria-card {
    padding: 1.1rem 0.9rem 1.4rem 0.9rem;
  }

  .categoria-card__img {
    width: 9em;
    height: 9em;
  }
}

/* Animaciones de aparición */
.animate-fadein {
  animation: aparecer 1.08s cubic-bezier(0.8, 0.1, 0.1, 1);
}
.animate-fadein-slow {
  animation: aparecer 1.5s cubic-bezier(0.8, 0.1, 0.1, 1);
}
.animate-stagger {
  opacity: 0;
  animation: aparecer 1.2s cubic-bezier(0.8, 0.1, 0.1, 1) forwards;
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
</style>
