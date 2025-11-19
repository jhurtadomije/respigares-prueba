<template>
  <div v-if="producto" class="pd-wrapper">
    <div class="pd-shell">
      <!-- Breadcrumb -->
      <nav class="pd-breadcrumb">
        <RouterLink to="/">Inicio</RouterLink>
        <span>›</span>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <template v-if="producto.categoria">
          <span>›</span>
          <span class="crumb-pill">
            {{ categoriaLabel }}
            <span v-if="producto.subcategoria">
              / {{ subcategoriaLabel }}
            </span>
          </span>
        </template>
      </nav>

      <!-- FICHA PRINCIPAL -->
      <section class="pd-card">
        <!-- Columna izquierda: galería -->
        <div class="pd-col pd-col--media">
          <div class="pd-main-image">
            <span class="pd-badge" v-if="producto.tags?.length">
              Destacado
            </span>

            <!-- Imagen principal con fallback -->
            <img
              v-if="mainImage"
              :src="buildImagenUrl(mainImage)"
              :alt="producto.nombre"
              class="producto-detalle_img-principal"
              @error="onImgError"
            />
            <img
              v-else
              :src="buildImagenUrl(producto?.imagen)"
              :alt="producto?.nombre || 'Producto sin imagen'"
              class="producto-detalle_img-principal"
              @error="onImgError"
            />
          </div>

          <!-- Miniaturas -->
          <div
            v-if="producto.galeria && producto.galeria.length > 1"
            class="pd-thumbs"
          >
            <button
              v-for="(img, i) in producto.galeria"
              :key="i"
              type="button"
              class="pd-thumb"
              :class="{ 'pd-thumb--active': img === mainImage }"
              @click="changeImage(img)"
            >
              <img
                :src="buildImagenUrl(img)"
                :alt="producto.nombre"
                @error="onImgError"
              />
            </button>
          </div>
        </div>

        <!-- Columna derecha: info -->
        <div class="pd-col pd-col--info">
          <header class="pd-header">
            <div class="pd-header-main">
              <h1 class="pd-title">{{ producto.nombre }}</h1>

              <p v-if="producto.marca" class="pd-brand">
                <span class="pd-brand-label">Marca</span>
                <span class="pd-brand-name">{{ producto.marca }}</span>
              </p>
            </div>

            <div class="pd-meta">
              <span v-if="producto.sku" class="pd-meta-chip">
                SKU: {{ producto.sku }}
              </span>
              <span class="pd-meta-chip">
                {{ categoriaLabel }}
                <span v-if="producto.subcategoria">
                  · {{ subcategoriaLabel }}
                </span>
              </span>
            </div>
          </header>

          <section v-if="producto.descripcion" class="pd-description">
            <h2>Descripción del producto</h2>
            <p>{{ producto.descripcion }}</p>
          </section>

          <section
            v-if="producto.tags && producto.tags.length"
            class="pd-tags"
          >
            <h3>Características destacadas</h3>
            <div class="pd-tags-list">
              <span
                v-for="tag in producto.tags"
                :key="tag"
                class="pd-tag"
              >
                {{ tag }}
              </span>
            </div>
          </section>

          <!-- CTA -->
          <section class="pd-cta">
            <p class="pd-cta-text">
              ¿Te interesa este producto para tu negocio?
              <br />
              Contacta con el departamento comercial para obtener más información.
            </p>
            <div class="pd-cta-actions">
              <button
                type="button"
                class="pd-btn pd-btn--primary"
                @click="abrirContacto"
              >
                Solicitar información
              </button>

              <RouterLink to="/catalogo" class="pd-btn pd-btn--ghost">
                Volver al catálogo
              </RouterLink>
            </div>
          </section>
        </div>
      </section>

      <!-- PRODUCTOS RELACIONADOS (CARRUSEL) -->
      <section
        v-if="relatedProducts.length"
        class="pd-related"
      >
        <div class="pd-related-header">
          <div>
            <h2>Productos relacionados</h2>
            <p>Creemos que también podrían interesarte estos productos...</p>
          </div>

          <div
            v-if="relatedProducts.length > 2"
            class="pd-related-controls"
          >
            <button
              type="button"
              class="pd-ctrl-btn"
              @click="scrollRelated('left')"
            >
              ‹
            </button>
            <button
              type="button"
              class="pd-ctrl-btn"
              @click="scrollRelated('right')"
            >
              ›
            </button>
          </div>
        </div>

        <div class="pd-related-strip" ref="relatedStrip">
          <RouterLink
            v-for="p in relatedProducts"
            :key="p.id"
            class="pd-related-card"
            :to="{ name: route.name, params: { sku: p.sku } }"
          >
            <div class="pd-related-img-wrapper">
              <img
                :src="buildImagenUrl(p.galeria?.[0] || p.imagen)"
                :alt="p.nombre"
                @error="onImgError"
              />
            </div>
            <div class="pd-related-body">
              <h3 class="pd-related-title">
                {{ p.nombre }}
              </h3>
              <p v-if="p.marca" class="pd-related-brand">
                {{ p.marca }}
              </p>
              <p class="pd-related-chip">
                {{ formatLabel(p.subcategoria || p.categoria) }}
              </p>
            </div>
          </RouterLink>
        </div>
      </section>
    </div>
  </div>

  <!-- Estado: producto no encontrado -->
  <div v-else class="pd-wrapper pd-wrapper--empty">
    <div class="pd-empty-card">
      <p>Producto no encontrado.</p>
      <RouterLink to="/catalogo" class="pd-btn pd-btn--ghost">
        ⬅ Volver al catálogo
      </RouterLink>
    </div>
  </div>
