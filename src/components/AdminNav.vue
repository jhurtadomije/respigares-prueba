<!-- src/components/AdminNav.vue -->
<template>
  <nav class="admin-nav" aria-label="Navegación de administración">
    <button
      class="btn btn--soft"
      :class="{ active: isActive('/admin') }"
      @click="go('/admin')"
      type="button"
    >
      Dashboard
    </button>

    <button
      class="btn btn--soft"
      :class="{ active: isActive('/admin/productos') }"
      @click="go('/admin/productos')"
      type="button"
    >
      Productos
    </button>

    <button
      class="btn btn--soft"
      :class="{ active: isActive('/admin/promociones') }"
      @click="go('/admin/promociones')"
      type="button"
    >
      Promociones
    </button>
  </nav>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

function go(path) {
  if (route.path !== path) router.push(path);
}

function isActive(path) {
  // activo si coincide exacto o si estoy dentro de esa rama
  return route.path === path || route.path.startsWith(path + "/");
}
</script>

<style scoped>
.admin-nav {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

/* tu estilo base */
.btn--soft {
  background: #666;
}

/* solo para que el admin sepa dónde está */
.btn--soft.active {
  background: var(--color-main, #ab0a3d);
}
</style>
