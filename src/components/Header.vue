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
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%; /* mejor que 100vw para evitar scroll horizontal */
  z-index: 120;
  background: linear-gradient(
    to bottom,
    var(--color-main, #ab0a3d) 0%,
    #e8a1b7 100%
  );
  box-shadow: 0 4px 18px #0002;
}

/* Contenedor interno del header */
.header-content {
  width: 100%;
  margin: 0 auto;
  padding: 0.5rem 1rem;
  min-height: 6.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  
}

/* Logo + enlace */
.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
  justify-content: center;
}

.logo {
  height: 3.5rem;
  max-width: 70vw;
  display: block;
  object-fit: contain;
  
}

/* Botón hamburguesa (mobile) */
.menu-btn {
  position: absolute;
  top: 20%;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.5rem;
  height: 3.5rem;
  padding: 0;
  border-radius: 999px;
  background: none;
  transform: translateY(-2%);
  border: 2px solid rgba(255, 255, 255, 0.5);
  color: #fff;
  font-size: 1.6rem;
  cursor: pointer;
  transition: background 0.18s, border-color 0.18s, transform 0.12s;
  z-index: 130;
}

.menu-btn:hover {
  background:var(--color-blue, #256296);
  transform: translateY(-2%) scale(1.03);
}

/* Menú de navegación (mobile: oculto, desplegable bajo el header) */
.nav {
  position: absolute;
  top: 100%;
  right: 0;
  display: none;
  flex-direction: column;
  gap: 0.4rem;
  background: linear-gradient(
    to top,
    var(--color-main, #ab0a3d) 0%,
    #e8a1b7 100%
  );
  font-weight: 600;
  width: min(230px, 75vw);
  padding: 0.9rem 0.8rem;
  margin: 0;
  list-style: none;
  box-shadow: -2px 8px 24px #0004;
  border-radius: 0 0 0.9rem 0.9rem;
}

.nav.open {
  display: flex;
}

/* Enlaces del menú */
.nav a {
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.98rem;
  padding: 0.45rem 0.6rem;
  border-radius: 0.5rem;
  transition: background 0.18s, color 0.18s;
}

.nav a:hover,
.nav a.router-link-exact-active {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

/* --- Vista de escritorio / tablet --- */
@media (min-width: 768px) {
  .header-content {
    max-width: 1200px;
    padding: 0.7rem 1.5rem;
    justify-content: space-between;
  }

  .logo {
    height: 6rem;
    max-width: none;
  }

  .menu-btn {
    display: none;
  }

  .nav {
    position: static;
    display: flex !important; /* siempre visible en escritorio */
    flex-direction: row;
    align-items: center;
    gap: 0.4rem;

    background: none;
    box-shadow: none;
    padding: 0;
    width: auto;
    border-radius: 0;
  }

  .nav a {
    font-size: 1rem;
    padding: 0.4rem 0.75rem;
    margin: 0;
  }
}
</style>

