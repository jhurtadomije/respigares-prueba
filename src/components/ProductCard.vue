<template>
  <router-link :to="`/producto/${producto.nombre}`" class="product-card">
    <img :src="producto.imagen || producto.image" :alt="producto.nombre || producto.title" class="product-img" />
    <h3 class="product-title">{{ producto.nombre || producto.title }}</h3>
    <p class="product-desc" v-html="producto.descripcion || producto.content"></p>
  </router-link>
</template>

<script setup>
defineProps({
  producto: Object
})
</script>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 12px;
  background: #fff;
  text-align: center;
  color: inherit;
  text-decoration: none;
  padding: 1.2rem 0.8rem;
  transition: transform 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 14px #0001;
  min-width: 0;
  position: relative;
}

.product-card:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 28px #ab0a3d18;
}

.product-img {
  max-width: 100%;
  max-height: 185px;
  object-fit: contain;
  border-radius: 7px;
  margin-bottom: 0.9rem;
  background: #f5f5f5;
}

.product-title {
  color: var(--color-main, #ab0a3d);
  font-size: 1.14rem;
  font-weight: bold;
  margin: 0 0 0.4em 0;
  line-height: 1.17;
}

.product-desc {
  color: #575757;
  font-size: 0.98rem;
  margin-bottom: 0.2rem;
  min-height: 32px;
  line-height: 1.55;
}

@media (max-width: 500px) {
  .product-card {
    padding: 0.9rem 0.4rem;
  }
  .product-img {
    max-height: 120px;
  }
  .product-title {
    font-size: 1.01rem;
  }
  .product-desc {
    font-size: 0.92rem;
  }
}
</style>
