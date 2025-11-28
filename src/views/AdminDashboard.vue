<!-- src/views/AdminDashboard.vue -->
<template>
  <section class="admin-dashboard contenedor">
    <header class="admin-topbar">
      <h1 class="admin-title">Panel de administración</h1>

      <button class="btn btn--soft" @click="salir">
        Cerrar sesión
      </button>
    </header>

    <p class="admin-subtitle">Elige una de las siguientes Opciones</p>

    <div class="admin-grid">
      <!-- Productos -->
      <router-link to="/admin/productos" class="admin-card">
        <img src="/public/img/catalogo.jpg" alt="Gestión de productos" class="img" />
        <h2>Productos</h2>
        <p>Alta, edición, borrado e imágenes del catálogo.</p>
        <span class="admin-cta">Gestionar productos</span>
      </router-link>

      <!-- Promociones -->
      <router-link to="/admin/promociones" class="admin-card">
        <img src="/public/img/promo.webp" alt="Gestión de productos" class="img" />
        <h2>Ofertas y Promociones</h2>
        <p>Crea campañas (Navidad, Novedades, etc.)</p>
        <span class="admin-cta">Gestionar promociones</span>
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from "vue-router";
import { logout } from "../services/authService";

const router = useRouter();

function salir() {
  logout();
  router.push({ name: "admin-login" });
}
</script>

<style scoped>
.admin-dashboard {
  padding: 2.5rem 1rem 3rem;
  text-align: center;
  
}

/* Topbar para título + logout */
.admin-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 5rem;
}

.admin-title {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  color: var(--color-main);
  font-weight: 900;  
}
.img {
  width: 100%;
  height: 200px;
  object-fit: contain;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
}
.admin-subtitle {
margin-top: 3rem;
  color: #555;
  margin-bottom: 4rem;
  font-size: 1.7rem;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 55rem;
  margin: 0 auto;
}

.admin-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.6rem 1.4rem;
  text-decoration: none;
  color: inherit;
  border: 1px solid #e8e8e8;
  box-shadow: 0 0.18rem 0.9rem rgba(0,0,0,0.06);
  transition: transform .15s ease, box-shadow .2s ease, border-color .2s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.admin-card h2 {
  text-align: center;
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 800;
  color: #333;
}

.admin-card p {
  margin: 0 0 1rem 0;
  color: #666;
  text-align: center;
  line-height: 1.5;
}

.admin-cta {
  display: inline-block;
  margin-top: auto;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  font-weight: 800;
  font-size: 0.9rem;
  letter-spacing: .04em;
  text-align: center;

}

.admin-card:hover {
  transform: translateY(-2px);
  border-color: rgba(171, 10, 61, 0.5);
  box-shadow: 0 0.6rem 1.6rem rgba(0,0,0,0.12);
}

/* Botón estilo admin limpio */
.btn {
  border: none;
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  font-size: 0.95rem;
  cursor: pointer;
  font-weight: 800;
  transition: filter 0.15s ease, transform 0.1s ease;
  margin-top: 2rem;
}

.btn--soft {
  background: var(--color-main);
  color: #fcfcfcff;
  box-shadow: none;
}
.btn--soft:hover { filter: brightness(0.98); transform: translateY(-1px); }

@media(min-width: 700px){
  .admin-grid{
    grid-template-columns: repeat(2, 1fr);
  }
}

@media(max-width: 600px){
  .admin-topbar{
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
