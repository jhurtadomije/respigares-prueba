// src/contactModalState.js
import { ref } from "vue";

export const showContactModal = ref(false);

export const contactContext = ref({
  tipo: null,     // 'producto' | 'promocion' | ...
  producto: null, // producto COMPLETO
  promocion: null // promo COMPLETA
});

// Abrir modal para un producto concreto
export function openContactForProducto(producto) {
  contactContext.value = {
    tipo: "producto",
    producto: {
      ...producto,
      categoria: producto.categoria ?? null,
      subcategoria: producto.subcategoria ?? null,
      imagen:
        producto.imagen ||
        producto.Imagen ||
        producto.image ||
        producto.foto ||
        null,
      galeria:
        producto.galeria ||
        producto.Galeria ||
        producto.images ||
        [],
    },
    promocion: null,
  };

  showContactModal.value = true;
}

// ✅ Abrir modal para una promoción concreta
export function openContactForPromocion(promocion) {
  contactContext.value = {
    tipo: "promocion",
    producto: null,
    promocion: {
      ...promocion,
      // normalización defensiva por si cambia el campo
      imagen_banner:
        promocion.imagen_banner ||
        promocion.banner_img ||
        promocion.image ||
        null,
      cta_texto: promocion.cta_texto || null,
      cta_url: promocion.cta_url || null,
    },
  };

  showContactModal.value = true;
}

// Cerrar modal
export function closeContactModal() {
  showContactModal.value = false;
}
