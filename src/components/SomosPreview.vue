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
.brands__somos {
  text-align: center;
  font-size: 2.2rem;
  margin: 0.5rem;
  color: var(--color-main, #ab0a3d);
  letter-spacing: 0.03em;
  font-weight: 900;
}

.preview--somos {
  background: #f5f8fa;
  padding: 2.2em 2vw 3.2em 2vw;
  text-align: center;
  border-radius: 1em;
  box-shadow: 0 0.13em 0.75em #ab0a3d10;
  margin-bottom: 2.2em;
  max-width: 65em;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
}

.preview__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.1em;
  position: relative;
}
.preview__white-bar {
  width: 8em;
  height: 1em;
  border-radius: 3em;
  background: #fff;
  box-shadow: 0 0.29em 1em #0001;
  margin-bottom: 0.4em;
  z-index: 1;
}
.subtitle {
  color: #7a7a7a;
  margin-bottom: 0.2em;
  font-size: 1.08em;
  font-weight: 600;
}

.preview__text {
  max-width: 44em;
  margin: 0 auto 2em auto;
  color: #555;
  font-size: 1.09em;
  line-height: 1.6;
  font-weight: 500;
}

.somos-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;
  justify-content: center;
  margin-bottom: 1.5em;
  max-width: 54em;
  margin-left: auto;
  margin-right: auto;
}
.feature {
  flex: 1 1 14em;
  max-width: 21em;
  min-width: 0;
  background: #fff;
  border-radius: 0.8em;
  padding: 1.2em 1em 1.7em 1em;
  text-align: center;
  box-shadow: 0 0.13em 0.75em #0002;
  transition: box-shadow .22s, transform .18s;
  border: 0.09em solid #eee;
}
.feature:hover {
  box-shadow: 0 0.6em 1.8em #ab0a3d14;
  transform: translateY(-0.25em) scale(1.025);
}
.feature__icon {
  height: 3.3em;
  margin-bottom: 0.9em;
  filter: drop-shadow(0 0.13em 0.65em #ab0a3d11);
}
.feature__title {
  font-size: 1.13em;
  color: #ab0a3d;
  margin-bottom: 0.35em;
  font-weight: 800;
  letter-spacing: 0.02em;
}
.feature__text {
  color: #666;
  font-size: 0.98em;
  line-height: 1.55;
  font-weight: 500;
}

.btn-preview {
  margin-top: 1.1em;
  display: inline-block;
  background: #ab0a3d;
  color: #fff;
  padding: 0.92em 1.45em;
  border-radius: 2em;
  text-decoration: none;
  font-weight: bold;
  font-size: 1em;
  box-shadow: 0 0.13em 0.65em #ab0a3d18;
  transition: background 0.22s, box-shadow 0.15s, filter 0.12s;
}
.btn-preview:hover {
  background: #92243d;
  filter: brightness(1.1);
}

/* Responsive móvil */
@media (max-width: 50em) {
  .somos-features {
    flex-direction: column;
    align-items: stretch;
    gap: 1.3em;
  }
  .feature {
    max-width: 100%;
    padding: 1.3em 0.7em 1.4em 0.7em;
  }
  .brands__somos {
    font-size: 1.4rem;
  }
  .preview--somos {
    padding: 1.2em 0.6em 2.2em 0.6em;
  }
}
</style>
