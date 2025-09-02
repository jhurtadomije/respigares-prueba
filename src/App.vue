<template>
  <Header />
  <main class="contenido-principal">
    <RouterView />
  </main>
  <section v-scroll-random-reveal>
    <Footer />
  </section>
  <Cookies />
  <ScrollTopButton />
  
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Cookies from './views/Cookies.vue'
import ScrollTopButton from './components/ScrollTopButton.vue'
</script>

<style>
.contenido-principal {
  margin-top: 5.6rem;
  min-height: 80vh;
}
</style>
