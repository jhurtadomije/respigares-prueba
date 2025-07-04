<template>
  <!-- Cabecera visual con imagen de fondo -->
  <div class="catalogo-hero animate-fadein">
    <img src="/img/hero-catalogo.jpg" alt="Catálogo de productos" class="catalogo-hero-img" />
    <div class="catalogo-title-tab animate-fadein">
      <h1>Catálogo</h1>
    </div>
  </div>

  <!-- Descripción debajo de la pestaña -->
  <div class="catalogo-desc-wrap animate-fadein-slow">
    <p class="catalogo-desc">
      Representamos y distribuimos <b>más de 4.000 referencias de alimentos de primera calidad</b>, tanto en formato de distribución para canal HORECA como en formato para consumo de clientes particulares a través de grandes cuentas o detallistas.
      Te invitamos a visitar cada una de las categorías de nuestro catálogo y <b>no dudes en contactar con nuestro departamento comercial para atenderte como mereces</b>.
    </p>
  </div>
<!-- Grid de categorías -->
  <div v-if="categoriaSeleccionada" class="catalogo-productos-contenedor">
    <h2 class="catalogo-cat-title">Productos en "{{ categoriaSeleccionada.name }}"</h2>
    <div v-if="productosFiltrados.length" class="grid-productos">
      <ProductCard
        v-for="(producto, idx) in productosFiltrados"
        :key="producto.nombre"
        :producto="producto"
        :delay="idx * 140"
      />
    </div>
    <div v-else class="no-productos">
      No hay productos para esta categoría.
    </div>
    <button class="btn-volver-categorias" @click="volverCategorias">← Volver a categorías</button>
  </div>

  
  <!-- Si NO hay categoría seleccionada, muestra las categorías como hasta ahora -->
  <section v-else class="catalogo contenedor">
  <div class="catalogo-grid">
    <div
      v-for="(cat, idx) in categories"
      :key="cat.id"
      class="categoria-card animate-stagger"
      :style="`animation-delay: ${idx * 120}ms;`"
    >
      <img :src="cat.image" :alt="cat.name" class="categoria-card__img" />
      <h3 class="categoria-card__title">{{ cat.name }}</h3>
      <router-link :to="`/catalogo?cat=${cat.id}`" class="categoria-card__link">
        VER PRODUCTOS
      </router-link>
    </div>
  </div>
</section>
</template>

<script setup>
import { useHead } from '@vueuse/head'
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'

const categories = ref([])
const productos = ref([])
const route = useRoute()
const router = useRouter()

// Carga las categorías al montar la vista
onMounted(async () => {
  const catRes = await fetch(`${import.meta.env.BASE_URL}categorias.json`)
  if (catRes.ok) categories.value = await catRes.json()

  // Si hay categoría en la query al cargar, carga productos
  if (route.query.cat) {
    await cargarProductos()
  }
})

// Vigila los cambios de categoría para recargar productos
watch(
  () => route.query.cat,
  async (nuevaCat, antiguaCat) => {
    if (nuevaCat) {
      await cargarProductos()
    } else {
      productos.value = []
    }
  }
)

// Función para cargar productos
async function cargarProductos() {
  const prodRes = await fetch(`${import.meta.env.BASE_URL}productos.json`)
  if (prodRes.ok) productos.value = await prodRes.json()
}

// Encuentra la categoría seleccionada
const categoriaSeleccionada = computed(() =>
  categories.value.find(cat => String(cat.id) === String(route.query.cat))
)

// Filtra los productos por la categoría seleccionada
const productosFiltrados = computed(() => {
  if (!route.query.cat) return []
  return productos.value.filter(p =>
    p.categoria === categoriaSeleccionada.value?.id
  )
})

// Botón para volver a la lista de categorías
function volverCategorias() {
  router.push('/catalogo')
}

