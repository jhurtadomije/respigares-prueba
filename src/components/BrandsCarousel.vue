<!-- src/components/BrandsCarousel.vue -->
<template>
  <span class="brands__label">Nuestras Marcas</span>
  <section class="brands">
    
    <div class="contenedor">
      
      <Swiper
        class="brands-swiper"
        :modules="[Navigation, Pagination, Autoplay]"
        navigation
        :pagination="{ clickable: true }"
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        :slides-per-view="5"
        :space-between="4"
        :breakpoints="{
          320:  { slidesPerView: 1, spaceBetween: 2 },
          480:  { slidesPerView: 2, spaceBetween: 4 },
          768:  { slidesPerView: 3, spaceBetween: 6 },
          1024: { slidesPerView: 4, spaceBetween: 8 },
          1280: { slidesPerView: 5, spaceBetween: 10 }
        }"
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

.contenedor {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  width: 100%;
}

.brands__label {
  margin-top: 2.5rem;
  display: block;
  text-align: center;
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--color-gray);
  margin-bottom: 2rem;

}

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
  width: 100%;
  --swiper-navigation-color: var(--color-main);
  --swiper-pagination-color: var(--color-main);
  padding-bottom: 3rem;
  overflow: visible;
}

.brands-swiper .swiper-wrapper {
  align-items: center;
}

.brands-swiper .swiper-pagination {
  margin-top: 2rem;
  display: none;
}

.brands-swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  max-width: 120px;
  max-height: 80px;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.5);
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.brands-swiper-slide:hover .brand-logo {
  filter: grayscale(0%) opacity(1);
}

/* Responsive adjustments */
@media (max-width: 480px) {
  
  .brand-logo {
    max-width: 80px;
    max-height: 60px;
  }
}
</style>
