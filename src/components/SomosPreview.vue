// src/components/SomosPreview.vue
<template>
  <h2 class="brands__somos">Somos</h2>
  <section class="preview preview--somos contenedor">
  <img
    src="/img/carro.png"  
    alt=""
    aria-hidden="true"
    class="somos-cart somos-cart--left"
  />
  <img
    src="/img/carro.png"  
    alt=""
    aria-hidden="true"
    class="somos-cart somos-cart--right"
  />
  
    <div class="preview__header">
      <p class="subtitle">Nuestra filosofía</p>
      <div class="preview__white-bar"></div>
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
    <router-link to="/nosotros" class="btn-preview">Conócenos</router-link>
  </section>
</template>

<script setup>
// Solo presentación, sin lógica
</script>

<style scoped>
.brands__somos {
  text-align: center;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  margin: 2.5rem 0 0.8rem 0;
  color: var(--color-main, #ab0a3d);
  letter-spacing: 0.03em;
  font-weight: 900;
}

/* Bloque general */
.preview--somos {
  position: relative;
  background: linear-gradient(360deg, #f7f9fb 0%, #f1f4f7 100%);
  padding: 2.2rem 1.2rem 3.2rem 1.2rem;
  text-align: center;
  border-radius: 1.1rem;
  box-shadow: 0 0.13rem 0.75rem #ab0a3d10;
  margin: 0 auto 2.8rem auto;
  max-width: 100%;
  box-sizing: border-box;
}


/* Carrito izquierdo (arriba-izquierda, un pelín fuera) */
.somos-cart--left {
  position: absolute;
  top: -20rem;
  left: -28rem;
  z-index: 200;
  width: clamp(20rem, 40vw, 15rem);
  opacity: 0.9;
  pointer-events: none;
  user-select: none;
  transform: scaleX(-1); 
}
.somos-cart--right {
  position: absolute;
  top: -20rem;
  right: -28rem;
  z-index: 200;
  width: clamp(20rem, 40vw, 15rem);
  opacity: 0.9;
  pointer-events: none;
  user-select: none;
  transform: scaleX(+1); 
}



/* Cabecera pequeña “Nuestra filosofía” */
.preview__header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.3rem;
  position: relative;
}

.preview__white-bar {
  margin-top: 0.8rem;
  width: 8rem;
  height: 1rem;
  border-radius: 3rem;
  background: #fff;
  box-shadow: 0 0.29rem 1rem #0001;
  margin-bottom: 0.8rem;
  z-index: 1;
}

.subtitle {
  color: #7a7a7a;
  margin-bottom: 0.2rem;
  font-size: 1.3rem;
  font-weight: 700;
}

/* Texto introductorio */
.preview__text {
  max-width: 44rem;
  margin: 0 auto 2.1rem auto;
  color: #555;
  font-size: 1.05rem;
  line-height: 1.6;
  font-weight: 500;
}

/* Bloque de 3 características */
.somos-features {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  margin-bottom: 1.8rem;
  max-width: 54rem;
  margin-left: auto;
  margin-right: auto;
}

/* Cada feature = “pill” con ligera sensación de botón */
.feature {
  flex: 1 1 14rem;
  max-width: 21rem;
  min-width: 0;
  background: #fff;
  border-radius: 0.9rem;
  padding: 1.3rem 1rem 1.8rem 1rem;
  text-align: center;
  box-shadow: 0 0.13rem 0.75rem #0002;
  border: 1px solid #e9ecf0;
  transition:
    box-shadow 0.22s ease,
    transform 0.18s ease,
    border-color 0.18s ease,
    background 0.18s ease;
  cursor: default;

  /* animación de entrada */
  opacity: 0;
  transform: translateY(14px);
  animation-name: somosFadeUp;
  animation-duration: 0.55s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

/* efecto hover */
.feature:hover {
  box-shadow: 0 0.6rem 1.8rem #ab0a3d18;
  transform: translateY(-0.18rem) scale(1.015);
  border-color: #d9dde4;
}

/* icono */
.feature__icon {
  height: 3.3rem;
  margin-bottom: 0.9rem;
  filter: drop-shadow(0 0.13rem 0.65rem #ab0a3d11);
}

/* título */
.feature__title {
  font-size: 1.13rem;
  color: #ab0a3d;
  margin-bottom: 0.35rem;
  font-weight: 800;
  letter-spacing: 0.02em;
}

/* texto */
.feature__text {
  color: #666;
  font-size: 0.98rem;
  line-height: 1.55;
  font-weight: 500;
}

/* Delay escalonado (como en las cards del catálogo) */
.feature:nth-child(1) { animation-delay: 0.05s; }
.feature:nth-child(2) { animation-delay: 0.15s; }
.feature:nth-child(3) { animation-delay: 0.25s; }

/* CTA inferior */
.btn-preview {
  margin-top: 0.8rem;
  display: inline-block;
  background: linear-gradient(135deg, var(--color-main), var(--color-gray));
  color: #fff;
  padding: 0.9rem 1.6rem;
  border-radius: 2rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 0.13rem 0.65rem #ab0a3d18;
  transition: background 0.22s, box-shadow 0.15s, filter 0.12s, transform 0.12s;
}

.btn-preview:hover {
  background: #92243d;
  filter: brightness(1.05);
  transform: translateY(-1px);
}

/* Animación */
@keyframes somosFadeUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive móvil / tablet estrecha */
@media (max-width: 50em) {
  .somos-features {
    flex-direction: column;
    align-items: stretch;
    gap: 1.3rem;
  }

  .feature {
    max-width: 100%;
    padding: 1.3rem 0.8rem 1.5rem 0.8rem;
  }

  .brands__somos {
    font-size: 1.5rem;
    margin-top: 2rem;
  }

  .preview--somos {
    padding: 1.4rem 0.7rem 2.4rem 0.7rem;
  }

  .preview__text {
    font-size: 1rem;
    padding: 0 0.3rem;
  }
}
</style>

