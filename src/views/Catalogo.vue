<template>
  <section class="catalogo contenedor">
    <h2>Catálogo</h2>

    <!-- Vista de Categorías -->
    <div v-if="!categoriaSeleccionada">
      <div class="categorias-grid">
        <div
          v-for="cat in categorias"
          :key="cat.nombre"
          class="categoria-card"
          @click="categoriaSeleccionada = cat.nombre"
        >
          <div class="categoria-img-wrap">
            <img :src="cat.imagen" :alt="cat.nombre" />
            <div class="categoria-gradient"></div>
            <span class="categoria-titulo">{{ cat.nombre }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Vista de Productos de la Categoría -->
    <!-- ...código anterior... -->
<div v-else>
  <button @click="categoriaSeleccionada = null" class="btn-volver">
    ← Volver a categorías
  </button>
  <h3>Productos en {{ categoriaSeleccionada }}</h3>
  <div class="grid-productos">
    <div v-for="p in productosFiltrados" :key="p.nombre" class="producto-resumido-card">
      <h4>{{ p.nombre }}</h4>
      <!-- Imagen principal del producto (si tiene) -->
      <img v-if="p.imagen" :src="p.imagen" :alt="p.nombre" class="mini-img" />
      <router-link :to="`/producto/${p.nombre}`" class="btn-vermas">
        Ver más
      </router-link>
    </div>
  </div>
</div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

// 1. Objeto para las imágenes por categoría
const CATEGORIA_IMAGENES = {
  'Aceites': 'https://respigares.es/wp-content/uploads/2025/02/aceites-categoria.jpg',
  'Aceites de oliva': 'https://respigares.es/wp-content/uploads/2025/02/aceites-oliva.jpg',
  'Aceites especiales': 'https://respigares.es/wp-content/uploads/2025/02/aceites-especiales.jpg',
  'Aceitunas': 'https://respigares.es/wp-content/uploads/2025/02/aceitunas.jpg',
  'Conservas Vegetales': 'https://respigares.es/wp-content/uploads/2025/02/conservas-vegetales.jpg',
  'Conservas de Alcachofa': 'https://respigares.es/wp-content/uploads/2025/02/alcachofas.jpg',
  'Conservas de Espárragos': 'https://respigares.es/wp-content/uploads/2025/02/esparragos.jpg',
  'Conservas de Pimientos': 'https://respigares.es/wp-content/uploads/2025/02/pimientos.jpg',
  'Conservas de Tomate': 'https://respigares.es/wp-content/uploads/2025/02/tomate.jpg',
  'Conservas de Legumbres': 'https://respigares.es/wp-content/uploads/2025/02/legumbres.jpg',
  'Conservas de Frutas': 'https://respigares.es/wp-content/uploads/2025/02/frutas.jpg',
  'Conservas de Verduras': 'https://respigares.es/wp-content/uploads/2025/02/verduras.jpg',
  'Encurtidos': 'https://respigares.es/wp-content/uploads/2025/02/encurtidos.jpg',
  'Banderillas': 'https://respigares.es/wp-content/uploads/2025/02/banderillas.jpg',
  'Pepinillos': 'https://respigares.es/wp-content/uploads/2025/02/pepinillos.jpg',
  'Cebolletas': 'https://respigares.es/wp-content/uploads/2025/02/cebolletas.jpg',
  'Alcaparras': 'https://respigares.es/wp-content/uploads/2025/02/alcaparras.jpg',
  'Guindillas': 'https://respigares.es/wp-content/uploads/2025/02/guindillas.jpg',
  'Mix encurtidos': 'https://respigares.es/wp-content/uploads/2025/02/mix-encurtidos.jpg',
  'Salsas': 'https://respigares.es/wp-content/uploads/2025/02/salsas.jpg',
  'Mayonesas': 'https://respigares.es/wp-content/uploads/2025/02/mayonesa.jpg',
  'Salsas especiales': 'https://respigares.es/wp-content/uploads/2025/02/salsas-especiales.jpg',
  'Kétchup': 'https://respigares.es/wp-content/uploads/2025/02/ketchup.jpg',
  'Mojo': 'https://respigares.es/wp-content/uploads/2025/02/mojo.jpg',
  'Alioli': 'https://respigares.es/wp-content/uploads/2025/02/alioli.jpg',
  'Vinagretas': 'https://respigares.es/wp-content/uploads/2025/02/vinagretas.jpg',
  'Especias': 'https://respigares.es/wp-content/uploads/2025/02/especias.jpg',
  'Hierbas aromáticas': 'https://respigares.es/wp-content/uploads/2025/02/hierbas-aromaticas.jpg',
  'Pimentón': 'https://respigares.es/wp-content/uploads/2025/02/pimenton.jpg',
  'Comino': 'https://respigares.es/wp-content/uploads/2025/02/comino.jpg',
  'Sal': 'https://respigares.es/wp-content/uploads/2025/02/sal.jpg',
  'Azafrán': 'https://respigares.es/wp-content/uploads/2025/02/azafran.jpg',
  'Condimentos': 'https://respigares.es/wp-content/uploads/2025/02/condimentos.jpg',
  'Pimienta': 'https://respigares.es/wp-content/uploads/2025/02/pimienta.jpg',
  'Otros': 'https://respigares.es/wp-content/uploads/2025/02/otros.jpg',
  // ... Puedes añadir más categorías personalizadas aquí
}


const productos = ref([])
const categoriaSeleccionada = ref(null)

onMounted(async () => {
  const res = await fetch(`${import.meta.env.BASE_URL}productos.json`)
  productos.value = await res.json()
})


// 2. Extraer categorías únicas y asociar imagen
const categorias = computed(() => {
  const mapa = {}
  productos.value.forEach(p => {
    if (!mapa[p.categoria]) {
      mapa[p.categoria] = true
    }
  })
  return Object.keys(mapa).map(nombre => ({
    nombre,
    imagen: CATEGORIA_IMAGENES[nombre] || '/img/categorias/default.jpg'
  }))
})

// 3. Filtrar productos por categoría seleccionada
const productosFiltrados = computed(() =>
  productos.value.filter(p => p.categoria === categoriaSeleccionada.value)
)
</script>

<style scoped>
.categorias-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  margin: 1.5rem 0 1rem 0;
}

