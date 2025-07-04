<template>
  <button
    v-show="visible"
    class="scroll-top-btn"
    @click="scrollToTop"
    aria-label="Volver arriba"
  >
    ↑
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const visible = ref(false)

function handleScroll() {
  visible.value = window.scrollY > 300
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.scroll-top-btn {
  position: fixed;
  right: 1.3em;
  bottom: 1.3em;
  z-index: 9999;
  background: var(--color-main, #ab0a3d);
  color: #fff;
  font-size: 1.8em;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px #0002;
  cursor: pointer;
  opacity: 0.93;
  transition: opacity 0.2s, background 0.2s;
}
.scroll-top-btn:hover {
  opacity: 1;
  background: #95153c;
}
@media (max-width: 700px) {
  .scroll-top-btn {
    width: 42px;
    height: 42px;
    font-size: 1.3em;
    right: 0.7em;
    bottom: 0.7em;
  }
}
</style>
