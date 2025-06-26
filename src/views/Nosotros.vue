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
// Sin lógica en este componente, todo es estático
</script>

<style scoped>
.somos-section {
  position: relative;
  background: #f5f8fa;
  padding: 4rem 1rem 6rem;
  overflow: hidden;
}

/* Card introductoria */
.somos-intro {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto 3rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}
.somos-intro__title {
  font-size: 2.5rem;
  color: #ab0a3d;
  margin-bottom: 0.5rem;
}
.somos-intro__subtitle {
  font-size: 1.25rem;
  color: #7a7a7a;
  margin-bottom: 1rem;
}
.somos-intro__text {
  color: #555;
  line-height: 1.6;
}

/* Features */
.somos-features {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}
.feature {
  flex: 1 1 260px;
  background: #fff;
  border-radius: 8px;
  padding: 2rem 1.5rem;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}
.feature__icon {
  height: 60px;
  margin-bottom: 1rem;
}
.feature__title {
  font-size: 1.25rem;
  color: #ab0a3d;
  margin-bottom: 0.5rem;
}
.feature__text {
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
}

/* Imagen carrito */
.somos-section__cart {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 250px;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .somos-section__cart {
    display: none;
  }
  .somos-features {
    flex-direction: column;
    align-items: center;
  }
}
</style>
