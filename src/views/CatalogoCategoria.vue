<template>
  <div class="catalogo-categoria">
    <!-- Hero reutilizando el estilo del catálogo -->
    <div class="catalogo-hero">
      <img
        :src="heroImg"
        :alt="categoria?.name || 'Catálogo'"
        class="catalogo-hero-img"
      />
      <div class="catalogo-title-tab">
        <h1>{{ categoria?.name || 'Catálogo' }}</h1>
      </div>
    </div>

    <!-- Descripción corta -->
    <div class="catalogo-desc-wrap">
      <p class="catalogo-desc">
        Selecciona una subcategoría para ver los productos de
        <b>{{ categoria?.name }}</b>.
      </p>
    </div>

    <!-- Grid de subcategorías -->
    <section
      v-if="subcats && subcats.length"
      class="subcats contenedor"
    >
      <div class="subcats-grid">
        <!-- Cada subcategoría como “botón gordo” clicable completo -->
        <router-link
          v-for="(sub, idx) in subcats"
          :key="sub.id ?? sub.name"
          class="subcat-card__wrapper animate-stagger"
          :style="`animation-delay: ${idx * 110}ms;`"
          :to="{
            name: 'Catalogo',
            query: { cat: catId, sub: sub.id }
          }"
        >
          <article class="subcat-card">
            <img
              :src="`/${sub.image}`"
              :alt="sub.name"
              class="subcat-card__img"
            />
            <h3 class="subcat-card__title">{{ sub.name }}</h3>

            <span class="subcat-card__cta">
              VER PRODUCTOS
            </span>
          </article>
        </router-link>
      </div>
    </section>

    <!-- Caso sin subcategorías configuradas -->
    <section v-else class="subcats contenedor">
      <p class="no-subcats">
        Esta familia aún no tiene subcategorías configuradas.
      </p>
      <router-link
        :to="{ name: 'Catalogo', query: { cat: catId } }"
        class="subcat-card__cta subcat-card__cta--inline"
      >
        Ver todos los productos de {{ categoria?.name }}
      </router-link>
    </section>

    <!-- Volver al listado de familias -->
    <div class="volver-wrap">
      <button class="btn-volver" @click="goBack">
        Volver al catálogo
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// catId viene del parámetro de la ruta /catalogo/:catId
const catId = computed(() => route.params.catId ?? route.query.cat ?? null);

const categorias = ref([]);

// Cargamos categorias.json una vez
onMounted(async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}categorias.json`);
  if (res.ok) {
    categorias.value = await res.json();
  }
});

// Categoría actual (familia principal)
const categoria = computed(() =>
  categorias.value.find(
    (c) => String(c.id) === String(catId.value)
  )
);

// Subcategorías de esa familia
const subcats = computed(() => categoria.value?.subcategorias || []);

// Imagen del hero
const heroImg = computed(() =>
  categoria.value ? `/${categoria.value.image}` : "/img/hero-catalogo.jpg"
);

// Volver al listado principal de familias
function goBack() {
  router.push({ name: "Catalogo" });
}
</script>

<style scoped>
/* =========================
   HERO (mismo estilo que catálogo)
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
  background: #fff;
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
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  text-align: center;
  margin: 0.5rem;
  letter-spacing: 0.02em;
}

/* =========================
   DESCRIPCIÓN
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
  font-size: 1.04em;
  padding: 0 2em;
  line-height: 1.6;
}

.catalogo-desc b {
  color: #464b55;
  font-weight: 700;
}

/* =========================
   GRID DE SUBCATEGORÍAS (botones)
   ========================= */
.subcats {
  width: 100%;
  max-width: 78em;
  margin: 0 auto 3em auto;
  padding-inline: 2.5em;
  box-sizing: border-box;
}

/* Flex para centrar última fila */
.subcats-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2.2em 2.4em;
}

/* Wrapper = router-link (toda la card es clicable) */
.subcat-card__wrapper {
  flex: 1 1 14rem;
  max-width: 18rem;
  text-decoration: none;
  color: inherit;
  display: flex;
}

/* Card tipo “botón gordo” */
.subcat-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f7f8fb;
  border-radius: 1.2rem;
  padding: 1.5rem 1.1rem 1.7rem 1.1rem;
  text-align: center;
  box-shadow: 0 0.18rem 0.9rem rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e9f0;
  transition:
    transform 0.18s ease,
    box-shadow 0.2s ease,
    border-color 0.18s ease,
    background 0.18s ease;
}

/* Hover sobre el wrapper: profundidad y color */
.subcat-card__wrapper:hover .subcat-card {
  background: #ffffff;
  transform: translateY(-0.18rem) scale(1.02);
  box-shadow: 0 0.7rem 2rem rgba(0, 0, 0, 0.16);
  border-color: rgba(171, 10, 61, 0.55);
}

/* Imagen */
.subcat-card__img {
  width: 11em;
  height: 11em;
  object-fit: cover;
  border-radius: 0.5em;
  box-shadow: 0 2px 8px #0002;
  margin-bottom: 0.8em;
}

/* Título */
.subcat-card__title {
  margin: 0 0 0.7em;
  font-size: 1.08rem;
  font-weight: 800;
  color: #767676;
  letter-spacing: -0.02em;
}

/* CTA interno tipo pill */
.subcat-card__cta {
  margin-top: 0.4rem;
  padding: 0.55em 1.9em;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
  border-radius: 999px;
  letter-spacing: 0.08em;
  box-shadow: 0 0.12rem 0.6rem rgba(0, 0, 0, 0.18);
  display: inline-block;
  text-transform: uppercase;
}

/* CTA en el bloque “sin subcats” */
.subcat-card__cta--inline {
  display: inline-block;
  margin: 0.5rem auto 0 auto;
}

/* Hover: resaltar CTA también */
.subcat-card__wrapper:hover .subcat-card__cta,
.subcat-card__cta--inline:hover {
  background: #ab0a3d;
  letter-spacing: 0.11em;
}

/* Texto sin subcategorías */
.no-subcats {
  text-align: center;
  margin: 2em 0 1em;
  color: #666;
}

/* =========================
   BOTÓN VOLVER
   ========================= */
.volver-wrap {
  text-align: center;
  margin-bottom: 3em;
}

.btn-volver {
  border: 10px;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #ffffffff;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.98rem;
  letter-spacing: 0.04em;
}

.btn-volver:hover {
  background: var(--color-blue);
  transform: scaleY(1);
  transition: 0.2s;
}

/* =========================
   RESPONSIVE
   ========================= */
@media (max-width: 700px) {
  .catalogo-desc {
    font-size: 0.98em;
    padding: 0 0.8em;
  }

  .subcats {
    padding-inline: 1rem;
  }

  .subcats-grid {
    gap: 1.4em;
  }

  .subcat-card__wrapper {
    max-width: 100%;
  }

  .subcat-card {
    padding: 1.2rem 0.9rem 1.5rem 0.9rem;
  }

  .subcat-card__img {
    width: 8.5em;
    height: 8.5em;
  }
}

/* Animación de aparición tipo “stagger” */
.animate-stagger {
  opacity: 0;
  animation: subcatFadeUp 1.1s cubic-bezier(0.8, 0.1, 0.1, 1) forwards;
}

@keyframes subcatFadeUp {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
