<template>
  <h2 class="brands__label">Nuestras Marcas</h2>
  <section class="brands">
     <div class="contenedor">
      <Swiper
        class="brands-swiper"
        :modules="[Navigation, Autoplay]"  
        navigation
        :autoplay="{ delay: 3000, disableOnInteraction: false }"
        loop
        :slides-per-view="2"
        :space-between="10"
        :breakpoints="{
          320:  { slidesPerView: 2, spaceBetween: 8 },
          480:  { slidesPerView: 3, spaceBetween: 10 },
          640:  { slidesPerView: 4, spaceBetween: 12 },
          960:  { slidesPerView: 5, spaceBetween: 16 }
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
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/autoplay'

const modules = import.meta.glob(
  '../assets/logosMarcas/*.{png,jpg,jpeg,svg}',
  { eager: true }
)
const logos = Object.values(modules).map(m => ({ src: m.default, alt: '' }))
</script>

<style scoped>
/* ==== MOBILE FIRST ==== */
.brands {
  background: var(--color-light);
  padding: 2.2rem 0 1.6rem 0;
  position: relative;
}

.contenedor {
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  width: 100%;
}

.brands__label {
  margin-top: 2rem;
  text-align: center;
  font-size: 2.2rem;
  font-weight: 900;
  
  color: var(--color-main);
  margin-bottom: 2em;
}

.brands::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 1px;
  background: #ccc;
  opacity: 0.5;
  left: 50%;
  transform: translateX(-50%);
}

.brands-swiper {
  width: 100%;
  --swiper-navigation-color: var(--color-main);
  padding-bottom: 1.3rem;
  overflow: visible;
}

.brands-swiper .swiper-wrapper {
  align-items: center;
}

.brands-swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-logo {
  max-width: 5.5rem;
  max-height: 3.3rem;
  width: 100%;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.55);
  transition: filter 0.3s, opacity 0.3s;
  margin: 0 auto;
}

.brands-swiper-slide:hover .brand-logo {
  filter: grayscale(0%) opacity(1);
}

/* ===== TABLET ===== */
@media (min-width: 30em) {
  .brands__label {
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }
  .brand-logo {
    max-width: 6.25rem;
    max-height: 4.1rem;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 60em) {
  .brands__label {
    font-size: 2.1rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .brand-logo {
    max-width: 7.5rem;
    max-height: 5rem;
  }
  .brands {
    padding: 3rem 0 2rem 0;
  }
}

</style>