</template>


<script setup>
import { computed, ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useCatalogo } from "../composables/useCatalogo";
import { openContactForProducto } from "../contactModalState";

const route = useRoute();
const { list, load } = useCatalogo();

const DEFAULT_IMG = "img/default.jpg"; // 👈 está en /public/img/default.jpg

// Cargar catálogo si aún no está en memoria
onMounted(async () => {
  if (!list.value.length) {
    await load();
  }
});

// Producto actual (por SKU)
const producto = computed(() => {
  const skuParam = String(route.params.sku ?? "");
  if (!skuParam) return null;
  return list.value.find((p) => String(p.sku) === skuParam) || null;
});

// -------- helpers de etiquetas bonitas --------
function formatLabel(str) {
  if (!str) return "";
  return String(str)
    .replace(/_/g, " ")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const categoriaLabel = computed(() => {
  return formatLabel(producto.value?.categoria) || "Sin categoría";
});

const subcategoriaLabel = computed(() => {
  return formatLabel(producto.value?.subcategoria);
});

// -------- galería principal --------
const mainImage = ref(null);

watch(
  producto,
  (p) => {
    if (p && p.galeria && p.galeria.length) {
      mainImage.value = p.galeria[0];
    } else if (p?.imagen) {
      mainImage.value = p.imagen;
    } else {
      mainImage.value = null;
    }
  },
  { immediate: true }
);

function changeImage(img) {
  mainImage.value = img;
}

// -------- productos relacionados --------
const relatedProducts = computed(() => {
  if (!producto.value) return [];

  const sku = producto.value.sku;
  const cat = producto.value.categoria;
  const sub = producto.value.subcategoria;

  const mismoCat = list.value.filter(
    (p) => p.sku !== sku && p.categoria === cat
  );

  if (!mismoCat.length) return [];

  if (sub) {
    const mismosub = mismoCat.filter((p) => p.subcategoria === sub);
    if (mismosub.length >= 4) {
      return mismosub.slice(0, 12);
    }
    const resto = mismoCat.filter((p) => p.subcategoria !== sub);
    return [...mismosub, ...resto].slice(0, 12);
  }

  return mismoCat.slice(0, 12);
});

// -------- carrusel relacionados --------
const relatedStrip = ref(null);

function scrollRelated(direction) {
  const el = relatedStrip.value;
  if (!el) return;
  const delta = direction === "left" ? -320 : 320;
  el.scrollBy({ left: delta, behavior: "smooth" });
}

// -------- helpers de imagen + fallback --------
function buildImagenUrl(path) {
  if (!path) return DEFAULT_IMG;

  // Si ya es absoluta (por si algún día metes URLs externas)
  if (/^https?:\/\//i.test(path)) return path;

  const base =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";

  return new URL(path, base).href;
}

function onImgError(e) {
  // Evitamos bucle infinito si default.jpg también falla
  if (e.target.dataset.fallback) return;
  e.target.dataset.fallback = "1";
  e.target.src = DEFAULT_IMG;
}

// conectamos con el modal de contacto
function abrirContacto() {
  if (!producto.value) return;
  openContactForProducto(producto.value);
}
</script>


<style scoped>
/* Fondo general */
.pd-wrapper {
  min-height: 80vh;
  padding: 2.8rem 1rem 3rem;
  background: radial-gradient(circle at top left, #f9fbff 0, #eef3ff 35%, #ffffff 100%);
}

.pd-shell {
  max-width: 1200px;
  margin: 0 auto;
}

/* Breadcrumb */
.pd-breadcrumb {
  font-size: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  align-items: center;
  color: #667085;
}
.pd-breadcrumb a {
  color: #2563eb;
  text-decoration: none;
}
.pd-breadcrumb a:hover {
  text-decoration: none;
  color: var(--color-main);
}
.crumb-pill {
  background: #e5edff;
  border-radius: 999px;
  padding: 0.15rem 0.7rem;
}

/* Card principal */
.pd-card {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.4fr);
  gap: 3rem;
  padding: 2.2rem 2rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 26px 55px rgba(15, 23, 42, 0.1);
  border: 1px solid rgba(148, 163, 184, 0.25);
  backdrop-filter: blur(12px);
  min-height: 500px; /* más altura general */
  align-items: stretch;
}

.pd-col {
  min-width: 0;
}

/* Galería */
.pd-main-image {
  position: relative;
  border-radius: 20px;
  padding: 1.1rem;
  border: 1px solid #e5e7eb;
  background: linear-gradient(145deg, #ffffff, #f3f4ff);
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 430px;  /* más alta */
  max-height: 600px;
  overflow: hidden;
}
.pd-main-image img {
  max-width: 100%;
  height: 550px;
  max-height: 600px;
  object-fit: contain;
  transition: transform 0.35s ease, filter 0.25s ease;
}
.pd-main-image:hover img {
  transform: scale(1.05);
  filter: saturate(1.08);
}
.pd-main-image__placeholder {
  color: #9ca3af;
  font-size: 0.95rem;
}

/* Badge “destacado” */
.pd-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: linear-gradient(135deg, #f97316, #ea580c);
  color: #fff;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  box-shadow: 0 10px 25px rgba(248, 113, 22, 0.35);
}

/* Miniaturas */
.pd-thumbs {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
  overflow-x: auto;
  padding-bottom: 0.3rem;
}
.pd-thumb {
  border: 1px solid transparent;
  padding: 0.15rem;
  border-radius: 10px;
  background: #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 0 0 auto;
}
.pd-thumb img {
  width: 58px;
  height: 58px;
  border-radius: 8px;
  object-fit: cover;
}
.pd-thumb:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 18px rgba(15, 23, 42, 0.2);
}
.pd-thumb--active {
  border-color: #2563eb;
  background: #e0ebff;
}

/* Info derecha */
.pd-header-main {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}
.pd-title {
  font-size: 2rem;
  margin: 0.5rem 0 0 0;
  color: #0f172a;
  letter-spacing: 0.01em;
}
.pd-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 1.1rem;
  color: #4b5563;
}
.pd-brand-label {
  padding: 0.1rem 0.6rem;
  border-radius: 999px;
  background: #e5edff;
  color: #1d4ed8;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
.pd-brand-name {
  font-weight: 600;
}

/* Meta chips */
.pd-meta {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
}
.pd-meta-chip {
  font-size: 0.9rem;
  color: #475569;
  background: #f1f5f9;
  border-radius: 999px;
  padding: 0.7rem 0.8rem;
}

/* Descripción */
.pd-description {
  margin-top: 1.2rem;
}
.pd-description h2 {
  font-size: 1rem;
  margin: 0 0 0.4rem;
  color: #111827;
}
.pd-description p {
  margin: 0;
  font-size: 0.93rem;
  line-height: 1.7;
  color: #4b5563;
}

/* Tags */
.pd-tags {
  margin-top: 1.2rem;
}
.pd-tags h3 {
  font-size: 0.9rem;
  margin: 0 0 0.3rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #6b7280;
}
.pd-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}
.pd-tag {
  font-size: 0.78rem;
  padding: 0.28rem 0.65rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
}

/* CTA */
.pd-cta {
  margin-top: 3rem;
  padding-top: 3rem;
  border-top: 1px dashed #e5e7eb;
}
.pd-cta-text {
  margin: 1rem 0 3rem;
  font-size: 1.2rem;
  color: #374151;
}
.pd-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

/* Botones reutilizables */
.pd-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.1rem;
  border-radius: 999px;
  border: 1px solid transparent;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
}
.pd-btn--primary {
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  box-shadow: 0 14px 30px rgba(248, 52, 38, 0.35);
}
.pd-btn--primary:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 18px 40px rgba(37, 99, 235, 0.45);
}
.pd-btn--ghost {
  background: linear-gradient(135deg, var(--color-blue), var(--color-gray));
  color: #ffffffff;
 box-shadow: 0 18px 40px rgba(37, 99, 235, 0.45);
}
.pd-btn--ghost:hover {
  box-shadow: 0 14px 30px rgba(248, 52, 38, 0.35);
  filter: brightness(1.05);
  transform: translateY(-1px);
  
}

