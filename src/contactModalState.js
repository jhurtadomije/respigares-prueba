// src/contactModalState.js
import { ref } from "vue";

export const showContactModal = ref(false);

export const contactContext = ref({
  tipo: null,         // 'producto' | 'promocion' | ...
  producto: null,     // { sku, nombre, categoria, subcategoria }
});

// Abrir modal para un producto concreto
export function openContactForProducto(producto) {
  contactContext.value = {
    tipo: "producto",
    producto: {
      sku: producto.sku,
      nombre: producto.nombre,
      categoria: producto.categoria ?? null,
      subcategoria: producto.subcategoria ?? null,
    },
  };
  showContactModal.value = true;
}

// Cerrar modal
export function closeContactModal() {
  showContactModal.value = false;
}
