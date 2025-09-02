<template>
  <div class="catalogo">
    <!-- Filtros -->
    <div class="filtros">
      <label>
        Categoría:
        <select v-model="filtroCategoria">
          <option value="">Todas</option>
          <option v-for="cat in categoriasOrdenadas" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </label>

      <label v-if="subcategoriasDisponibles.length">
        Subcategoría:
        <select v-model="filtroSubcategoria">
          <option value="">Todas</option>
          <option v-for="sub in subcategoriasDisponibles" :key="sub" :value="sub">{{ sub }}</option>
        </select>
      </label>

      <label>
        Buscar por tag:
        <input 
          type="text" 
          v-model="busquedaTag" 
          placeholder="Escribe un tag..." 
        />
      </label>
    </div>

    <!-- Listado -->
    <div class="productos">
      <div v-for="producto in productosFiltrados" :key="producto.id" class="producto">
        <img :src="producto.galeria?.[0]" :alt="producto.nombre" />
        <h3>{{ producto.nombre }}</h3>
        <p>{{ producto.marca }}</p>
        <p class="categoria">{{ producto.categoria }} <span v-if="producto.subcategoria">/ {{ producto.subcategoria }}</span></p>

        <!-- Tags del producto -->
        <div class="tags">
          <span 
            v-for="tag in producto.tags" 
            :key="tag" 
            class="tag"
            @click="seleccionarTag(tag)"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Botón ver más -->
        <router-link :to="`/producto/${producto.id}`" class="btn-vermas">
          Ver más
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const productos = ref([]);
const filtroCategoria = ref("");
const filtroSubcategoria = ref("");
const busquedaTag = ref("");

// Cargar productos
onMounted(async () => {
  const res = await fetch("/productos.json");
  productos.value = await res.json();
});

// Extraer categorías
const categoriasOrdenadas = computed(() => {
  const set = new Set(productos.value.map(p => p.categoria).filter(Boolean));
  return [...set].sort();
});

// Subcategorías según categoría
const subcategoriasDisponibles = computed(() => {
  if (!filtroCategoria.value) return [];
  const set = new Set(
    productos.value
      .filter(p => p.categoria === filtroCategoria.value)
      .map(p => p.subcategoria)
      .filter(Boolean)
  );
  return [...set].sort();
});

// Filtrado avanzado
const productosFiltrados = computed(() => {
  return productos.value.filter(p => {
    const coincideCategoria = !filtroCategoria.value || p.categoria === filtroCategoria.value;
    const coincideSubcategoria = !filtroSubcategoria.value || p.subcategoria === filtroSubcategoria.value;
    const coincideTag = !busquedaTag.value || 
      p.tags?.some(tag => tag.includes(busquedaTag.value.toLowerCase()));

    return coincideCategoria && coincideSubcategoria && coincideTag;
  });
});

// Acción al hacer clic en un tag
function seleccionarTag(tag) {
  busquedaTag.value = tag;
}
</script>

<style scoped>
.catalogo {
  padding: 1rem;
}

.filtros {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.filtros label {
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
}

.productos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.producto {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.producto img {
  max-width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}

.categoria {
  font-size: 0.8rem;
  color: #666;
}

.tags {
  margin-top: 0.5rem;
}

.tag {
  display: inline-block;
  margin: 0 0.3rem 0.3rem 0;
  padding: 0.3rem 0.6rem;
  font-size: 0.75rem;
  border-radius: 12px;
  background: #eee;
  cursor: pointer;
  transition: background 0.2s;
}

.tag:hover {
  background: #ccc;
}

.btn-vermas {
  margin-top: 0.7rem;
  text-align: center;
  padding: 0.5rem;
  border-radius: 5px;
  background: #336693;
  color: white;
  font-size: 0.85rem;
  font-weight: bold;
  text-decoration: none;
  transition: background 0.2s;
}

.btn-vermas:hover {
  background: #234766;
}
</style>
