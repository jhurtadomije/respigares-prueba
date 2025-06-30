<template>
  <Header />
  <main class="contenido-principal">
        <RouterView />
  </main>
  <section v-scroll-random-reveal>
  <Footer />
  </section>
</template>

<script setup>
import Header     from './components/Header.vue'

import Footer     from './components/Footer.vue'


</script>

<style>
.contenido-principal {
  margin-top: 2rem; 
  
  min-height: 80vh;
}
</style>
