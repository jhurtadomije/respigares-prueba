//src/services/publicPromocionesService.js
import api from "./api.js";

export const publicPromocionesService = {
  list() {
    return api.get("/promociones"); // recuerda que tu axios ya tiene /api base
  },
  // ✅ historial completo
  listAll() {
    return api.get("/promociones/all");
  },
};
