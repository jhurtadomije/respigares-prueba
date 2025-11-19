// src/services/contactService.js
import api from "./api";

export async function enviarConsultaContacto(payload) {
  const res = await api.post("/contacto", payload);
  return res.data;
}
