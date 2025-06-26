<template>
  <Header />
  <main class="contenido-principal">
        <RouterView />
  </main>
  <Footer />
</template>

<script setup>
import Header     from './components/Header.vue'

import Footer     from './components/Footer.vue'


</script>

<style>
.contenido-principal {
  margin-top: 80px; 
  padding: 2rem 1rem;
  min-height: 90vh;
}
</style>
