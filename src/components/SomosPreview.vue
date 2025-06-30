<template>
  <h2 class="brands__somos">Somos</h2>
  <section class="preview preview--somos contenedor">
    <div class="preview__header">
      <div class="preview__white-bar"></div>
      <p class="subtitle">Nuestra filosofía</p>
    </div>
    <p class="preview__text">
      Somos una empresa con 50 años de experiencia en la
      <strong>representación y distribución de productos alimentarios</strong>.
      Acompañamos a marcas de prestigio en su proceso de comercialización…
    </p>
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
    <router-link to="/nosotros" class="btn-preview">Más información →</router-link>
  </section>
</template>

<script setup>
// componente estático, no necesita props o lógica
</script>

<style scoped>
.brands__somos {
  text-align: center;
  font-size: 2.25rem;
  margin-bottom: 2rem;
  color: var(--color-main);
}
.preview--somos {
  background: #f5f8fa;
  text-align: center;
  padding: 1rem;
  position: relative;
  margin-bottom: 4rem;
}
.preview__header {
  position: relative;
  display: inline-block;
  margin-bottom: 2rem;
}
.preview__white-bar {
  position: absolute;
  top: 0; left: 50%;
  transform: translateX(-50%);
  width: 300px; height: 80px;
  background: #fff;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
  z-index: -1;
}
.preview--somos h2 {
  margin: 0;
  font-size: 2.5rem;
  color: #ab0a3d;
}
.subtitle {
  margin: .5rem 0 1.5rem;
  color: #7a7a7a;
}
.preview__text {
  max-width: 700px;
  margin: 0 auto 2rem;
  color: #555;
  line-height: 1.6;
}
.btn-preview {
  margin-top: 1rem;
  display: inline-block;
  background: #ab0a3d;
  color: #fff;
  padding: 1rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  
}
.btn-preview:hover {
  
  background: #92243d;
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
</style>
