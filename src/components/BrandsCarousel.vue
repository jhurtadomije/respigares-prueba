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
  background: linear-gradient(180deg, #f7f9fb 0%, #edf1f5 100%);
  padding: 2.4rem 0 1.8rem 0;
  position: relative;
  overflow-x: hidden; /* BLOQUEA SCROLL LATERAL */
}

/* usamos el contenedor local sólo dentro del componente */
.contenedor {
  max-width: 75rem;
  margin: 0 auto;
  padding-inline: 0.8rem;
  width: 100%;
  box-sizing: border-box;
}

.brands__label {
  margin-top: 2.4rem;
  text-align: center;
  font-size: clamp(1.5rem, 2.5vw, 2.1rem);
  font-weight: 900;
  color: var(--color-main);
  margin-bottom: 1.7rem;
  letter-spacing: 0.03em;
}

/* línea muy sutil inferior para separar la sección */
.brands::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 100vw;
  height: 1px;
  background: #c7ccd3;
  opacity: 0.4;
  transform: translateX(-50%);
  pointer-events: none;
}

/* Swiper */
.brands-swiper {
  max-width: 100%;
  --swiper-navigation-color: var(--color-main);
  padding-bottom: 1.2rem;
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

/* Logos como “chips” de marca */
.brand-logo {
  max-width: 5.7rem;
  max-height: 3.4rem;
  width: 100%;
  object-fit: contain;
  filter: grayscale(100%) opacity(0.55);
  transition: filter 0.3s ease, opacity 0.3s ease, transform 0.25s ease;
  margin: 0 auto;
}

/* Hover sólo en dispositivos con ratón */
@media (hover: hover) and (pointer: fine) {
  .brands-swiper-slide:hover .brand-logo {
    filter: grayscale(0%) opacity(1) drop-shadow(0 2px 6px #e7c95344);
    transform: scale(1.07);
  }
}

/* ===== TABLET ===== */
@media (min-width: 30rem) {  /* 480px */
  .brands__label {
    font-size: clamp(1.7rem, 3vw, 2.2rem);
    margin-bottom: 1.6rem;
  }

  .brand-logo {
    max-width: 6.3rem;
    max-height: 4.1rem;
  }
}

/* ===== DESKTOP ===== */
@media (min-width: 60rem) { /* 960px aprox */
  .brands {
    padding: 3rem 0 2.2rem 0;
  }

  .brands__label {
    margin-top: 2.2rem;
    margin-bottom: 2rem;
  }

  .brand-logo {
    max-width: 7.3rem;
    max-height: 4.8rem;
  }

  .brands-swiper {
    padding-bottom: 1.6rem;
  }
}
</style>