/* Estado vacío */
.pd-wrapper--empty {
  display: flex;
  align-items: center;
  justify-content: center;
}
.pd-empty-card {
  padding: 2rem 1.8rem;
  border-radius: 18px;
  background: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.12);
  text-align: center;
}

/* -------- RELACIONADOS (CARRUSEL) -------- */
.pd-related {
  margin-top: 2.4rem;
}
.pd-related-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.4rem;
}
.pd-related-header h2 {
  margin: 0;
  font-size: 1.1rem;
  color: #111827;
}
.pd-related-header p {
  margin: 0.2rem 0 0;
  font-size: 0.88rem;
  color: #6b7280;
}

/* Controles carrusel */
.pd-related-controls {
  display: flex;
  gap: 0.4rem;
}
.pd-ctrl-btn {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: #ffffff;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  color: #4b5563;
  transition: all 0.18s ease;
}
.pd-ctrl-btn:hover {
  background: #eef2ff;
  border-color: #94a3b8;
  color: #1d4ed8;
}

/* Tira horizontal */
.pd-related-strip {
  display: flex;
  flex-wrap: nowrap;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.4rem;
  margin-top: 0.6rem;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}
.pd-related-strip::-webkit-scrollbar {
  height: 6px;
}
.pd-related-strip::-webkit-scrollbar-track {
  background: transparent;
}
.pd-related-strip::-webkit-scrollbar-thumb {
  background: #cbd5f5;
  border-radius: 999px;
}

