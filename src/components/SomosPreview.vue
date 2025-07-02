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
// Solo presentación, sin lógica
</script>

<style scoped>
/* Título */
.brands__somos {
  text-align: center;
  font-size: 2.1rem;
  margin: 1.5rem 0 1.2rem;
  color: var(--color-main, #ab0a3d);
  letter-spacing: 0.03em;
  font-weight: 900;
}

/* Barra y subtítulo */
.preview__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.1rem;
  position: relative;
}
.preview__white-bar {
  width: 120px;
  height: 14px;
  border-radius: 30px;
  background: #fff;
  box-shadow: 0 4px 16px #0001;
  margin-bottom: 0.4rem;
  z-index: 1;
}
.subtitle {
  color: #7a7a7a;
  margin-bottom: 0.2rem;
  font-size: 1.08rem;
  font-weight: 600;
}

/* Bloque general */
.preview--somos {
  background: #f5f8fa;
  padding: 1.2rem 1rem 2.2rem;
  text-align: center;
  border-radius: 16px;
  box-shadow: 0 2px 12px #ab0a3d10;
  margin-bottom: 2.2rem;
  position: relative;
}

/* Descripción */
.preview__text {
  max-width: 700px;
  margin: 0 auto 2rem;
  color: #555;
  font-size: 1.09rem;
  line-height: 1.6;
  font-weight: 500;
}

/* Grid de features */
.somos-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1.5rem;
}
.feature {
  flex: 1 1 240px;
  max-width: 330px;
  min-width: 0;
  background: #fff;
  border-radius: 13px;
  padding: 1.2rem 1.1rem 1.7rem;
  text-align: center;
  box-shadow: 0 2px 12px #0002;
  transition: box-shadow .22s, transform .18s;
  border: 1px solid #eee;
}
.feature:hover {
  box-shadow: 0 8px 28px #ab0a3d14;
  transform: translateY(-4px) scale(1.025);
}
.feature__icon {
  height: 55px;
  margin-bottom: 0.9rem;
  filter: drop-shadow(0 2px 10px #ab0a3d11);
}
.feature__title {
  font-size: 1.13rem;
  color: #ab0a3d;
  margin-bottom: 0.35rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.feature__text {
  color: #666;
  font-size: 0.98rem;
  line-height: 1.55;
  font-weight: 500;
}

/* Botón */
.btn-preview {
  margin-top: 1.1rem;
  display: inline-block;
  background: #ab0a3d;
  color: #fff;
  padding: 0.92rem 1.45rem;
  border-radius: 22px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 2px 10px #ab0a3d18;
  transition: background 0.22s, box-shadow 0.15s, filter 0.12s;
}
.btn-preview:hover {
  background: #92243d;
  filter: brightness(1.1);
}

/* Responsive: móvil */
@media (max-width: 800px) {
  .somos-features {
    flex-direction: column;
    align-items: stretch;
    gap: 1.3rem;
  }
  .feature {
    max-width: 100%;
    padding: 1.3rem 0.7rem 1.4rem;
  }
  .brands__somos {
    font-size: 1.4rem;
  }
}
</style>
