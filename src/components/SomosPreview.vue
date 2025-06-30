<template>
  <section class="preview preview--somos contenedor">
    <div class="preview__header">
      <div class="preview__white-bar"></div>
      <h2>Somos</h2>
      <p class="subtitle">Nuestra filosofía</p>
    </div>
    <p class="preview__text">
      Somos una empresa con 50 años de experiencia en la
      <strong>representación y distribución de productos alimentarios</strong>.
      Acompañamos a marcas de prestigio en su proceso de comercialización…
    </p>
    <router-link to="/nosotros" class="btn-preview">Más información →</router-link>
  </section>
</template>

<script setup>
// componente estático, no necesita props o lógica
</script>

<style scoped>
.preview--somos {
  background: #f5f8fa;
  text-align: center;
  padding: 4rem 1rem;
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
  display: inline-block;
  background: #ab0a3d;
  color: #fff;
  padding: .75rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
}
.btn-preview:hover {
  background: #92243d;
}
</style>