.categoria-card {
  position: relative;
  cursor: pointer;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 #0001;
  min-height: 160px;
  display: flex;
  align-items: stretch;
  background: #fff;
  transition: transform .14s, box-shadow .14s;
}
.categoria-card:hover {
  transform: scale(1.04) translateY(-3px);
  box-shadow: 0 4px 18px 0 #0002;
}
.categoria-img-wrap {
  width: 100%;
  height: 140px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  background: #f4f4f4;
}
.categoria-img-wrap img {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: filter .2s;
  filter: grayscale(0.10) brightness(0.97);
}
.categoria-card:hover img {
  filter: none;
}
.categoria-gradient {
  position: absolute;
  bottom: 0; left: 0; right: 0; height: 50%;
  z-index: 2;
  background: linear-gradient(0deg,rgba(30,30,30,0.85) 60%,transparent 100%);
}
.categoria-titulo {
  position: relative;
  z-index: 3;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.8rem 0.5rem;
  text-shadow: 0 1px 6px #0006;
  width: 100%;
  text-align: center;
}

/* Responsive: 2 columnas tablet */
@media (min-width: 600px) {
  .categorias-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.3rem;
  }
  .categoria-img-wrap {
    height: 150px;
  }
  .categoria-titulo {
    font-size: 1.17rem;
  }
}
/* Responsive: 3 columnas desktop mediano */
@media (min-width: 900px) {
  .categorias-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.4rem;
  }
  .categoria-img-wrap {
    height: 170px;
  }
  .categoria-titulo {
    font-size: 1.22rem;
  }
}
/* Responsive: 4 columnas escritorio grande */
@media (min-width: 1200px) {
  .categorias-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }
  .categoria-img-wrap {
    height: 210px;
  }
  .categoria-titulo {
    font-size: 1.27rem;
  }
}


</style>
