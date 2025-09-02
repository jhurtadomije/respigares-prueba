<template>
  <div v-if="producto" class="detalle">
    <h1>{{ producto.nombre }}</h1>
    <p><strong>Marca:</strong> {{ producto.marca }}</p>
    <p><strong>Categoría:</strong> {{ producto.categoria }} <span v-if="producto.subcategoria">/ {{ producto.subcategoria }}</span></p>
    <p v-if="producto.descripcion">{{ producto.descripcion }}</p>

    <div class="galeria">
      <img v-for="(img, i) in producto.galeria" :key="i" :src="img" :alt="producto.nombre" />
    </div>

    <div class="tags">
      <span v-for="tag in producto.tags" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <router-link to="/" class="btn-volver">⬅ Volver</router-link>
  </div>
  <div v-else>
    <p>Producto no encontrado.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const producto = ref(null);

onMounted(async () => {
  const res = await fetch("/productos.json");
  const data = await res.json();
  producto.value = data.find(p => p.id === Number(route.params.id));
});
</script>

<style scoped>
.detalle {
  padding: 2rem;
}

.galeria {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.galeria img {
  max-width: 200px;
  border-radius: 5px;
}

.tag {
  display: inline-block;
  margin: 0 0.3rem 0.3rem 0;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  border-radius: 12px;
  background: #eee;
}

.btn-volver {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.6rem 1rem;
  border-radius: 5px;
  background: #707070;
  color: white;
  text-decoration: none;
}
</style>
