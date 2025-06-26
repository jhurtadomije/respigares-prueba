<template>
  <section class="brands contenedor">
    <span class="brands__label">Nuestras marcas</span>
    <Swiper
      :modules="[Navigation, Pagination, Autoplay]"
      navigation
      :pagination="{ clickable: true }"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      loop
      :slides-per-view="5"          
      :space-between="20"
      :breakpoints="{               
        320:  { slidesPerView: 1, spaceBetween: 10 },
        480:  { slidesPerView: 2, spaceBetween: 15 },
        768:  { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
        1280: { slidesPerView: 5, spaceBetween: 20 }
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
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

// Carga todos los logos de la carpeta
const modules = import.meta.glob(
  '../assets/logosMarcas/*.{png,jpg,jpeg,svg}',
  { eager: true }
)
const logos = Object.values(modules).map(m => ({ src: m.default, alt: '' }))
</script>

<style scoped>
.brands {
  padding: 3rem 1rem;
  text-align: center;
}
.brands__label {
  display: inline-block;
  font-size: 1.25rem;
  font-weight: bold;
  color: #ab0a3d;
  margin-bottom: 1.5rem;
}
.brands-swiper {
  --swiper-navigation-color: #ab0a3d;
  --swiper-pagination-color: #ab0a3d;
  padding: 1rem 0;
}
.brands-swiper-slide:hover .brand-logo {
  /* al pasar el ratón, vuelve al color */
  filter: grayscale(0%) opacity(1);
}
.brand-logo {
  max-height: 80px;
  object-fit: contain;
  /* filtro inicial sin color */
  filter: grayscale(100%) opacity(0.7);
  transition: filter 0.3s ease, opacity 0.3s ease;
}

</style>
