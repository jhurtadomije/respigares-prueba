<template>
  <span class="brands__label">NUESTRAS MARCAS</span>
  <section class="brands">
    
    <div class="contenedor">
      <!-- Etiqueta centrada encima del carrusel -->
      

      <!-- Carrusel -->
      <Swiper
        :modules="[Navigation, Pagination, Autoplay]"
        navigation
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        :slides-per-view="5"
        :space-between="0"
        :breakpoints="{
          320:  { slidesPerView: 1},
          480:  { slidesPerView: 2},
          768:  { slidesPerView: 3},
          1024: { slidesPerView: 4},
          1280: { slidesPerView: 5}
        }"
        class="brands-swiper"
      >
        <SwiperSlide
          v-for="(logo, i) in logos"
          :key="i"
          class="brands-swiper-slide"
        >
          <img :src="logo.src" :alt="logo.alt" class="brand-logo" />
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const modules = import.meta.glob(
  '../assets/logosMarcas/*.{png,jpg,jpeg,svg}',
  { eager: true }
)
const logos = Object.values(modules).map(m => ({ src: m.default, alt: '' }))
</script>

<style scoped>
.brands {
  background: var(--color-light);
  padding: 3rem 0 2rem;
  position: relative;
}

.brands__label {
  display: block;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-main);
  margin-bottom: 2rem;
}

/* Slider dentro de contenedor */
.brands::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: #ccc;
  opacity: 0.5;
}
.brands-swiper {
  --swiper-navigation-color: var(--color-main);
  --swiper-pagination-color: var(--color-main);
  padding-bottom: 3rem;
  overflow: visible;
}

/* Cada slide es un flex centrador */
.brands-swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0!important; 
}
.brands-swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  /* espacio manual entre logos */
  margin: 0 1rem;           /* ajusta este valor a lo que te guste */
}

.brands-swiper .swiper-pagination {
  margin-top: 2rem;
}
.brands-swiper-slide:last-child {
  margin-right: 0;
}
/* Logos idéntica dimensión y filtro */
.brand-logo {
  max-width: 120px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.5);
  transition: filter 0.3s ease, opacity 0.3s ease;
}
.brands-swiper-slide:first-child {
  margin-left: 0;
}
.brands-swiper-slide:hover .brand-logo {
  filter: grayscale(0%) opacity(1);
}
</style>
