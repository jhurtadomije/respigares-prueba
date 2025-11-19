<!-- src/components/BannerMayorEdad.vue -->
<template>
  <div class="age-overlay">
    <div class="age-modal">
      <h2>Contenido solo para mayores de 18 años</h2>
      <p>Para acceder a esta web debes confirmar que eres mayor de 18 años.</p>

      <div class="age-modal__buttons">
        <button type="button" @click="$emit('accept')">
          Sí, soy mayor de 18 años
        </button>
        <button type="button" class="btn-secondary" @click="$emit('reject')">
          No, salir
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
/* La lógica la controla el padre (App.vue) */
</script>

<style scoped>
.age-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1.5rem 1rem;        /* por si la pantalla es muy baja */
  box-sizing: border-box;
}

/* Modal */
.age-modal {
  background: #ffffff;
  max-width: 30rem;
  width: 100%;
  padding: 2rem 1.7rem 1.8rem 1.7rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 0.9rem 2.3rem rgba(0, 0, 0, 0.35);
  box-sizing: border-box;
}

/* Título y texto */
.age-modal h2 {
  margin: 0 0 0.75rem 0;
  font-size: clamp(1.3rem, 2.7vw, 1.6rem);
  color: var(--color-main, #ab0a3d);
  font-weight: 800;
  letter-spacing: 0.02em;
}

.age-modal p {
  margin: 0 0 1.6rem 0;
  font-size: 0.98rem;
  color: #555;
  line-height: 1.5;
}

/* Botonera */
.age-modal__buttons {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

/* Botones base */
button {
  padding: 0.75rem 1rem;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.98rem;
  letter-spacing: 0.03em;
  transition:
    background 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.12s ease,
    filter 0.12s ease;
}

/* Botón aceptar */
button:first-child {
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  box-shadow: 0 0.22rem 0.9rem rgba(171, 10, 61, 0.35);
}

button:first-child:hover {
  filter: brightness(1.05);
  transform: translateY(-1px);
  box-shadow: 0 0.35rem 1.4rem rgba(171, 10, 61, 0.45);
}

/* Botón salir */
.btn-secondary {
  background: linear-gradient(135deg, var(--color-blue), var(--color-gray));
  color: #444;
  box-shadow: 0 0.1rem 0.5rem rgba(0, 0, 0, 0.12);
}

.btn-secondary:hover {
  background: #e2e5ea;
  transform: translateY(-1px);
}

/* Tablet / escritorio: botones en fila */
@media (min-width: 40rem) {
  .age-modal__buttons {
    flex-direction: row;
    justify-content: center;
  }

  .age-modal__buttons button {
    min-width: 11rem;
  }
}
</style>
