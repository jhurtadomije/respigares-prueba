// src/services/adminFamiliasService.js
import api from "./api";

export async function getFamiliasAdmin() {
  const res = await api.get("/admin/familias"); // 👈 esto genera /api/admin/familias
  return res.data;
}
