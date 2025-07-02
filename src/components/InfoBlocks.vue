<template>
  <section class="info-blocks contenedor">
    <div
      class="info-block"
      v-for="(block, i) in blocks"
      :key="i"
    >
      <img v-if="block.icon" :src="block.icon" :alt="block.title" class="info-icon" />
      <h3 class="info-title">{{ block.title }}</h3>
      <p class="info-text">{{ block.text }}</p>
      <router-link :to="block.link" class="info-link">
        Más información →
      </router-link>
    </div>
  </section>
</template>

<script setup>
defineProps({
  blocks: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.info-blocks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2.2rem 0;
  padding: 0 0.5rem;
}

/* Cada bloque: tarjeta visual, responsive */
.info-block {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px #0001;
  padding: 2rem 1.2rem;
  text-align: center;
  transition: transform 0.18s, box-shadow 0.18s;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 0;
}

.info-block:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 32px #0002;
}

.info-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.1rem;
  object-fit: contain;
  filter: grayscale(0.12) brightness(1.05);
}

.info-title {
  font-size: 1.23rem;
  font-weight: bold;
  color: var(--color-main);
  margin-bottom: 0.4rem;
  letter-spacing: 0.01em;
}

.info-text {
  font-size: 1.04rem;
  color: #505050;
  line-height: 1.7;
  margin-bottom: 1.2rem;
  min-height: 44px;
}

.info-link {
  font-weight: bold;
  text-decoration: none;
  color: var(--color-main);
  background: #fff6;
  border-radius: 19px;
  padding: 0.5em 1.2em;
  font-size: 1em;
  transition: background 0.16s, color 0.16s;
  margin-top: auto;
  box-shadow: 0 1px 8px #ab0a3d10;
}
.info-link:hover {
  background: #ab0a3d;
  color: #fff;
}

/* Desktop: tarjetas en línea, centradas */
@media (min-width: 670px) {
  .info-blocks {
    flex-direction: row;
    gap: 2.4rem;
    justify-content: center;
    align-items: stretch;
  }
  .info-block {
    flex: 1 1 240px;
    min-width: 210px;
    max-width: 330px;
  }
}

@media (max-width: 400px) {
  .info-title { font-size: 1.05rem;}
  .info-text { font-size: 0.99rem;}
  .info-block { padding: 1.2rem 0.6rem;}
}
</style>
