<template>
  <header class="header">
    <div class="header-content">
      <img src="/img/logo-mas-de-50aniv__blanco-sin-fondo.png" alt="Respigares" class="logo" />
      <button class="menu-btn" @click="open = !open">
        <span v-if="!open">&#9776;</span>
        <span v-else>&#10005;</span>
      </button>
      <nav :class="['nav', { open }]">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/nosotros">Somos</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>
