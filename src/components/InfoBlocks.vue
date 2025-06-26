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
  flex-wrap: wrap;
  gap: 2rem;
  margin: 3rem 0;
  justify-content: center;
}
.info-block {
  flex: 1 1 260px;
  text-align: center;
}
.info-icon {
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
}
.info-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}
.info-text {
  line-height: 1.6;
  margin-bottom: 1rem;
}
.info-link {
  font-weight: bold;
  text-decoration: none;
  color: #ab0a3d;
}
.info-link:hover {
  text-decoration: underline;
}
</style>