useHead({
  title: 'Catálogo de productos | Respigares',
  meta: [
    { name: 'description', content: 'Consulta nuestro catálogo con más de 4.000 referencias de productos de alimentación gourmet y primeras marcas. Distribución profesional para hostelería y particulares.' },
    { property: 'og:title', content: 'Catálogo de productos | Respigares' },
    { property: 'og:description', content: 'Distribuimos alimentos premium: conservas, aceites, encurtidos, y mucho más. Solicita información sin compromiso.' },
    { property: 'og:image', content: 'https://www.respigares.es/img/hero-catalogo.jpg' },
    { property: 'og:type', content: 'website' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.respigares.es/catalogo' }
  ]
})
</script>

<style scoped>
/* Cabecera visual */
.catalogo-hero {
  position: relative;
  width: 100vw;
  min-height: 14vw;
  max-height: 20em;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  background: #fff;
  margin-bottom: 0;
}
.catalogo-hero-img {
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
.catalogo-title-tab {
  position: relative;
  z-index: 2;
  background: #fff;
  border-radius: 1.3em 1.3em 0 0;
  padding: 1.5em 2em 0.8em 2em;
  min-width: 8em;
  margin-bottom: -1.3em;
  margin-top: 2em;
  box-shadow: 0 0.1em 1em #0001;
  display: flex;
  justify-content: center;
}
.catalogo-title-tab h1 {
  color: #ab0a3d;
  font-size: 2.7rem;
  font-weight: bold;
  text-align: center;
  margin: 1rem;
  letter-spacing: 0.01em;
}

.catalogo-desc-wrap {
  
  width: 100%;
  display: flex;
  justify-content: center;
}
.catalogo-desc {
  margin: 3em auto 1.5em auto;
  max-width: 50em;
  color: #4a4a4a;
  text-align: center;
  font-size: 1.14em;
  background: none;
  padding: 0 2em;
  line-height: 1.6;
}
.catalogo-desc b {
  color: #464b55;
  font-weight: 700;
}

/* Grid de categorías */
.catalogo-productos-contenedor{
  text-align: center;  
}
.catalogo {
  width: 100%;
  max-width: 78em;
  margin: 0 auto 3em auto;
  padding-left: 2.5em;
  padding-right: 2.5em;
  box-sizing: border-box;
  background: transparent;
}
.catalogo-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.4em;
  margin: 2em 0 0 0;
  justify-content: center;
}
.categoria-card {
  background: none;
  border-radius: 0.3em;
  box-shadow: none;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform .14s;
}
.categoria-card__img {
  width: 13em;
  height: 13em;
  object-fit: cover;
  margin-bottom: 0.7em;
  border-radius: 0.15em;
  box-shadow: 0 2px 8px #0002;
}
.categoria-card__title {
  margin: 0 0 0.6em 0;
  font-size: 1.47em;
  font-weight: 800;
  color: #767676;
  letter-spacing: -0.03em;
  text-align: center;
  line-height: 1.13;
}
.categoria-card__link {
  margin-top: 0.3em;
  padding: 0.6em 1.6em;
  background: #326999;
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.03em;
  border-radius: 1.5em;
  letter-spacing: 0.02em;
  box-shadow: 0 1px 6px #0001;
  transition: background 0.2s, color 0.2s;
  display: inline-block;
  cursor: pointer;
}
.categoria-card__link:hover {
  background: #ab0a3d;
  color: #fff;
  text-decoration: underline;
}
.btn-volver-categorias{
  margin: 2rem;
  
}
.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin: 2.2em 0;
}


/* Responsive */
@media (min-width: 32em) {
  .catalogo-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.6em;
  }
}
@media (min-width: 54em) {
  .catalogo-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 2.8em;
  }
  .categoria-card__img {
    width: 13em;
    height: 13em;
  }
}
@media (max-width: 700px) {
  .catalogo-hero-img { min-height: 110px; }
  .catalogo-title-tab { padding: 0.9em 0.5em 0.7em 0.5em; }
  .catalogo-title-tab h1 { font-size: 1.5rem; }
  .catalogo-desc { font-size: 1em; padding: 0 0.4em; }
  .categoria-card__img { width: 9em; height: 9em; }
  .catalogo { padding-left: 0.5em; padding-right: 0.5em; }
}
/* Animaciones de aparición */
.animate-fadein {
  animation: aparecer 1.08s cubic-bezier(.8,.1,.1,1);
}
@keyframes aparecer {
  from { opacity: 0; transform: translateY(35px);}
  to   { opacity: 1; transform: none;}
}
.animate-fadein-slow {
  animation: aparecer 1.5s cubic-bezier(.8,.1,.1,1);
}
.animate-stagger {
  opacity: 0;
  animation: aparecer 1.2s cubic-bezier(.8,.1,.1,1) forwards;
}

</style>
