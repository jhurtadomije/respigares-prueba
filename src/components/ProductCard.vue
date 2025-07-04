<template>
  <div class="product-card">
    <img :src="Array.isArray(producto.imagen) ? producto.imagen[0] : producto.imagen" :alt="producto.nombre" />
    <h3>{{ producto.nombre }}</h3>
    <router-link :to="`/producto/${encodeURIComponent(producto.nombre)}`" class="btn-ver-mas">
      Más detalles
    </router-link>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const props = defineProps({ producto: Object })
const router = useRouter()

function irADetalle() {
  // Puedes usar el nombre o mejor, un campo id o slug único si lo tienes
  router.push(`/producto/${props.producto.nombre}`)
}
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

.btn-ver-mas {
  margin-top: auto;
  padding: 0.7em 1.7em;
  background: var(--color-main);
  color: #fff;
  border: none;
  border-radius: 11px;
  font-size: 1.03em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-vermas:hover {
  background: #326999;
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
