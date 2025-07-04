<template>
  <header class="header">
    <div class="header-content">
    <router-link to="/" class="logo-link" aria-label="Ir a inicio">
      <img src="/img/logo-mas-de-50aniv__blanco-sin-fondo.png" alt="Respigares" class="logo" />
      </router-link>
      <!-- Botón Hamburguesa -->
      <button
        class="menu-btn"
        :aria-label="open ? 'Cerrar menú' : 'Abrir menú'"
        :aria-expanded="open"
        @click="toggleMenu"
        @keydown.esc="closeMenu"
      >
        <span v-if="!open">&#9776;</span>
        <span v-else>&#10005;</span>
      </button>
      <!-- Menú de navegación -->
      <nav :class="['nav', { open }]" @click="closeMenuOnNav">
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/catalogo">Catálogo</RouterLink>
        <RouterLink to="/nosotros">Somos</RouterLink>
        <RouterLink to="/blog">Blog</RouterLink>
        <RouterLink to="/contacto">Contacto</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
const open = ref(false)
const route = useRoute()

function toggleMenu() {
  open.value = !open.value
}

function closeMenu() {
  open.value = false
}

function closeMenuOnNav(event) {
  // Si se hace click en un link del menú móvil, cerrar el menú
  if (event.target.tagName === 'A' && window.innerWidth < 900) {
    open.value = false
  }
}

// Opcional: cerrar menú al cambiar de ruta
watch(() => route.path, () => { open.value = false })

// Opcional: evitar scroll cuando el menú móvil está abierto
watch(open, (isOpen) => {
  document.body.style.overflow = isOpen && window.innerWidth < 900 ? 'hidden' : ''
})
</script>

<style scoped>
/* Añade aquí el CSS que ya tienes o pide uno nuevo mobile-first si lo prefieres */
</style>
