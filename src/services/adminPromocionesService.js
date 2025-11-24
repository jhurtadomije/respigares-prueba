// src/services/adminPromocionesService.js
import api from "./api.js";

export const adminPromocionesService = {
  // ===== ADMIN =====
  list() {
    return api.get("/admin/promociones");
  },

  create(payload) {
    // payload debe llevar banner_img (front) o imagen_banner (backend)
    return api.post("/admin/promociones", payload);
  },

  update(id, payload) {
    return api.put(`/admin/promociones/${id}`, payload);
  },

  remove(id) {
    return api.delete(`/admin/promociones/${id}`);
  },

  uploadBanner(file, titulo = "promo") {
    const fd = new FormData();
    fd.append("banner", file);
    fd.append("titulo", titulo);

    return api.post("/admin/promociones/upload-banner", fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // ===== PUBLICO (FRONT HOME) =====
  listPublic() {
    return api.get("/promociones");
  },
};
