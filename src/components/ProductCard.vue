<template>
  <router-link :to="`/producto/${producto.nombre}`" class="product-card">
    <img :src="producto.imagen || producto.image" :alt="producto.nombre || producto.title" />
    <h3>{{ producto.nombre || producto.title }}</h3>
    <p v-html="producto.descripcion || producto.content"></p>

  </router-link>
</template>


<script setup>
defineProps({
  producto: Object
})
</script>

<style scoped>
.product-card {
  display: block;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  background-color: #fff;
  color: inherit;
  text-decoration: none;
  transition: transform 0.2s;
}


.product-card:hover {
  transform: scale(1.02);
}

.product-card img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
