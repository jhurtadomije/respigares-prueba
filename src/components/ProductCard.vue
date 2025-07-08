<template>
  <div class="product-card animate-fadeup" :style="`--delay: ${delay || 0}ms`">
    <div class="product-img-wrap">
      <img
        :src="Array.isArray(producto.imagen) ? producto.imagen[0] : producto.imagen"
        :alt="producto.nombre"
        class="product-img"
        loading="lazy"
        @mouseover="hover = true"
        @mouseleave="hover = false"
        @focus="hover = true"
        @blur="hover = false"
        tabindex="0"
        @error="onImgError"
        v-show="!imgError"
      />
      <div v-if="imgError" class="img-fallback">
        <img :src="base + 'img/productos/default.jpg'" alt="Imagen no disponible" class="product-img" />
        <span>Imagen no disponible por el momento</span>
      </div>
    </div>
    <h3 class="product-title">{{ producto.nombre }}</h3>
    <router-link
      :to="`/producto/${encodeURIComponent(producto.nombre)}`"
      class="btn-ver-mas"
    >
      Más detalles
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  producto: { type: Object, required: true },
  delay: { type: Number, default: 0 }
})
const hover = ref(false)
const imgError = ref(false)
const base = import.meta.env.BASE_URL || '/'

function onImgError() {
  imgError.value = true
}
</script>


<style scoped>
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(38px);}
  to   { opacity: 1; transform: none;}
}
.animate-fadeup {
  opacity: 0;
  animation: fadeUp 1.2s cubic-bezier(.8,.1,.1,1) forwards;
  animation-delay: var(--delay, 0ms);
}

.product-card {
  display: flex;
  flex-direction: column;
  border: 1.5px solid #eee;
  border-radius: 14px;
  background: #fff;
  text-align: center;
  color: inherit;
  text-decoration: none;
  padding: 1.25rem 1rem 1.2rem 1rem;
  transition:
    transform 0.23s cubic-bezier(.8,.1,.1,1),
    box-shadow 0.18s,
    border-color 0.18s;
  box-shadow: 0 2px 14px #0001;
  min-width: 0;
  position: relative;
  outline: none;
}

.product-card:hover,
.product-card:focus-within {
  transform: translateY(-9px) scale(1.04) rotate(-0.2deg);
  box-shadow: 0 10px 32px #28528136, 0 3px 22px #ab0a3d18;
  border-color: #ab0a3d33;
}

.product-img {
  max-width: 100%;
  max-height: 185px;
  object-fit: contain;
  border-radius: 10px;
  margin-bottom: 0.9rem;
  background: #f5f5f5;
  box-shadow: 0 2px 12px #32699913;
  transition: box-shadow 0.23s, filter 0.2s;
}
.product-card:hover .product-img,
.product-card:focus-within .product-img {
  filter: brightness(1.11) saturate(1.09);
  box-shadow: 0 8px 28px #ab0a3d18, 0 2px 10px #32699916;
  outline: 2px solid var(--color-main, #285281);
}

.product-title {
  color: var(--color-main, #ab0a3d);
  font-size: 1.14rem;
  font-weight: bold;
  margin: 0 0 0.4em 0;
  line-height: 1.17;
  letter-spacing: .01em;
}

.btn-ver-mas {
  margin-top: auto;
  padding: 0.68em 1.5em;
  background: var(--color-main, #285281);
  color: #fff;
  border: none;
  border-radius: 11px;
  font-size: 1.01em;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, transform 0.17s;
  box-shadow: 0 1px 8px #0001;
  text-decoration: none;
  letter-spacing: .01em;
}
.btn-ver-mas:hover,
.btn-ver-mas:focus {
  background: #ab0a3d;
  transform: scale(1.08);
  outline: none;
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
}
</style>
