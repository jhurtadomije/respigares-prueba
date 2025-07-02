<!-- src/views/Nosotros.vue -->
<template>
  <section class="somos-section contenedor">
    <!-- Card de introducción -->
    <div class="somos-intro">
      <h2 class="somos-intro__title">Somos</h2>
      <p class="somos-intro__subtitle">Nuestra filosofía</p>
      <p class="somos-intro__text">
        Somos una empresa con 50 años de experiencia en la
        <strong>representación y distribución de productos alimentarios</strong>.<br>
        Acompañamos a marcas nacionales e internacionales de prestigio
        en su proceso de comercialización a mayoristas y/o detallistas.<br>
        Porque hasta llegar a la mesa del consumidor hay un largo camino
        que nosotros hacemos posible.
      </p>
    </div>

    <!-- Tres características -->
    <div class="somos-features">
      <div class="feature">
        <img src="/img/iconos/cercania.ico" alt="Cercanía" class="feature__icon" />
        <h3 class="feature__title">Cercanía</h3>
        <p class="feature__text">
          La mejor solución a un problema es evitar que se produzca.
          Lo conseguimos estando al lado de nuestros clientes,
          satisfaciendo sus necesidades en el día a día.
        </p>
      </div>
      <div class="feature">
        <img src="/img/iconos/experiencia.ico" alt="Experiencia" class="feature__icon" />
        <h3 class="feature__title">Experiencia</h3>
        <p class="feature__text">
          Trabajar con las mejores marcas de alimentación desde hace cinco décadas
          nos permite tener un conocimiento profundo del sector
          y cumplir sus exigencias en tiempo y forma.
        </p>
      </div>
      <div class="feature">
        <img src="/img/iconos/calidad.ico" alt="Calidad" class="feature__icon" />
        <h3 class="feature__title">Calidad</h3>
        <p class="feature__text">
          Sólo trabajamos con productos de primera calidad.
          Sólo hay una forma de representar dignamente a quienes depositan
          su confianza en nosotros: con excelencia.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Componente estático
</script>

<style scoped>
.somos-section {
  background: #f5f8fa;
  padding: 2rem 0 5rem 0;
  overflow: hidden;
}
.somos-intro {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 1rem;
  max-width: 800px;
  margin: 0 auto 2.5rem;
  text-align: center;
  box-shadow: 0 2px 10px #0001;
}
.somos-intro__title {
  font-size: 2.2rem;
  color: #ab0a3d;
  margin-bottom: 0.5rem;
}
.somos-intro__subtitle {
  font-size: 1.15rem;
  color: #7a7a7a;
  margin-bottom: 1rem;
}
.somos-intro__text {
  color: #555;
  line-height: 1.6;
}

.somos-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 950px;
  margin: 0 auto;
}
.feature {
  background: #fff;
  border-radius: 12px;
  padding: 2rem 1rem 1.3rem;
  text-align: center;
  box-shadow: 0 2px 8px #0001;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.2s, transform 0.15s;
}
.feature__icon {
  height: 56px;
  margin-bottom: 1rem;
}
.feature__title {
  font-size: 1.23rem;
  color: #ab0a3d;
  margin-bottom: 0.6rem;
  font-weight: 700;
}
.feature__text {
  color: #666;
  font-size: 1rem;
  line-height: 1.5;
}

/* Responsive para móviles */
@media (max-width: 600px) {
  .somos-intro {
    padding: 1.2rem 0.5rem;
    font-size: 0.98rem;
  }
  .somos-intro__title {
    font-size: 1.35rem;
  }
  .somos-features {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .feature {
    padding: 1.3rem 0.5rem 1.1rem;
  }
}
</style>
