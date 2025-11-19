<template>
  <section class="contenedor debug-catalogo">
    <h1>Debug catálogo</h1>

    <div class="resumen">
      <p><strong>Total productos:</strong> {{ list.length }}</p>
      <p><strong>Sin categoría:</strong> {{ sinCategoria.length }}</p>
      <p><strong>Con categoría pero sin subcategoría:</strong> {{ sinSubcategoria.length }}</p>
    </div>

    <hr />

    <!-- Resumen por categoría -->
    <h2>Resumen por categoría</h2>
    <table class="tabla">
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Nº productos</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="fila in resumenPorCategoria" :key="fila.categoria || 'sin-cat'">
          <td>{{ fila.categoria || '⛔ SIN CATEGORÍA' }}</td>
          <td>{{ fila.count }}</td>
        </tr>
      </tbody>
    </table>

    <hr />

    <!-- Productos sin categoría -->
    <h2>Productos SIN categoría</h2>
    <p v-if="!sinCategoria.length">✅ No hay productos sin categoría.</p>
    <table v-else class="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Nombre</th>
          <th>familia_principal_raw</th>
          <th>nombre_familia_raw</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in sinCategoria" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.sku }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.familia_principal_raw }}</td>
          <td>{{ p.nombre_familia_raw }}</td>
        </tr>
      </tbody>
    </table>

    <hr />

    <!-- Productos con categoría pero sin subcategoría -->
    <h2>Productos con categoría pero SIN subcategoría</h2>
    <p v-if="!sinSubcategoria.length">✅ No hay productos sin subcategoría.</p>
    <table v-else class="tabla">
      <thead>
        <tr>
          <th>ID</th>
          <th>SKU</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>familia_principal_raw</th>
          <th>nombre_familia_raw</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in sinSubcategoria" :key="p.id">
          <td>{{ p.id }}</td>
          <td>{{ p.sku }}</td>
          <td>{{ p.nombre }}</td>
          <td>{{ p.categoria }}</td>
          <td>{{ p.familia_principal_raw }}</td>
          <td>{{ p.nombre_familia_raw }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useCatalogo } from "../composables/useCatalogo";

const { list, load } = useCatalogo();

onMounted(async () => {
  await load();
});

// Productos sin categoría
const sinCategoria = computed(() =>
  list.value.filter((p) => !p.categoria)
);

// Productos con categoría pero sin subcategoría
const sinSubcategoria = computed(() =>
  list.value.filter((p) => p.categoria && !p.subcategoria)
);

// Resumen nº de productos por categoría
const resumenPorCategoria = computed(() => {
  const mapa = {};
  for (const p of list.value) {
    const cat = p.categoria || null;
    if (!mapa[cat]) {
      mapa[cat] = 0;
    }
    mapa[cat]++;
  }
  return Object.entries(mapa).map(([categoria, count]) => ({
    categoria,
    count,
  }));
});
</script>

<style scoped>
.debug-catalogo {
  padding: 2rem 0;
  font-size: 0.95rem;
}

.resumen p {
  margin: 0.2rem 0;
}

.tabla {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin: 0.5rem 0 1.5rem 0;
}

.tabla th,
.tabla td {
  border: 1px solid #ddd;
  padding: 0.3rem 0.5rem;
}

.tabla th {
  background: #f5f5f5;
  text-align: left;
}
</style>
