// src/composables/useCatalogo.js
import { ref, computed } from 'vue'

export function useCatalogo() {
  const productos = ref([])
  const filtroCategoria = ref('')
  const filtroSubcategoria = ref('')

  // 👉 cargar el JSON unificado
  async function load() {
    if (productos.value.length) return
    const res = await fetch('/productos.json')
    productos.value = await res.json()
  }

  // 👉 categorías únicas
  const categorias = computed(() => {
    const map = new Map()
    for (const p of productos.value) {
      if (!p.categoria) continue
      if (!map.has(p.categoria)) {
        map.set(p.categoria, {
          id: p.categoria,
          name: p.categoria.replace(/_/g, ' '),
          image: p.galeria?.[0] || '/img/default-cat.jpg'
        })
      }
    }
    return Array.from(map.values())
  })

  // 👉 subcategorías únicas de una categoría
  function getSubcategorias(catId) {
    const subMap = new Map()
    for (const p of productos.value.filter(p => p.categoria === catId)) {
      if (!p.subcategoria) continue
      if (!subMap.has(p.subcategoria)) {
        subMap.set(p.subcategoria, {
          id: p.subcategoria,
          name: p.subcategoria.replace(/_/g, ' '),
          image: p.galeria?.[0] || '/img/default-sub.jpg'
        })
      }
    }
    return Array.from(subMap.values())
  }

  // 👉 lista de productos según filtros
  const list = computed(() => {
    return productos.value.filter(p => {
      const matchCat = !filtroCategoria.value || p.categoria === filtroCategoria.value
      const matchSub = !filtroSubcategoria.value || p.subcategoria === filtroSubcategoria.value
      return matchCat && matchSub
    })
  })

  return {
    load, categorias, list,
    filtroCategoria, filtroSubcategoria,
    getSubcategorias
  }
}
