// src/contactModalState.js
import { ref } from "vue";

export const showContactModal = ref(false);

export const contactContext = ref({
  tipo: null,     // 'producto' | 'promocion' | ...
  producto: null, // producto COMPLETO
});

// Abrir modal para un producto concreto
export function openContactForProducto(producto) {
  contactContext.value = {
    tipo: "producto",
    // ✅ guardamos el objeto completo para no perder imagen/galeria/etc.
    producto: {
      ...producto,
      categoria: producto.categoria ?? null,
      subcategoria: producto.subcategoria ?? null,
      // normalización defensiva por si cambia el nombre del campo
      imagen: producto.imagen || producto.Imagen || producto.image || producto.foto || null,
      galeria: producto.galeria || producto.Galeria || producto.images || [],
    },
  };

  showContactModal.value = true;
}

// Cerrar modal
export function closeContactModal() {
  showContactModal.value = false;
}