/* Card relacionada */
.pd-related-card {
  text-decoration: none;
  background: #ffffff;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.06);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-width: 220px;
  max-width: 260px;
  scroll-snap-align: start;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease;
}
.pd-related-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 16px 30px rgba(15, 23, 42, 0.12);
  border-color: #c4d3ff;
}
.pd-related-img-wrapper {
  background: #f9fafb;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 140px;
}
.pd-related-img-wrapper img {
  max-width: 100%;
  max-height: 130px;
  object-fit: contain;
}
.pd-related-body {
  padding: 0.75rem 0.8rem 0.8rem;
}
.pd-related-title {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
  color: #111827;
}
.pd-related-brand {
  margin: 0 0 0.3rem;
  font-size: 0.8rem;
  color: #6b7280;
}
.pd-related-chip {
  font-size: 0.76rem;
  padding: 0.22rem 0.55rem;
  border-radius: 999px;
  background: #eef2ff;
  color: #4338ca;
  display: inline-block;
}

/* Responsive */
@media (max-width: 900px) {
  .pd-wrapper {
    padding: 2rem 0.8rem 2.5rem;
  }
  .pd-card {
    grid-template-columns: 1fr;
    padding: 1.6rem 1.2rem;
    min-height: 0;
  }
  .pd-main-image {
    min-height: 260px;
  }
}
</style>
