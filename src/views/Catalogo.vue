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
.catalogo {
  padding: 2rem;
  text-align: center;
}

.categorias-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin: 2rem 0;
  margin-bottom: 1.5rem;
}
.categoria-card {
  position: relative;
  cursor: pointer;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 4px 24px 0 #0001;
  transition: transform .17s, box-shadow .17s;
  min-height: 210px;
  display: flex;
  align-items: stretch;
}
.categoria-card:hover {
  transform: scale(1.04) translateY(-4px);
  box-shadow: 0 8px 36px 0 #0002;
}
.categoria-img-wrap {
  width: 100%;
  height: 210px;
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
  filter: grayscale(0.10) brightness(0.95);
}
.categoria-card:hover img {
  filter: none;
}
.categoria-gradient {
  position: absolute;
  bottom: 0; left: 0; right: 0; height: 45%;
  z-index: 2;
  background: linear-gradient(0deg,rgba(30,30,30,0.83) 65%,transparent 100%);
}
.categoria-titulo {
  position: relative;
  z-index: 3;
  color: #fff;
  font-size: 1.27rem;
  font-weight: 700;
  letter-spacing: .03em;
  padding: 1rem;
  text-shadow: 0 2px 8px #0005;
  width: 100%;
  text-align: center;
}

.btn-volver {
  margin-bottom: 1.3rem;
  background: #008B3C;
  color: #fff;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 1px 6px #0002;
  transition: background .2s, box-shadow .2s;
}
.btn-volver:hover {
  background: #006c2b;
  box-shadow: 0 2px 12px #0002;
}

.grid-productos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}
.producto-resumido-card {
  padding: 1.1rem 1rem;
  border-radius: 15px;
  box-shadow: 0 2px 12px #0001;
  background: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: .8rem;
  align-items: center;
  justify-content: center;
  min-height: 220px;
}
.producto-resumido-card h4 {
  margin: 0 0 .5rem 0;
  font-weight: 600;
  font-size: 1.18rem;
}
.producto-resumido-card .mini-img {
  width: 90px;
  height: 90px;
  object-fit: contain;
  border-radius: 8px;
  margin-bottom: .6rem;
  background: #f9f9f9;
  box-shadow: 0 1px 6px #0002;
}
.btn-vermas {
  background: #008b3c;
  color: #fff;
  border: none;
  padding: .5rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: background .18s;
  margin-top: .2rem;
}
.btn-vermas:hover {
  background: #006c2b;
}

</style>
